const { errorResponse } = require('../../libs/http-response');

module.exports = {
  notFound(req, res) {
    return errorResponse(res, 404, { message: 'Page not found' });
  }
}
