var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var signRouter = require('./routes/sign');
var posRouter = require('./routes/pos');
var db = require('./routes/db');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sign', signRouter);
app.use('/main', posRouter);
app.use('/db', db.router);

module.exports = app;
