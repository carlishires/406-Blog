// app.js
// Updated for lab 6

require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
require('./app_api/models/db');
require('./app_api/config/passport');

//var indexRouter = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(passport.initialize());

//app.use('/', indexRouter);
app.use('/api', routesApi);

// Added per Lab 5 - Angular
app.use(function(req, res) {
  res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
}); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) { 
  if (err.name === 'UnauthorizedError') 
  { 
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  } else {
    // render the error page
    res.status(err.status || 500);
    res.json({"message" : err.name + ": " + err.message});
  } 
});

module.exports = app;
