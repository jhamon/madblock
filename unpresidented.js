function redact(element) {
  element.setAttribute("style", "color: black !important; background: black !important;");
}

function inBlacklist(element) {
  var blacklist = [
    "Trump",
    "Obama",
    "Russia",
    "Putin",
    "Hillary",
    "GOP",
    "DNC",
    "Democrat",
    "Republican",
    "President",
    "presidential",
    "POTUS"
  ];
  return any(blacklist, function (word) {
    return contains(element, word)
  });
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
  var tags = ['a', 'p', 'span', 'em', 'strong', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];


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

unpresident();
document.addEventListener('DOMContentLoaded', unpresident);
window.addEventListener('load', unpresident);