const Log = require('./Log');
const server = require('../server');

const { addError, addRequest } = new Log();

server.on('connect', addRequest);
server.on('request', addRequest);

process.on('uncaughtException', addError);
