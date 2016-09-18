var express = require('express');
var app = express();
var server = require('http').createServer(app);

var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var db = mongoose.createConnection(process.env.MONGODB_URI);
var router = express.Router();
var socket = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var models = {
    posts: db.model('Post', mongoose.Schema({
        body: String
    }))
}

router.get('/', function (req, res) {
    res.render('index.html');
});
router.get('/api/:collection', function (req, res) {
    models[req.params.collection].find(function (err, results, count) {
        res.send(results);
    });
});
router.post('/api/:collection', function (req, res) {
    models[req.params.collection].create(req.body, function (err, data) {
        models[req.params.collection].find(function (err, results, count) {
            socket.emit('new-post', results);
        });
    });
    res.send(req.body);
});
app.use('/', router);

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
server.listen(port);

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

module.exports = app;
