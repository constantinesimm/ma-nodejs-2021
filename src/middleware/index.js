const authGuardMiddleware = require('./auth-guard.middleware');
const {notFoundMiddleware, errorMiddleware} = require('./error.middleware');

module.exports = {
  authGuardMiddleware,
  notFoundMiddleware,
  errorMiddleware,
};
