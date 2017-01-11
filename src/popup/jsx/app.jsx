import React from 'react';
import ReactDOM from 'react-dom';

import Settings from './views/settings.jsx';
import Footer from './views/footer.jsx';
import ConfigurationStore from './data/configuration_store.js';

class MadBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {redactions: {}};
  }

  render() {
    return <div>
      <div className="header">
        <h1>MadBlock</h1>
        <p>Hide toxic news that stresses you out</p>
      </div>
      <Settings redactions={this.state.redactions} />
      <Footer />
    </div>
  }

  componentDidMount() {
    ConfigurationStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    ConfigurationStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({redactions: ConfigurationStore.getAll()});
  }
}

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<MadBlock/>, document.getElementById('madblock'));
});