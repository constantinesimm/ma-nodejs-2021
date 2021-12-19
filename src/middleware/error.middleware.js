const {
  HttpError,
  validator: {validateErrorsHandler},
} = require('../libs');

const notFoundMiddleware = (req, res, next) =>
  next(new HttpError(404, `Not found ${req.path}`));

const errorMiddleware = (err, req, res, next) => {
  validateErrorsHandler(err, res);

  if (err.status && err.message) {
    return res.status(err.status).json({message: err.message});
  }

  return next(new HttpError());
};

module.exports = {
  notFoundMiddleware,
  errorMiddleware,
};
