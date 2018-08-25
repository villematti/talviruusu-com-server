var express = require('express');
var app = express();

var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Hello from API")
});

app.use(router);

exports.app = app;