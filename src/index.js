require('./proxy.js');
require('./terminalInterface.js');

// combine data/interface here
// - terminal could look something like
// proxy();
// proxy.on('traffic', myFuncThatSendsDataToBlessed)
// https://github.com/FormidableLabs/webpack-dashboard/blob/master/bin/webpack-dashboard.js
// - will need some sort of socket/push for electron/web
// needs to be able to quickly push to a client (electron)
// - check out observables for both
