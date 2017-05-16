const forge = require('node-forge');

const createCert = function (cn, data) {
  console.log(
    `Generating 512-bit key-pair and certificate for \"${cn}\".`);
  const keys = forge.pki.rsa.generateKeyPair(512);
  console.log('key-pair created.');

  const cert = forge.pki.createCertificate();

  cert.serialNumber = '01';
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(
    cert.validity.notBefore.getFullYear() + 1);
  const attrs = [{
    name: 'commonName',
    value: cn,
  }, {
    name: 'countryName',
    value: 'US',
  }, {
    shortName: 'ST',
    value: 'Virginia',
  }, {
    name: 'localityName',
    value: 'Blacksburg',
  }, {
    name: 'organizationName',
    value: 'Test',
  }, {
    shortName: 'OU',
    value: 'Test',
  }];
  cert.setSubject(attrs);
  cert.setIssuer(attrs);
  cert.setExtensions([{
    name: 'basicConstraints',
    cA: true,
  }, {
    name: 'keyUsage',
    keyCertSign: true,
    digitalSignature: true,
    nonRepudiation: true,
    keyEncipherment: true,
    dataEncipherment: true,
  }, {
    name: 'subjectAltName',
    altNames: [{
      type: 6, // URI
      value: 'http://myuri.com/webid#me',
    }],
  }]);
  // FIXME: add subjectKeyIdentifier extension
  // FIXME: add authorityKeyIdentifier extension
  cert.publicKey = keys.publicKey;

  // self-sign certificate
  cert.sign(keys.privateKey);

  // save data
  const result = {
    cert: forge.pki.certificateToPem(cert),
    privateKey: forge.pki.privateKeyToPem(keys.privateKey),
  };

  data[cn] = result;

  return result;

  console.log(`certificate created for \"${cn}\": \n${data[cn].cert}`);
};

module.exports = createCert;
