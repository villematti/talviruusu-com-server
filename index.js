const fs = require('fs');
const express = require('express')
const vhost = require('vhost')
const vhttps = require('vhttps');

var router = express.Router();

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
    cert: fs.readFileSync(process.env.tr_cert),
    key: fs.readFileSync(process.env.tr_key),
};

const credentialC = {
    host: 'www.siivousville.com',
    cert: fs.readFileSync(process.env.sv_www_cert),
    key: fs.readFileSync(process.env.sv_www_key),
};

const credentialD = {
    host: 'www.talviruusu.com',
    cert: fs.readFileSync(process.env.tr_www_cert),
    key: fs.readFileSync(process.env.tr_www_key),
};

//Use the virtual hosts
app.use(vhost('talviruusu.com', express.static('../talviruusu-com/dist')));
app.use(vhost('siivousville.com', express.static('../siivousville-com/dist')));
app.use(vhost('www.talviruusu.com', express.static('../talviruusu-com/dist')));
app.use(vhost('www.siivousville.com', express.static('../siivousville-com/dist')));

app.use(vhost('api.talviruusu.com', require('./api.js').app))
app.use(router)

//Start server
const httpsServer = vhttps.createServer(defaultCredential, [credentialA, credentialB, credentialC, credentialD], app);
httpsServer.listen(443);

app.listen(80)