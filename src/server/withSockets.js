const { server, proxy } = require('./index.js');
const io = require('socket.io')(server);

const requestsWaiting = new Map();

function emitRequest(id, { statusCode, path }) {
  const isSocketIo = path.startsWith('/socket.io/');

  // ignore the requests to socket.io itself
  if (!isSocketIo) {
    io.emit('request', {
      id,
      statusCode,
      path,
    });
  }
}

io.on('connection', () => {
  console.log('socket connected');
});

io.on('error', () => {
  console.log('socket error');
});

// server.on('connect', emitRequest);
// server.on('request', emitRequest);

// move this to index
process.on('uncaughtException', () => {
  io.emit('error');
});

proxy.on('proxyRes', (proxyResponse) => {
  const { req: { _headers: { host, pprcount }, method, path, res } } = proxyResponse;

  console.log(`*** RESPONSE *** ${method} ${res.statusCode} ${host} ${path}`);
  emitRequest(pprcount, { path, statusCode: res.statusCode });
  console.log('******');
});

proxy.on('proxyReq', (proxiedRequest) => {
  const { _headers: { host, pprcount }, method, path } = proxiedRequest;

  console.log(`*** REQUEST ${new Date()} **** ${method} ${host} ${path}`);
  requestsWaiting.set(pprcount, { path });
  emitRequest(pprcount, { path });
  console.log('******');
});
