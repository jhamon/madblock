import React from 'react';
import ReactDOM from 'react-dom';

import Settings from './views/settings.jsx';
import Footer from './views/footer.jsx';
import ConfigurationStore from './data/configuration_store.js';

class Unpresidented extends React.Component {
  constructor(props) {
    super(props);
    this.state = {redactions: {}};
  }

  render() {
    return <div>
      <div className="header">
        <h1>Unpresidented</h1>
        <p>Hide stuff that stresses you out and provides no value in your everyday life</p>
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
  ReactDOM.render(<Unpresidented/>, document.getElementById('unpresidented'));
});