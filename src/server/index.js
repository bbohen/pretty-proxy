#!/usr/bin/env node

/**
 * DEPRECATED
 * working on /new.js and will remove this after!
 * this is messy code!
 */

// PEM
// openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

// CERT
// sudo openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
// http://www.akadia.com/services/ssh_test_certificate.html (works for local https)

const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');
const tls = require('tls');
const httpProxy = require('http-proxy');
const forge = require('node-forge');

const setupSystemSettings = require('./util/setupSystemSettings');

const CERT = path.resolve(__dirname, '../../', 'public-cert.pem');
const KEY = path.resolve(__dirname, '../../', 'private-key.pem');
const port = 5060;
const sslOptions = {
  cert: fs.readFileSync(CERT, 'utf8'), // needs utf8
  key: fs.readFileSync(KEY, 'utf8'),
  SNICallback: (data) => {
    console.log('SNI callback', data);
  } // eslint-disable-line
};

setupSystemSettings(port);

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  prependPath: false,
});
let requestCount = 0;
const server = http.createServer((req, res) => {
  const requestToProxy = req;

  requestToProxy.headers.pprcount = requestCount;
  requestCount += 1;

  console.log('PING NORMAL: ', req.url);

  proxy.web(requestToProxy, res, {
    target: req.url,
  });
});


// JUST PIPE THE CONNECT METHOD
function normalConnectHandler(req, socket) {
  const parts = req.url.split(':', 2);

  // open a TCP connection to the remote host
  const conn = net.connect(parts[1], parts[0], () => {
    // respond to the client that the connection was made
    socket.write('HTTP/1.1 200 OK\r\n\r\n');

    // create a tunnel between the two hosts
    socket.pipe(conn);
    conn.pipe(socket);
  });

  conn.on('error', (error) => {
    console.log('tunnel error', error);
  });
}

// MITM (EXPERIMENTAL/DOESNT WORK PROPERLY, HENCE DEPRECATION)
function mitmConnectHandler(req, socket) {
  const parts = req.url.split(':', 2);

  // pretend to receive the CONNECT request
  socket.write('HTTP/1.1 200 CONNECTION ESTABLISHED\r\n\r\n');
  // socket.pause();

  const tlsOptions = {
    host: parts[0],
    port: parts[1],
    // key: sslOptions.key,
    // cert: sslOptions.cert,
    rejectUnauthorized: true,
  };

  // connect to the remote server(?)
  const connectUpstream = tls.connect(tlsOptions, (cd) => {
    console.log('TLS: connect', parts);

    socket.pause();
    const cert = connectUpstream.getPeerCertificate();
    const obj = forge.asn1.fromDer(cert.raw.toString('binary'));
    const certificate = forge.pki.certificateFromAsn1(obj);
    // const interceptionCert = createCert(cert);
    // console.log('RESULT', interceptionCert);

    // TODO: left off here and move the /new.js! leaving this here for now
  });

  connectUpstream.on('secureConnect', () => console.log('TLS: secure connect', connectUpstream.authorized));
}

server.listen(port);
server.on('connect', (req, socket) => {
  const useNormalConnectHandler = true;

  if (useNormalConnectHandler) {
    normalConnectHandler(req, socket);
  } else {
    mitmConnectHandler(req, socket);
  }
});

console.log(`listening on port ${port}`); // eslint-disable-line no-console

module.exports.proxy = proxy;
module.exports.server = server;
