const http = require('http');
const net = require('net');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
let requestCount = 0;
const server = http.createServer((req, res) => {
  const requestToProxy = req;

  requestToProxy.headers.pprcount = requestCount;
  requestCount += 1;

  proxy.web(requestToProxy, res, {
    changeOrigin: true,
    prependPath: false,
    target: req.url,
  });
});
const port = 5060;

server.on('connect', (req, socket) => {
  const parts = req.url.split(':', 2);
  // open a TCP connection to the remote host
  const conn = net.connect(parts[1], parts[0], () => {
    // respond to the client that the connection was made
    socket.write('HTTP/1.1 200 OK\r\n\r\n');
    // create a tunnel between the two hosts
    socket.pipe(conn);
    conn.pipe(socket);
  });
});

server.listen(port);
console.log(`listening on port ${port}`); // eslint-disable-line no-console

module.exports.server = server;
module.exports.proxy = proxy;
