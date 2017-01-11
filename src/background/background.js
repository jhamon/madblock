chrome.runtime.onMessage.addListener(function(message, sender) {
  if (sender.tab.active) {
    chrome.browserAction.setBadgeText({ text: message.redactCount });
  }
});