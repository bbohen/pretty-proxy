const http = require('http');
const net = require('net');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
const server = http.createServer((req, res) => {
  proxy.web(req, res, {
    changeOrigin: true,
    prependPath: false,
    target: req.url,
  }, (err) => {
    console.log(err); // eslint-disable-line no-console
  });
});
const port = 5060;

proxy.on('proxyRes', function (proxyRes) {
  console.log(`*** RESPONSE *** ${proxyRes.req.method} ${proxyRes.req.res.statusCode} ${proxyRes.req._headers.host} ${proxyRes.req.path}`);
  // console.log(proxyRes.req);
});

proxy.on('proxyReq', function (proxyRes) {
  console.log(`*** REQUEST **** ${proxyRes.method} ${proxyRes._headers.host} ${proxyRes.path}`);
  // console.log(proxyRes);
});

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

module.exports = server;
