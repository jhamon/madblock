import StorageAccess from '../../common/storage_access.js';
import Redactor from './redactor.js'
import Profiles from './profiles.js'

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
  return element.innerText.indexOf(string) !== -1;
}

function isLeafNode(element) {
  return element.children.length === 0;
}

function filter(list, condition) {
  var filtered = [];

  for (var i = 0; i < list.length; i++) {
    condition(list[i]) ? filtered.push(list[i]) : null;
  }

  return filtered;
}

function getElements(selector) {
  return document.querySelectorAll(selector)
}

function selectProfile() {
  var profile = Profiles[window.location.hostname];
  profile = profile ? profile : Profiles.default;
  return profile;
}

function unpresident() {
  var profile = selectProfile();
  document.getElementsByTagName("body")[0].setAttribute("unpresidented", true);
  Redactor.unredact(profile.label);
  var inBlacklist =  blacklistFilter(cachedConfig);

  profile.selectors.forEach((selector) => {
    filter(getElements(selector), inBlacklist).map(Redactor.redact(profile.label));
  });
}

StorageAccess.get((config) => {
  cachedConfig = config;
});

document.addEventListener('DOMContentLoaded', unpresident);
window.addEventListener('load', unpresident);

StorageAccess.onChange(function(config) {
  cachedConfig = config;
  unpresident();
});
