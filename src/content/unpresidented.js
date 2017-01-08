import StorageAccess from '../common/storage_access.js';

let cachedConfig = {};

function appendClass(element, className) {
  element.setAttribute("class", element.getAttribute("class") + " " + className)
}

function removeClass(element, className) {
  element.setAttribute("class", element.getAttribute("class").replace(className, ""));
}

function getRedacted() {
  return document.getElementsByClassName('redacted');
}

function redact(element) {
  appendClass(element, 'redacted')
}

function unredact() {
  console.log("unredacting")
  var previouslyRedacted = getRedacted();
  for (var i=0; i < previouslyRedacted.length; i++) {
    removeClass(previouslyRedacted[i], 'redacted' );
  }
}

function blacklistFromConfig(config) {
  var blacklist = Object.keys(config).filter((key) => {
    return config[key]
  });
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
  unredact();
  var inBlacklist =  blacklistFilter(cachedConfig);

  filter(getElements('a'), inBlacklist).map(redact);
  filter(getElements('p'), inBlacklist).map(redact);
  //filter(getElements('li'), inBlacklist).map(redact);
  filter(getElements('span'), inBlacklist).map(redact);
  filter(getElements('em'), inBlacklist).map(redact);
  filter(getElements('h1'), inBlacklist).map(redact);
  filter(getElements('h2'), inBlacklist).map(redact);
  filter(getElements('h3'), inBlacklist).map(redact);
  filter(getElements('h4'), inBlacklist).map(redact);
  filter(filter(getElements('div'), isLeafNode), inBlacklist).map(redact);
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
