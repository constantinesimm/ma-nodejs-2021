const { errorResponse } = require('../../libs/http-response');
const { errorMessages } = require('../../../config');

module.exports = {
  notFound(req, res) {
    return errorResponse(res, 404, { message: errorMessages.pageNotFound });
  }
}
