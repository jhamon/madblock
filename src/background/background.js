import StorageAccess from '../common/storage_access.js';

function redact(tab, configChange) {
  console.log("Telling ",tab.id," to redact with ", cachedConfig);
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
  madblock(false);
});

chrome.runtime.onMessage.addListener(function(message, sender) {
  console.log(message, sender);
  if (sender.tab.active && message.type === 'badge') {
    chrome.browserAction.setBadgeText({ text: message.redactCount });
  }
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