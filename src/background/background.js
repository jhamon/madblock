import StorageAccess from '../common/storage_access.js';

function redact(tab, configChange) {
  chrome.tabs.sendMessage(tab.id, {"type": "redact", "config": cachedConfig, "configChange": configChange});
}

function madblock(configChange) {
  chrome.tabs.query({active: true}, (tabs) => {
    tabs.forEach((tab) => {
        redact(tab, configChange);
    });
  });
}

setInterval(() => { madblock(false) }, 1000);

chrome.tabs.onActivated.addListener((e) => {
  console.log("Switching tabs to ", e)
  madblock(true);
});

function buildArrayFromArguments(message) {
  var messageObj = message.message;
  var argArray   = [];
  for (var i = 0; i < Object.keys(messageObj).length; i++) {
    argArray.push(messageObj[i]);
  }
  return argArray;
}

chrome.runtime.onMessage.addListener(function(message, sender) {
  if (sender.tab.active && message.type === 'badge') {
    chrome.browserAction.setBadgeText({ text: message.redactCount });
  }
  if (message.type === 'info') {
    var argArray = buildArrayFromArguments(message);
    argArray.unshift(`Tab ${sender.tab.id}: `);
    console.info.apply(this, argArray);
    return;
  }

  console.log(message, sender);
});

var cachedConfig = {};

StorageAccess.get((config) => {
  cachedConfig = config;
});

StorageAccess.onChange(function(config) {
  console.log("New configuration is: ", config);
  cachedConfig = config;
  madblock(true);
});