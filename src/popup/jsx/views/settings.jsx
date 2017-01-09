import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

import ToggleAllButton from './toggle_all_button.jsx';

const RedactionKeywordOption = require('./redaction_keyword_option.jsx');

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  sortedCategories() {
    return _.sortBy(
        _.mapObject(this.props.redactions, function (category, categoryName) {
          category.name = categoryName;
          return category;
        }), (category) => {
          return category.position
        });
  }

  render() {
    let sortedCategories = this.sortedCategories();

    return <div className="configuration">
      <ToggleAllButton redactions={sortedCategories}/>

      <div className="settings">
        { sortedCategories.map(
            (category) => {
              return <RedactionKeywordOption key={category.name}
                                             keyword={category.name}
                                             value={category.enabled}/>
            }
        )
        }
      </div>
    </div>
  }
}

module.exports = Settings;
