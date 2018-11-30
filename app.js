'use strict';
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var localStrategy = require('passport-local').Strategy;
var user = require('./models/User');
var archivo = require('./models/Archivo');
var flash = require('flash');
var favicon = require('serve-favicon');
//var upload= require("express-fileupload");

//require('./config/passport');
// Import routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter= require('./routes/profile');

// Conecct to database
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://olme59:4424fa15@ds155263.mlab.com:55263/qfiles' , {
    useNewUrlParser: true
  })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

// Configure app 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/uploads', express.static('uploads'));
app.use(favicon(path.join(__dirname,'public','stylesheets','img','favicon.ico')));

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(upload());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Manejando sessiones
app.use(session({
  secret: 'keyboard cat dog pig you', // Change for security
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  name: 'sessionid',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Configurando la estrategia 
passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'The resourse not found'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
