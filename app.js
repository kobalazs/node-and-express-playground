const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const typeorm = require('typeorm');
require('reflect-metadata');
require('dotenv').config();

const errorHandler = require('./errors/errorHandler');
const apiRouter = require('./routes/api');
const indexRouter = require('./routes/index');

const app = express();
typeorm.createConnection().then(async () => {
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);
  app.use('/api', apiRouter);

  app.use((req, res, next) => {
    next(createError(404));
  });
  app.use(errorHandler);
}).catch((error) => {
  throw error;
});

module.exports = app;
