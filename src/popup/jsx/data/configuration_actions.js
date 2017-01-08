import ConfigurationActionTypes from './configuration_action_types.js';
import ConfigurationDispatcher from './configuration_dispatcher.js';

const ConfigurationActions = {
  enableRedactionKeyword: (keyword) => {
    ConfigurationDispatcher.dispatch({
      type: ConfigurationActionTypes.ENABLE_KEYWORD,
      keyword
    });
  },

  toggleRedactionKeyword: (keyword) => {
    ConfigurationDispatcher.dispatch({
      type: ConfigurationActionTypes.TOGGLE_KEYWORD,
      keyword
    });
  },

  enableAllKeywords: () => {
    ConfigurationDispatcher.dispatch({
      type: ConfigurationActionTypes.ENABLE_ALL
    });
  },

  disableAllKeywords: () => {
    ConfigurationDispatcher.dispatch({
      type: ConfigurationActionTypes.DISABLE_ALL
    });
  }
};

module.exports = ConfigurationActions;