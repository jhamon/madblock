import React from 'react';
import ReactDOM from 'react-dom';

import ToggleAllButton from './toggle_all_button.jsx';

const RedactionKeywordOption = require('./redaction_keyword_option.jsx');

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {redactions} = this.props;

    return <div className="configuration">
      <ToggleAllButton redactions={redactions} />

      <div className="settings">
        { Object.keys(this.props.redactions).map(
            (optionName) => { return <RedactionKeywordOption key={optionName}
                                                             keyword={optionName}
                                                             value={redactions[optionName]} /> }
        )
        }
      </div>
    </div>
  }
}

module.exports = Settings;
