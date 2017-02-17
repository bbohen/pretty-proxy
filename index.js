const fs = require('fs');
const http = require('http');
const https = require('https');
const net = require('net');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
const server = http.createServer(function(req, res) {
  console.log('************************************* Request!');
  console.log(req.url);
  console.log('**********************************************');
  proxy.web(req, res, {
    target: req.url,
    prependPath: false,
  }, (err) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Proxy Error!');
    console.log(err);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  })
});

server.on('connect', (req, socket, head) => {
  console.log('******************************* HTTPS Request!');
  console.log(req.url);
  console.log('**********************************************');

  const parts = req.url.split(':', 2);
	// open a TCP connection to the remote host
	const conn = net.connect(parts[1], parts[0], function() {
		// respond to the client that the connection was made
		socket.write("HTTP/1.1 200 OK\r\n\r\n");
		// create a tunnel between the two hosts
		socket.pipe(conn);
		conn.pipe(socket);
	});
});

server.on('error', function (err, req, res) {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Server Error!');
  console.log(err);
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
});

server.listen(5060);
console.log("listening on port 5060");
