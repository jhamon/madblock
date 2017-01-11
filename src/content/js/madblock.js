import StorageAccess from '../../common/storage_access.js';
import Redactor from './redactor.js'
import Profiles from './profiles.js'
import BadgeInfo from './badge_info.js'

let cachedConfig = {};

function blacklistFromConfig(config) {
  var blacklistCategories = Object.keys(config).filter((key) => {
    return config[key].enabled;
  });

  var blacklist=[];
  for (var c=0; c < blacklistCategories.length; c++) {
    blacklist = blacklist.concat(config[blacklistCategories[c]].keywords);
  }
  console.log("The blacklist is", blacklist);
  return blacklist;
}

function blacklistFilter(config) {
  console.log('building a blacklist filter')
  var blacklist = blacklistFromConfig(config);

  return function(element) {
    return any(blacklist, function (word) {
      return contains(element, word)
    });
  }
}

function any(list, func) {
  for (var i = 0; i < list.length; i++) {
    if (func(list[i])) return true;
  }
  return false;
}

function contains(element, string) {
  return element.innerText.toLowerCase().indexOf(string.toLowerCase()) !== -1;
}

function filter(list, condition) {
  var filtered = [];

  for (var i = 0; i < list.length; i++) {
    condition(list[i]) ? filtered.push(list[i]) : null;
  }

  return filtered;
}

function getElements(selector) {
  return document.querySelectorAll(`${selector}:not(.redacted)`)
}

function selectProfile() {
  var profile = Profiles[window.location.hostname];
  profile = profile ? profile : Profiles.default;
  return profile;
}

function unpresident() {
  var profile = selectProfile();
  document.getElementsByTagName("body")[0].setAttribute("madblock", true);
  var inBlacklist =  blacklistFilter(cachedConfig);

  profile.selectors.forEach((selector) => {
    filter(getElements(selector), inBlacklist).map(Redactor.redact(profile.label));
  });
}

StorageAccess.get((config) => {
  cachedConfig = config;
});

setInterval(unpresident, 1000);

StorageAccess.onChange(function(config) {
  cachedConfig = config;
  Redactor.unredact(selectProfile().label);

  unpresident();
});
