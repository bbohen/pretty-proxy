const blessed = require('blessed');

class Log {
  constructor() {
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

  addError(err) {
    let message = 'ERROR';

    if (err.syscall) {
      message = `{red-fg}${err.syscall.toUpperCase()}{/red-fg} | ${err.errno} ${err.address}`;
    }

    this.wrapper.pushLine(message);
    this.wrapper.setScrollPerc(100);
    this.screen.render();
  }

  addRequest(req, res) {
    const message = `{green-fg}${req.method}{/green-fg} {cyan-fg}${res.statusCode || ''}{/cyan-fg} {|} ${req.url}`;

    this.wrapper.pushLine(message);
    this.wrapper.setScrollPerc(100);
    this.screen.render();
  }

  layoutWrapper() {
    this.wrapper = blessed.box({
      alwaysScroll: true,
      scrollable: true,
      parent: this.screen,
      height: '100%',
      width: '100%',
      tags: true,
    });

    this.screen.append(this.wrapper);
  }

}

module.exports = Log;
