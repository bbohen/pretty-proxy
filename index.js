const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({ agent: http.agent });

proxy.on('error', function (err, req, res) {
  console.log(err);
});

// proxy.on('proxyRes', function (proxyRes, req, res) {
//   var key = 'www-authenticate';
//   proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
// });

const server = http.createServer(function(req, res) {
  console.log(req.url);
  proxy.web(req, res, {
    target: req.url,
    prependPath: false,
    secure: false,
  }, (err) => {
    console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Mistakes were made: ' + req.url + '\n' + JSON.stringify(err, true, 2));
    res.end();
  });
});

server.listen(5050);
console.log("listening on port 5050");
