'use strict';

const express = require('express'),
	  bodyParser = require('body-parser'),
	  logger = require('./lib/logger');	  

const app = express();

/*
* body parser to encode request body text
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended' : false}));

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

logger.info('App started listening port 3000');

require('./users').init(app);

module.exports = app;