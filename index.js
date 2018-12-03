const fs = require('fs');
const express = require('express')
const vhost = require('vhost')
const vhttps = require('vhttps');

var router = express.Router();

const app = express()

console.log(process.env)

const defaultCredential = {
    cert: fs.readFileSync(process.env.sv_cert),
    key: fs.readFileSync(process.env.sv_key),
};

const credentialA = {
    host: 'siivousville.com',
    cert: fs.readFileSync(process.env.sv_cert),
    key: fs.readFileSync(process.env.sv_key),
};

const credentialC = {
    host: 'www.siivousville.com',
    cert: fs.readFileSync(process.env.sv_www_cert),
    key: fs.readFileSync(process.env.sv_www_key),
};

const credentialE = {
    host: 'api.talviruusu.com',
    cert: fs.readFileSync(process.env.tr_api_cert),
    key: fs.readFileSync(process.env.tr_api_key),
};

const credentialF = {
    host: 'tarjous.uudenmaanikkunapalvelu.com',
    cert: fs.readFileSync(process.env.ikp_cert),
    key: fs.readFileSync(process.env.ikp_key)
}

const credentialG = {
    host: 'katmaar.fi',
    cert: fs.readFileSync(process.env.km_cert),
    key: fs.readFileSync(process.env.km_key)
}

const credentialH = {
    host: 'www.katmaar.fi',
    cert: fs.readFileSync(process.env.km_cert),
    key: fs.readFileSync(process.env.km_key)
}

const credentialI = {
    host: 'statbeat.talviruusu.com',
    cert: fs.readFileSync(process.env.stat_cert),
    key: fs.readFileSync(process.env.stat_key)
}

//Use the virtual hosts
app.use(vhost('siivousville.com', express.static('../siivousville-com/dist')));
app.use(vhost('www.talviruusu.com', express.static('../talviruusu-com/dist')));
app.use(vhost('www.siivousville.com', express.static('../siivousville-com/dist')));
app.use(vhost('katmaar.fi', express.static('../katmaar.fi/build')));
app.use(vhost('www.katmaar.fi', express.static('../katmaar.fi/build')));
app.use(vhost('tarjous.uudenmaanikkunapalvelu.com', express.static('../uudenmaanikkunapalvelu.talviruusu.com/client/build')));
app.use(vhost('statbeat.com', express.static('../landing-statbeat/build')));
app.use(vhost('www.statbeat.com', express.static('../landing-statbeat/build')));

app.use(vhost('api.talviruusu.com', require('./api.js').app))
app.use(router)

//Start server
const httpsServer = vhttps.createServer(defaultCredential, [credentialA, credentialC, credentialE, credentialF, credentialG, credentialH, credentialI], app);
httpsServer.listen(443);

app.listen(80)