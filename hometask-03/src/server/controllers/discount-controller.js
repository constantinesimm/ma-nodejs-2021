const validator = require('../../libs/validate');
const { discountService } = require('../../services');
const { errorResponse, successResponse } = require('../../libs/http-response');
const { errorMessages } = require('../../../config');

module.exports = {
  getPromise(req, res) {
    discountService
      .calcDiscountWithPromise()
      .then(response => successResponse(res, 200, response))
      .catch(error => errorResponse(res, 500, error))
  },
  postPromise(req, res) {
    if (!req.body) return errorResponse(res, 400, { message: errorMessages.emptyRequestBody });
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    discountService
      .calcDiscountWithPromise(JSON.parse(req.body))
      .then(response => successResponse(res, 200, response))
      .catch(error => errorResponse(res, 500, error))
  },
  getPromisify(req, res) {
    discountService
      .calcDiscountWithPromisify()
      .then(responseData => successResponse(res, 200, responseData))
      .catch(error => errorResponse(res, 500, error.message));
  },
  postPromisify(req, res) {
    if (!req.body) return errorResponse(res, 400, { message: errorMessages.emptyRequestBody });
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    discountService
      .calcDiscountWithPromisify(JSON.parse(req.body))
      .then(responseData => successResponse(res, 200, responseData))
      .catch(error => errorResponse(res, 500, error.message));
  },
  async getAsync(req, res) {
    let responseData;

    try {
      responseData = await discountService.calcDiscountWithAsync();

      return successResponse(res, 200, responseData);
    } catch(error) {
      return errorResponse(res, 500, error);
    }
  },
  async postAsync(req, res) {
    if (!req.body) return errorResponse(res, 400, { message: errorMessages.emptyRequestBody });
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    let responseData;

    try {
      responseData = await discountService.calcDiscountWithAsync(JSON.parse(req.body));

      return successResponse(res, 200, responseData);
    } catch(error) {
      return errorResponse(res, 500, error);
    }
  },
  getCallback(req, res) {
    discountService
      .calcDiscountWithCallback(responseData => successResponse(res, 200, responseData))
  },
  postCallback(req, res) {
    if (!req.body) return errorResponse(res, 400, { message: errorMessages.emptyRequestBody });
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    discountService
      .calcDiscountWithCallback(responseData =>
        successResponse(res, 200, responseData), JSON.parse(req.body)
      )
  }
}
