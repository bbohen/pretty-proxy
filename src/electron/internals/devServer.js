/* eslint-disable */
const config = require('./webpack.config.dev.js');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { spawn } = require('child_process');

const IP = process.env.IP || 'localhost';
const PORT = process.env.PORT || 3000;
const { devServer } = config;

new WebpackDevServer(webpack(config), devServer).listen(PORT, IP, err => {
  if (err) {
    return console.log(err);
  }

  spawn('npm', ['run', 'electron-start'])
    .on('close', code => process.exit(code))
    .on('error', spawnError => console.error(spawnError));

  return console.log(`Listening at http://${IP}:${PORT}`);
});
/* eslint-enable */
