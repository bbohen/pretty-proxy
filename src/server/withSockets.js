const { server, proxy } = require('./index.js');
const io = require('socket.io')(server);

const requestsWaiting = new Map();

// take passed data and emit request event to the client
// TODO: break out into another file
function emitRequest(requestInfo) {
  const { path } = requestInfo;
  const isSocketIo = path && path.startsWith('/socket.io/');

  // ignore the requests to socket.io itself
  if (!isSocketIo) {
    io.emit('request', requestInfo);
  }
}

server.on('connect', (request) => {
  const { method, url } = request;

  emitRequest({
    method,
    path: url,
  });
});

// communicate proxied request start (non-https)
proxy.on('proxyReq', (proxiedRequest) => {
  const {
    _headers: {
      host,
      pprcount: id,
    },
    method,
    path,
  } = proxiedRequest;

  // create an entry in the map so the response can be matched when returned
  requestsWaiting.set(id, {
    path,
    requestStart: Date.now(),
  });

  emitRequest({
    host,
    id,
    method,
    path,
  });
});

// communicate proxied request response (non-https)
proxy.on('proxyRes', (proxyResponse) => {
  const {
    req: {
      _headers: {
        pprcount: id,
      },
      res: {
        socket: {
          bytesRead,
        },
        statusCode,
      },
    },
  } = proxyResponse;
  const { requestStart } = requestsWaiting.get(id);

  requestsWaiting.delete(id);

  emitRequest({
    bytesRead,
    id,
    requestTime: Date.now() - requestStart,
    statusCode,
  });
});

// move this to index
process.on('uncaughtException', () => {
  io.emit('error');
});
