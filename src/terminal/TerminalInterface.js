const blessed = require('blessed');

function TerminalInterface(options) {
  this.screen = blessed.screen({
    smartCSR: true,
    title: 'pretty proxy',
    dockBorders: false,
    fullUnicode: true,
    autoPadding: true
  });

  this.screen.key(["escape", "q", "C-c"], () => {
    process.exit(0);
  });

  this.addError = this.addError.bind(this);
  this.addRequest = this.addRequest.bind(this);

  this.layoutWrapper.call(this);

  this.screen.render();
}

TerminalInterface.prototype.addError = function(err) {
  let message = 'error';

  if (err.syscall) {
    message = `{red-fg}${err.syscall.toUpperCase()}{/red-fg} | ${err.errno} ${err.address}`;
  }

  this.wrapper.add(message);
  this.screen.render();
}

TerminalInterface.prototype.addRequest = function(req) {
  const message = `{blue-fg}${req.method}{/blue-fg} | ${req.url}`;

  this.wrapper.add(message);
  this.screen.render();
}

TerminalInterface.prototype.layoutWrapper = function() {
  // TODO: should probably use log or table here instead
  this.wrapper = blessed.list({
    interactive: false, // temp
    parent: this.screen,
    height: "100%",
    width: "100%",
    tags: true,
  });

  this.screen.append(this.wrapper);
}

module.exports = TerminalInterface;
