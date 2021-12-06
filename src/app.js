const express = require('express');
const bodyParser = require('body-parser');
const {setApplicationRoutes, setupDirectories} = require('./utils');
const {notFoundMiddleware, errorMiddleware} = require('./middleware');

const app = express();

app.use(bodyParser.json(), bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  console.log(req.query, 'test');
  console.log(JSON.stringify(req.body, null, 4));
  next();
});
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
