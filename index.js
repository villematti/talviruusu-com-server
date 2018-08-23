const express = require('express')
const vhost = require('vhost')

const app = express()

//Use the virtual hosts
app.use(vhost('talviruusu.com', express.static('../talviruusu-com/dist')));
app.use(vhost('siivousville.com', express.static('../siivousville-com/dist')));

//Start server
var port = 80;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});