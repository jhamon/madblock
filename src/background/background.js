import StorageAccess from '../common/storage_access.js';
import Phonebook from './phonebook.js';

var phonebook = new Phonebook();

function redact(port, configChange) {
  console.log("Telling ",port," to redact with ", cachedConfig);
  port.postMessage({"type": "redact", "config": cachedConfig, "configChange": false});
}

chrome.runtime.onConnect.addListener(function(port) {
  console.log("Saving reference to port ", port);
  phonebook.addPort(port);
  console.log(phonebook.getTabs(), 'tabs in phonebook');
  redact(port, false);
});

function madblock(configChange) {
  chrome.tabs.query({active: true}, (tabs) => {
    tabs.forEach((tab) => {
      var port = phonebook.getPort(tab.id);
      if (port) {
        redact(port, configChange);
      }
    });
  });
}

setInterval(() => { madblock(false) }, 1000);

chrome.tabs.onActivated.addListener(() => {
  madblock(false);
});

chrome.runtime.onMessage.addListener(function(message, sender) {
  console.log(message, sender);
  if (sender.tab.active && message.type === 'badge') {
    chrome.browserAction.setBadgeText({ text: message.redactCount });
  }
});


var cachedConfig = {};
StorageAccess.onChange(function(config) {
  console.log("New configuration is: ", config);
  cachedConfig = config;
  madblock(true);
});