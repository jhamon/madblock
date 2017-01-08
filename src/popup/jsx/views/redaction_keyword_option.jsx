import React from 'react';
import ReactDOM from 'react-dom';
import ConfigurationActions from '../data/configuration_actions.js';

class RedactionKeywordOption extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    ConfigurationActions.toggleRedactionKeyword(this.props.keyword);
  }

  render() {
    let {keyword, value} = this.props;

    return <div className="redactionOption"
                onClick={this.handleClick.bind(this)}>
      <input type="checkbox"
             name={keyword}
             checked={value}/>
      <label>{keyword}</label>
    </div>
  }
}

RedactionKeywordOption.propTypes = {
  keyword: React.PropTypes.string.isRequired,
  value: React.PropTypes.bool.isRequired
};

module.exports = RedactionKeywordOption;
