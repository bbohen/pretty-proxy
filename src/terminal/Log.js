const blessed = require('blessed');

function Log() {
  this.screen = blessed.screen({
    smartCSR: true,
    title: 'pretty proxy',
    dockBorders: false,
    fullUnicode: true,
    autoPadding: true,
  });

  this.screen.key(['escape', 'q', 'C-c'], () => {
    const { exit } = process;
    exit(0);
  });

  this.addError = this.addError.bind(this);
  this.addRequest = this.addRequest.bind(this);

  this.layoutWrapper.call(this);

  this.screen.render();
}

Log.prototype.addError = function addError(err) {
  let message = 'error';

  if (err.syscall) {
    message = `{red-fg}${err.syscall.toUpperCase()}{/red-fg} | ${err.errno} ${err.address}`;
  }

  this.wrapper.add(message);
  this.screen.render();
};

Log.prototype.addRequest = function addRequest(req) {
  const message = `{green-fg}${req.method}{/green-fg} | ${req.url}`;

  this.wrapper.add(message);
  this.screen.render();
};

Log.prototype.layoutWrapper = function layoutWrapper() {
  this.wrapper = blessed.log({
    interactive: false,
    parent: this.screen,
    height: '100%',
    width: '100%',
    tags: true,
  });

  this.screen.append(this.wrapper);
};

module.exports = Log;
