const fs = require('fs');
const express = require('express')
const vhost = require('vhost')
const vhttps = require('vhttps');

const app = express()

console.log()

const defaultCredential = {
    cert: fs.readFileSync(process.env.sv_cert),
    key: fs.readFileSync(process.env.sv_key),
};

const credentialA = {
    host: 'siivousville.com',
    cert: fs.readFileSync(process.env.sv_cert),
    key: fs.readFileSync(process.env.sv_key),
};

const credentialB = {
    host: 'talviruusu.com',
    cert: fs.readFileSync(process.env.sv_cert),
    key: fs.readFileSync(process.env.sv_key),
};

//Use the virtual hosts
app.use(vhost('talviruusu.com', express.static('../talviruusu-com/dist')));
app.use(vhost('siivousville.com', express.static('../siivousville-com/dist')));

//Start server
const httpsServer = vhttps.createServer(defaultCredential, [credentialA, credentialB], app);
httpsServer.listen(443);
