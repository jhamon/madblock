import ConfigurationDispatcher from './configuration_dispatcher.js';
import Dispatcher from './configuration_dispatcher.js';
import ConfigurationActionTypes from './configuration_action_types.js';
import {EventEmitter} from 'events'
import StorageAccess from '../../../common/storage_access.js';
import InitialConfiguration from './initial_configuration.js';

const CHANGE_EVENT = 'change';

class ConfigurationStore extends EventEmitter {
  constructor() {
    super();
    let store = this;
    StorageAccess.get(function (loadedConfig) {
      console.log("loaded config", loadedConfig);
      if (loadedConfig !== undefined) {
        store._configuration = loadedConfig;
        store.emit(CHANGE_EVENT);
      } else {
        store._configuration = InitialConfiguration;
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
    StorageAccess.set(this._configuration, () => {
      store.emit(CHANGE_EVENT)
    });
  }

  enable(keyword) {
    this._configuration[keyword].enabled = true;
    this.commitChange()
  }

  toggle(keyword) {
    this._configuration[keyword].enabled = !this._configuration[keyword].enabled;
    this.commitChange()
  }

  enableAll() {
    let store = this;
    Object.keys(this._configuration).forEach((keyword) => {
      store._configuration[keyword].enabled = true
    });
    this.commitChange()
  }

  disableAll() {
    let store = this;
    Object.keys(this._configuration).forEach((keyword) => {
      store._configuration[keyword].enabled = false
    });
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