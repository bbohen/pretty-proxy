const fs = require('fs');
const http = require('http');
const net = require('net');
const httpProxy = require('http-proxy');

const port = 5060;

process.on('uncaughtException', (err) => {
  console.log(err);
});

const proxy = httpProxy.createProxyServer();
const server = http.createServer(function(req, res) {
  proxy.web(req, res, {
    changeOrigin: true,
    prependPath: false,
    target: req.url,
  }, (err) => {
    console.log(err);
  })
});

server.on('connect', (req, socket, head) => {
  const parts = req.url.split(':', 2);
  // open a TCP connection to the remote host
  const conn = net.connect(parts[1], parts[0], () => {
    // respond to the client that the connection was made
    socket.write("HTTP/1.1 200 OK\r\n\r\n");
    // create a tunnel between the two hosts
    socket.pipe(conn);
    conn.pipe(socket);
  })
});

server.listen(port);
console.log(`listening on port ${port}`);

module.exports = server;
