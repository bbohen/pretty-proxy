const blessed = require('blessed');

const screen = blessed.screen({
  smartCSR: true,
  title: 'pretty proxy',
  dockBorders: false,
  fullUnicode: true,
  autoPadding: true
});

screen.key(["escape", "q", "C-c"], function() {
  process.exit(0);
});

// Render the screen.
screen.render();
