class Phonebook {
  constructor() {
    this._phonebook = {};
  }

  addPort(port) {
    var tabId = port.sender.tab.id;
    this._phonebook[tabId] = port;

    function deregister() {
      delete this._phonebook[tabId]
    }

    port.onDisconnect.addListener(deregister.bind(this));
  }

  getPort(tabId) {
    return this._phonebook[tabId]
  }

  getTabs() {
    return Object.keys(this._phonebook);
  }
}

export default Phonebook;