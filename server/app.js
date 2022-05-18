const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// favicon location
app.use(
  favicon(
    path.join(__dirname, '../', 'client', 'imgs', 'icons', 'favicon.ico')
  )
);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// front-end static files
app.use(express.static(path.join(__dirname, '..', '/client')));

/* Routes */
const routes = require('./routes/index');
const api = require('./routes/api');
const inscriptions = require('./routes/inscriptions');
const honors = require('./routes/honors');
const institutions = require('./routes/institutions');
const people = require('./routes/people');
const networks = require('./routes/networks');

// API v2
const api2 = require('./routes/v2');
const inscriptions2 = require('./routes/v2/inscriptions');
const honors2 = require('./routes/v2/honors');
const institutions2 = require('./routes/v2/institutions');
const people2 = require('./routes/v2/people');

app.use('/api/v2', api2);
app.use('/api/v2/inscriptions', inscriptions2);
app.use('/api/v2/honors', honors2);
app.use('/api/v2/institutions', institutions2);
app.use('/api/v2/people', people2);

app.use('/', routes);
app.use('/api/', api);
app.use('/api/inscriptions/', inscriptions);
app.use('/api/honors/', honors);
app.use('/api/institutions/', institutions);
app.use('/api/people/', people);
app.use('/api/networks/', networks);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
