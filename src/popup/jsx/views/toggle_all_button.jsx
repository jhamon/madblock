import React from 'react';
import ReactDOM from 'react-dom';
import ConfigurationActions from '../data/configuration_actions.js';

function allTrue(obj) {
  let keywords = Object.keys(obj);
  for (var k=0; k < keywords.length; k++) {
    if (obj[keywords[k]] === false) { return false; }
  }
  return true;
}

class ToggleAllButton extends React.Component {
  getLabel() {
    return allTrue(this.props.redactions) ? 'Disable All' : 'Enable All';
  }

  handleClick() {
    return allTrue(this.props.redactions) ? ConfigurationActions.disableAllKeywords() : ConfigurationActions.enableAllKeywords();
  }

  render() {
    return <div className="button-container">
      <button onClick={this.handleClick.bind(this)}>{this.getLabel()}</button>
    </div>
  }
}

export default ToggleAllButton;