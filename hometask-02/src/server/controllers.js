const services = require('../services');
const validator = require('../libs/validate');
const { errorResponse, successResponse } = require('../libs/http-response');

module.exports = {
  getFilterController(req, res) {
    let responseData;
    if (!Object.keys(req.query).length) responseData = services.allGoods();

    const validate = validator(req.query, 'queryGoodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    responseData = services.filterGoods(req.query);

    return successResponse(res, responseData.length ? 200 : 204, responseData);
  },
  postFilterController(req, res) {
    if (!Object.keys(req.query).length)
      return successResponse(res, 200, JSON.parse(req.body));

    const validateQuery = validator(req.query, 'queryGoodsSchema');
    const validateBody = validator(JSON.parse(req.body), 'goodsSchema');

    if (validateQuery.errors || validateBody.errors) {
      let errors = validateQuery.errors ? validateQuery.errors : validateBody.errors;

      return errorResponse(res, 422, { errors });
    }

    let responseData = services.filterGoods(req.query, JSON.parse(req.body));

    return successResponse(res, responseData.length ? 200 : 204, responseData);
  },
  getTopPriceController(req, res) {
    let responseData = services.findTopPrice();

    return successResponse(res, 200, responseData);
  },
  postTopPriceController(req, res) {
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    let responseData = services.findTopPrice(JSON.parse(req.body));

    return successResponse(res, 200, responseData);
  },
  getCommonPriceController(req, res) {
    let responseData = services.commonPrice();

    return successResponse(res, 200, responseData);
  },
  postCommonPriceController(req, res) {
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    let responseData = services.commonPrice(JSON.parse(req.body));

    return successResponse(res, 200, responseData);
  },
  postDataController(req, res) {
    if (!req.body) return errorResponse(res, 400, { message: 'No data is added' });
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    const result = services.dataService(req.body);

    return result.status
      ? successResponse(res, 200, { message: result.message })
      : errorResponse(res, 400, { message: result.message });
  },
  notFoundController(req, res) {
    return errorResponse(res, 404, { message: 'Page not found' });
  }
}
