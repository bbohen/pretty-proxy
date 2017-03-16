const { server, proxy } = require('./index.js');
const io = require('socket.io')(server);

const requestsWaiting = new Map();

// take passed data and emit request event to the client
// TODO: break out into another file
function emitRequest(id, { bytesRead, host, method, statusCode, path }) {
  const isSocketIo = path && path.startsWith('/socket.io/');

  // ignore the requests to socket.io itself
  if (!isSocketIo) {
    io.emit('request', {
      bytesRead,
      host,
      method,
      id,
      statusCode,
      path,
    });
  }
}

server.on('connect', (request) => {
  const { method, url } = request;

  emitRequest(null, {
    method,
    path: url,
  });
});

// communicate proxied request start (non-https)
proxy.on('proxyReq', (proxiedRequest) => {
  const {
    _headers: {
      host,
      pprcount,
    },
    method,
    path,
  } = proxiedRequest;

  // create an entry in the map so the response can be matched when returned
  requestsWaiting.set(pprcount, { path });

  emitRequest(pprcount, {
    host,
    method,
    path,
  });
});

// communicate proxied request response (non-https)
proxy.on('proxyRes', (proxyResponse) => {
  const {
    req: {
      _headers: {
        pprcount,
      },
      res: {
        socket: {
          bytesRead,
        },
        statusCode,
      },
    },
  } = proxyResponse;

  // don't need to keep this anymore
  requestsWaiting.delete(pprcount);

  emitRequest(pprcount, {
    bytesRead,
    statusCode,
  });
});

// move this to index
process.on('uncaughtException', () => {
  io.emit('error');
});
