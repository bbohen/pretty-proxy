const fs = require('fs');
const path = require('path');

const { generateRootCA } = require('./certGenerator');

function saveRootCA(commonName = 'prettyProxy') {
  const rootCA = generateRootCA(commonName);
  const userHome = process.env.HOME || process.env.USERPROFILE;
  const certDirectory = path.resolve(userHome, 'pretty-proxy-certs');
  const rootCAcrtFilePath = path.resolve(certDirectory, 'rootCA.crt');
  const rootCAkeyFilePath = path.resolve(certDirectory, 'rootCA.key');

  if (!fs.existsSync(certDirectory)) {
    fs.mkdirSync(certDirectory);
  }

  fs.writeFileSync(rootCAcrtFilePath, rootCA.certificate);
  fs.writeFileSync(rootCAkeyFilePath, rootCA.privateKey);

  console.log('rootCA generated');
  console.log(`PLEASE TRUST the rootCA.crt in ${certDirectory}`);
}

module.exports = saveRootCA;
