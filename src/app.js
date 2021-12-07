const express = require('express');
const bodyParser = require('body-parser');
const {setApplicationRoutes, setupDirectories} = require('./utils');
const {notFoundMiddleware, errorMiddleware} = require('./middleware');

const app = express();

app.use(bodyParser.json(), bodyParser.urlencoded({extended: true}));

/**
 * Add API routes
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
