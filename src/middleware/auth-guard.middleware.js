const {
  auth: {basic},
  response: {errorMessages},
} = require('../../config');
const {HttpError} = require('../libs');

const authGuardMiddleware = {
  onlyPublicRoute: (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) next(new HttpError(403, errorMessages['403'].public));
    next();
  },
  onlyPrivateRoute: (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || authHeader !== basic.authToken)
      next(new HttpError(403, errorMessages['403'].private));
    next();
  },
};

module.exports = authGuardMiddleware;
