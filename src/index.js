const TerminalInterface = require('./TerminalInterface.js');
const proxy = require('./proxy.js');

const terminal = new TerminalInterface();

function displayMessage (req) {
  const message = `| ${req.method} | ${req.url}`
  terminal.addRequest(message);
}

proxy.on('connect', displayMessage);
proxy.on('request', displayMessage);
