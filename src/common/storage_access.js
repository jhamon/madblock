const STORAGE_KEY = 'unpresidented:config';

const StorageAccess = {
  get: (callback) => {
    chrome.storage.sync.get(STORAGE_KEY, function (loadedConfig) {
        if (!chrome.runtime.error) {
          callback(loadedConfig[STORAGE_KEY]);
        }
      }
    );
  },

  set: (payload, callback) => {
    let payloadWrapper               = {};
    payloadWrapper[`${STORAGE_KEY}`] = payload;
    chrome.storage.sync.set(payloadWrapper, function () {
      if (chrome.runtime.error) {
        console.error("Runtime error while persisting to chrome storage");
      }
      callback();
    });
  },

  onChange: (callback) => {
    chrome.storage.onChanged.addListener(function(changes, namespace) {
      for (var key in changes) {
        if (key === STORAGE_KEY) {
          callback(changes[key].newValue)
        }
      }
    });
}
};

export default StorageAccess;