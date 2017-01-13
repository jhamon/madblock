import Redactor from './redactor.js'
import Profiles from './profiles.js'
import BadgeInfo from './badge_info.js'
import Logger from './logger.js'

function blacklistFromConfig(config) {
  var blacklistCategories = Object.keys(config).filter((key) => {
    return config[key].enabled;
  });

  var blacklist=[];
  for (var c=0; c < blacklistCategories.length; c++) {
    blacklist = blacklist.concat(config[blacklistCategories[c]].keywords);
  }
  Logger.log("The blacklist is", blacklist);
  return blacklist;
}

function blacklistFilter(config) {
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

function partition(list, condition) {
  var partitions = {good: [], bad: []};

  list.forEach(function(item) {
    condition(item) ? partitions.good.push(item) : partitions.bad.push(item);
  });

  return partitions;
}

function selectProfile() {
  var profile = Profiles[window.location.hostname];
  profile = profile ? profile : Profiles.default;
  return profile;
}

var redactionCount = 0;

function madblock(config) {
  var profile = selectProfile();
  document.getElementsByTagName("body")[0].setAttribute("madblock", true);
  var inBlacklist =  blacklistFilter(config);

  profile.selectors.forEach((selector) => {
    var elementsToRedact = Redactor.getElements(selector);
    var partitioned = partition(elementsToRedact, inBlacklist);
    Logger.log(partitioned);
    Redactor.markAll(partitioned.bad);
    Redactor.redactAll(partitioned.good, profile.label);
    redactionCount += partitioned.good.length;
  });
  BadgeInfo.update(redactionCount);
}

chrome.runtime.onMessage.addListener(function(msg) {
  Logger.log(">>>>>>>>>>>>>>>>>>>>>>");
  if (msg.type === 'redact') {
    Logger.log("Config change: ", msg.configChange);
    if (msg.configChange) {
      redactionCount = 0;
      Redactor.unredact(selectProfile().label);
    }
    madblock(msg.config);
  }
});
