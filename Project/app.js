var express = require('express'),
path = require('path'),
cookieParser = require('cookie-parser'),
logger = require('morgan'),
router = require('./routes/home'),
app = express();

app.use(logger('dev'));//if order changes?
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));   
app.use('/',router);

module.exports = app;
//node es version
//how to check es version
// what is session and res req cycle