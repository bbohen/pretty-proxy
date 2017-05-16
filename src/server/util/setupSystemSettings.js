const ip = require('ip');
const execSync = require('./execSync');

function setupSystemSettings(port) {
  execSync(`networksetup -setwebproxy Wi-Fi ${ip.address()} ${port}`);
  execSync(`networksetup -setsecurewebproxy Wi-Fi ${ip.address()} ${port}`);
}

module.exports = setupSystemSettings;
