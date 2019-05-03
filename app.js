let express = require('express'),
path = require('path'),
cookieParser = require('cookie-parser'),
logger = require('morgan'),
router = require('./routes/home'),
cors = require('cors'),
app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'public'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));   
app.use('/',router);

module.exports = app;
