const {
  response: {errorMessages},
} = require('../../config');

class HttpError extends Error {
  constructor(status = 500, msg = errorMessages['500']) {
    super(msg);
    this.status = status;
  }
}

module.exports = HttpError;
