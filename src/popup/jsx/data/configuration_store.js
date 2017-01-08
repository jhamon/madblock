import ConfigurationDispatcher from './configuration_dispatcher.js';
import Dispatcher from './configuration_dispatcher.js';
import ConfigurationActionTypes from './configuration_action_types.js';
import {EventEmitter} from 'events'

const INITIAL_CONFIGURATION = {
  "Trump": true,
  "Obama": true,
  "Russia": true,
  "Putin": true,
  "Hillary": true,
  "GOP": true,
  "DNC": true,
  "Democrat": true,
  "Republican": true,
  "President": true,
  "presidential": true,
  "POTUS": true
};

const CHANGE_EVENT = 'change';
const STORAGE_KEY = 'unpresidented:config';

class ConfigurationStore extends EventEmitter {
  constructor() {
    super();
    let store = this;
    chrome.storage.sync.get(STORAGE_KEY, function(loadedConfig) {
      if (!chrome.runtime.error && Object.keys(loadedConfig).length === 1) {
        store._configuration = loadedConfig[STORAGE_KEY];
        store.emit(CHANGE_EVENT);
      } else {
        store._configuration = INITIAL_CONFIGURATION;
        store.commitChange();
      }
    });
  }

  addChangeListener(func) {
    this.addListener(CHANGE_EVENT, func);
  }

  removeChangeListener(func) {
    this.removeListener(CHANGE_EVENT, func);
  }

  commitChange() {
    let store = this;
    let payload = {};
    payload[`${STORAGE_KEY}`] = this._configuration;
    chrome.storage.sync.set(payload, function() {
      if (chrome.runtime.error) {
        console.error("Runtime error while persisting to chrome storage");
      }
      store.emit(CHANGE_EVENT);
    });
  }

  enable(keyword) {
    this._configuration[keyword] = true;
    this.commitChange()
  }

  toggle(keyword) {
    this._configuration[keyword] = !this._configuration[keyword] ;
    this.commitChange()
  }

  enableAll() {
    let store = this;
    Object.keys(this._configuration).forEach((keyword) => { store._configuration[keyword] = true });
    this.commitChange()
  }

  disableAll() {
    let store = this;
    Object.keys(this._configuration).forEach((keyword) => { store._configuration[keyword] = false });
    this.commitChange()
  }

  getAll() {
    return this._configuration;
  }
}

const configurationStore = new ConfigurationStore();

Dispatcher.register(function (action) {
  switch (action.type) {
    case ConfigurationActionTypes.ENABLE_KEYWORD:
      configurationStore.enable(action.keyword);
      break;

    case ConfigurationActionTypes.ENABLE_ALL:
      configurationStore.enableAll();
      break;

    case ConfigurationActionTypes.DISABLE_ALL:
      configurationStore.disableAll();
      break;

    case ConfigurationActionTypes.TOGGLE_KEYWORD:
      configurationStore.toggle(action.keyword);
      break;
  }
});

export default configurationStore;