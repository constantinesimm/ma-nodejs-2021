const express = require('express');
const bodyParser = require('body-parser');
const {
  setApplicationRoutes,
  setupDirectories,
  createPostgreDatabase,
} = require('./utils');
const {notFoundMiddleware, errorMiddleware} = require('./middleware');

const app = express();

/**
 * Setup Databases
 */
(async () => await createPostgreDatabase())();

app.use(bodyParser.json(), bodyParser.urlencoded({extended: true}));

/**
 * Add API routes
 * function description available in file module
 */
setApplicationRoutes(app, 'api');

/**
 * App Error Middleware
 */
app.use(notFoundMiddleware, errorMiddleware);

/**
 * Check or create app directories on app start
 */
setupDirectories();

module.exports = app;
