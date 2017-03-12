const server = require('./index.js');
const io = require('socket.io')(server);

function emitRequest({ statusCode, url }) {
  const isSocketIo = url.startsWith('/socket.io/');

  // ignore the requests to socket.io itself
  if (!isSocketIo) {
    io.emit('request', {
      statusCode,
      url,
    });
  }
}

io.on('connection', () => {
  console.log('socket connected');
});

io.on('error', () => {
  console.log('socket error');
});

server.on('connect', emitRequest);
server.on('request', emitRequest);

// move this to index
process.on('uncaughtException', () => {
  io.emit('error');
});
