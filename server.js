var express = require('express');
var app = express();
var server = require('http').createServer(app);

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
server.listen(port);

var path = require('path');
//var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var mongoose = require('mongoose');
var db = mongoose.createConnection(process.env.MONGODB_URI);
var socket = require('socket.io').listen(server);

var models = require('./models')(db);
app.use('/', require('./routes')(models, socket));

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
