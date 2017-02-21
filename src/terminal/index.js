const TerminalInterface = require('./TerminalInterface');
const proxy = require('../proxy');

const terminal = new TerminalInterface();

function displayMessage (req) {
  const message = `{blue-fg}${req.method}{/blue-fg} | ${req.url}`;
  terminal.addRequest(message);
}

proxy.on('connect', displayMessage);
proxy.on('request', displayMessage);
