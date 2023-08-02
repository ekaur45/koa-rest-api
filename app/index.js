#!/usr/bin/env node

'use strict';

// Load APM on production environment
const config = require('./config');
const apm = require('./connections/apm');
const App = require('./app');
const logger = require('./logger');
//const jwt = require("koa-jwt");

const app = new App();

function handleError(err, ctx) {
  if (apm.active) {
    apm.captureError(err);
  }

  if (ctx == null) {
    logger.error({ err, event: 'error' }, 'Unhandled exception occured');
  }
}

async function terminate(signal) {
  try {
    await app.terminate();
  } finally {
    logger.info({ signal, event: 'terminate' }, 'App is terminated');
    process.kill(process.pid, signal);
  }
}
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://db-mongodb-nyc1-51183-107aa92a.mongo.ondigitalocean.com',{dbName:'admin',user:'doadmin',pass:'mG3258R4Hr6Xq07V'}).then(()=>{console.log("db connected")}).catch();
// Handle uncaught errors
app.on('error', handleError);
//app.use(jwt({secret:'cmFzZGRzYWpmaHNkamtmaEAjJEAjISQyMzQxMzI='}).unless({path:[/^\/public/]}))
// Start server
if (!module.parent) {
  const server = app.listen(config.port, config.host, () => {
    logger.info({ event: 'execute' }, `API server listening on ${config.host}:${config.port}, in ${config.env}`);
  });
  server.on('error', handleError);

  const errors = ['unhandledRejection', 'uncaughtException'];
  errors.map(error => {
    process.on(error, handleError);
  });

  const signals = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signals.map(signal => {
    process.once(signal, () => terminate(signal));
  });
}

// Expose app
module.exports = app;
