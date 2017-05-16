#!/usr/bin/env node
const saveRootCA = require('./certs/saveRootCA');
const setupSystemSettings = require('./util/setupSystemSettings');

const PORT = process.env.PORT || 5060;

function init() {
  saveRootCA();
  setupSystemSettings(PORT);
  // create servers and start proxyin'
}

init();
