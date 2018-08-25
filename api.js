var express = require('express');
var app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

app.use(router);

exports.app = app;