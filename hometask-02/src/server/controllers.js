const services = require('../services');
const validator = require('../libs/validate');
const { errorResponse, successResponse } = require('../libs/http-response');

module.exports = {
  filterController(req, res) {
    let queryData = req.method === 'GET' ? req.query : JSON.parse(req.body);

    let response;
    if (!Object.keys(queryData).length) response = services.allGoods();

    const validate = validator(queryData, 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    response = services.filterGoods(queryData);

    return successResponse(res, response.length ? 200 : 204, response);
  },
  getTopPriceController(req, res) {},
  postTopPriceController(req, res) {},
  getCommonPriceController(req, res) {},
  postCommonPriceController(req, res) {},
  dataController(req, res) {},
  notFoundController(req, res) {
    const { message, code } = services.notFound();

    res.statusCode = code;
    res.write(message);

    return res.end();
  }
}
