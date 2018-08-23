const express = require('express')
const vhost = require('vhost')

const app = express()

function createVirtualHost(domainName, dirPath) {
    return vhost(domainName, express.static( dirPath ));
}

//Create the virtual hosts
var trHost = createVirtualHost("talviruusu.com", "talviruusu");
var svHost = createVirtualHost("siivousville.com", "siivousville");

//Use the virtual hosts
app.use(vhost('talviruusu.com', (req, res) => {
    console.log(req)
    res.send('Hello from talviruusu')
}));
app.use(vhost('siivousville.com', (req, res) => {
    console.log(req)
    res.send('Hello from siivousville')
}));

//Start server
var port = 80;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});