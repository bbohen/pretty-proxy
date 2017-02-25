const TerminalInterface = require('./TerminalInterface');
const proxy = require('../proxy');

const { addError, addRequest } = new TerminalInterface();

proxy.on('connect', addRequest);
proxy.on('request', addRequest);

process.on('uncaughtException', addError);
