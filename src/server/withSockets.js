const server = require('./index.js');
const io = require('socket.io')(server);

io.on('connection', () => {
  console.log('socket connected');
});

io.on('error', () => {
  console.log('socket error');
});

server.on('request', (data) => {
  console.log('request');
  const isSocketIo = data.url.startsWith('/socket.io/');

  // ignore the requests to socket.io itself
  if (!isSocketIo) {
    io.emit('request', {
      statusCode: data.statusCode,
      url: data.url,
    });
  }
});

// move this to index
process.on('uncaughtException', () => {
  io.emit('error');
});
