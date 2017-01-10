chrome.runtime.onMessage.addListener(function(message, sender) {
  chrome.browserAction.setBadgeText({ text: message.redactCount });
});