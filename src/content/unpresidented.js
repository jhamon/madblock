import StorageAccess from '../common/storage_access.js';
import Redactor from './redactor.js'

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

function getElements(tag) {
  return document.getElementsByTagName(tag)
}

function unpresident() {
  Redactor.unredact();
  var inBlacklist =  blacklistFilter(cachedConfig);

  filter(getElements('article'), inBlacklist).map(Redactor.redact);
  filter(getElements('p'), inBlacklist).map(Redactor.redact);
  filter(getElements('span'), inBlacklist).map(Redactor.redact);
  filter(getElements('em'), inBlacklist).map(Redactor.redact);
  filter(getElements('h1'), inBlacklist).map(Redactor.redact);
  filter(getElements('h2'), inBlacklist).map(Redactor.redact);
  filter(getElements('h3'), inBlacklist).map(Redactor.redact);
  filter(getElements('h4'), inBlacklist).map(Redactor.redact);
  //filter(filter(getElements('div'), isLeafNode), inBlacklist).map(Redactor.redact);
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
