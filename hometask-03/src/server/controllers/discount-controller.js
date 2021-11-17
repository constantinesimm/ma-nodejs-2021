const validator = require('../../libs/validate');
const { discountService } = require('../../services');
const { errorResponse, successResponse } = require('../../libs/http-response');

module.exports = {
  getPromise(req, res) {
    discountService
      .calcDiscountWithPromise()
      .then(response => successResponse(res, 200, response))
      .catch(error => errorResponse(res, 500, error))
  },
  postPromise(req, res) {
    if (!req.body) return errorResponse(res, 400, { message: 'No data is added' });
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    discountService
      .calcDiscountWithPromise(JSON.parse(req.body))
      .then(response => successResponse(res, 200, response))
      .catch(error => errorResponse(res, 500, error))
  },
  getPromisify(req, res) {},
  postPromisify(req, res) {
    if (!req.body) return errorResponse(res, 400, { message: 'No data is added' });
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }
  },
  async getAsync(req, res) {},
  async postAsync(req, res) {
    if (!req.body) return errorResponse(res, 400, { message: 'No data is added' });
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }
  },
  getCallback(req, res) {},
  postCallback(req, res) {
    if (!req.body) return errorResponse(res, 400, { message: 'No data is added' });
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }
  }
}
