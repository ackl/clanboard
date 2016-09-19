const express = require('express');
const app = express();
const server = require('http').createServer(app);

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
server.listen(port);

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const mongoose = require('mongoose');
const db = mongoose.createConnection(process.env.MONGODB_URI);
const socket = require('socket.io').listen(server);

const models = require('./models')(db);
app.use('/', require('./routes')(models, socket));

function normalizePort(val) {
  const port = parseInt(val, 10);
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
