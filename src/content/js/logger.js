class Logger {
  log(message) {
    chrome.runtime.sendMessage({ type: 'info', message: arguments })
  }
}

module.exports = new Logger();