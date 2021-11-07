const services = require('../services');
const validator = require('../libs/validate');
const { errorResponse, successResponse } = require('../libs/http-response');

module.exports = {
  filterController(req, res) {
    let queryData = req.method === 'GET' ? req.query : JSON.parse(req.body);

    let response;
    if (!Object.keys(queryData).length) response = services.allGoods();

    const validate = validator(queryData, 'filterGoodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    response = services.filterGoods(queryData);

    return successResponse(res, response.length ? 200 : 204, response);
  },
  topPriceController(req, res) {
    let response;
    if (req.method === 'GET') response = services.findTopPrice();
    if (req.method === 'POST') {
      const validate = validator(JSON.parse(req.body), 'goodsSchema');

      if (validate.errors) {
        return errorResponse(res, 422, { errors: validate.errors });
      }

      response = services.findTopPrice(JSON.parse(req.body));
    }

    return successResponse(res, 200, response);
  },
  commonPriceController(req, res) {
    let response;
    if (req.method === 'GET') response = services.commonPrice();
    if (req.method === 'POST') {
      const validate = validator(JSON.parse(req.body), 'goodsSchema');

      if (validate.errors) {
        return errorResponse(res, 422, { errors: validate.errors });
      }

      response = services.commonPrice(JSON.parse(req.body));
    }

    return successResponse(res, 200, response);
  },
  dataController(req, res) {},
  notFoundController(req, res) {
    return errorResponse(res, 404, { message: 'Page not found' });
  }
}
