var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var db = mongoose.createConnection(process.env.MONGODB_URI);
var router = express.Router();

var models = {
    posts: db.model('Post', mongoose.Schema({
        body: String
    }))
}

router.get('/', function(req, res, next) {
    res.render('index.html');
});
router.get('/api/:collection', function(req, res, next) {
    models[req.params.collection].find(function(err, results, count) {
        res.send(results);
    });
});
router.post('/api/:collection', function(req, res) {
    models[req.params.collection].create(req.body, function(err, data) {
        console.log(data);
    });
    res.send(req.body);
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
