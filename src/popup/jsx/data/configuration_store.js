import ConfigurationDispatcher from './configuration_dispatcher.js';
import Dispatcher from './configuration_dispatcher.js';
import ConfigurationActionTypes from './configuration_action_types.js';
import {EventEmitter} from 'events'
import StorageAccess from '../../../common/storage_access.js';

const INITIAL_CONFIGURATION = {
  "Trump": {
    position: 1,
    enabled: true,
    keywords: ["Trump", "Pence", "Kellyanne Conway", "Jared Kushner", "Ivanka", "Melania", "Breitbart", "Stephen Bannon", "Jeff Sessions"]
  },
  "Obama": {
    position: 2,
    enabled: true,
    keywords: ["Obama"]
  },
  "Clinton": {
    position: 3,
    enabled: true,
    keywords: ["Hillary", "Clinton", "Podesta", "Huma Abedin", "Tim Kaine"]
  },
  "Russia": {
    position: 4,
    enabled: true,
    keywords: ["Putin", "Russia"]
  },
  "Democrats": {
    position: 5,
    enabled: true,
    keywords: ["Democrat", "Democrats", "DNC", "Elizabeth Warren", "Bernie Sanders"]
  },
  "Republicans": {
    position: 6,
    enabled: true,
    keywords: ["Republican", "GOP", "Mitch McConnell", "Paul Ryan", "McCain"]
  },
  "Culture War": {
    position: 7,
    enabled: true,
    keywords: ['Planned Parenthood', 'abortion', 'gay marriage', 'LGBT', 'transgender', 'bathroom', 'the wall', 'NRA', 'gun control']
  },
  "Terrorism": {
    position: 8,
    enabled: true,
    keywords: ['shooting', 'shooter', 'shot', 'murder','opened fire', 'attack', 'truck attack', 'hijack', 'bomb', 'blast']
  }
};

const CHANGE_EVENT = 'change';

class ConfigurationStore extends EventEmitter {
  constructor() {
    super();
    let store = this;
    StorageAccess.get(function(loadedConfig) {
      console.log("loaded config", loadedConfig);
      if (loadedConfig !== undefined) {
        store._configuration = loadedConfig;
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
    StorageAccess.set(this._configuration, () => { store.emit(CHANGE_EVENT) });
  }

  enable(keyword) {
    this._configuration[keyword].enabled = true;
    this.commitChange()
  }

  toggle(keyword) {
    this._configuration[keyword].enabled = !this._configuration[keyword].enabled ;
    this.commitChange()
  }

  enableAll() {
    let store = this;
    Object.keys(this._configuration).forEach((keyword) => { store._configuration[keyword].enabled = true });
    this.commitChange()
  }

  disableAll() {
    let store = this;
    Object.keys(this._configuration).forEach((keyword) => { store._configuration[keyword].enabled = false });
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