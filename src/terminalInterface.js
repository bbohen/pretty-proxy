const blessed = require('blessed');

function TerminalInterface(options) {
  this.screen = blessed.screen({
    smartCSR: true,
    title: 'pretty proxy',
    dockBorders: false,
    fullUnicode: true,
    autoPadding: true
  });

  this.screen.key(["escape", "q", "C-c"], function() {
    process.exit(0);
  });

  this.layoutWrapper.call(this);

  this.screen.render();
}

TerminalInterface.prototype.addRequest = function(data) {
  this.wrapper.add(data);
  this.screen.render();
}

TerminalInterface.prototype.layoutWrapper = function() {
  this.wrapper = blessed.list({
    height: "100%",
    width: "100%",
    style: {
      selected: {
        bg: "green",
        fg: "blue"
      },
      item: {
        bg: "blue",
        fg: "green"
      }
    }
  });

  this.screen.append(this.wrapper);
}

module.exports = TerminalInterface;
