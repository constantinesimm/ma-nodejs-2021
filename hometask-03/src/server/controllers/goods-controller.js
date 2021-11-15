const validator = require('../../libs/validate');
const { goodsService } = require('../../services');
const { errorResponse, successResponse } = require('../../libs/http-response');

module.exports = {
  getFilter(req, res) {
    let responseData;
    if (!Object.keys(req.query).length) responseData = goodsService.allGoods();

    const validate = validator(req.query, 'queryGoodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    responseData = goodsService.filterGoods(req.query);

    return successResponse(res, responseData.length ? 200 : 204, responseData);
  },
  postFilter(req, res) {
    if (!Object.keys(req.query).length)
      return successResponse(res, 200, JSON.parse(req.body));

    const validateQuery = validator(req.query, 'queryGoodsSchema');
    const validateBody = validator(JSON.parse(req.body), 'goodsSchema');

    if (validateQuery.errors || validateBody.errors) {
      let errors = validateQuery.errors ? validateQuery.errors : validateBody.errors;

      return errorResponse(res, 422, { errors });
    }

    let responseData = goodsService.filterGoods(req.query, JSON.parse(req.body));

    return successResponse(res, responseData.length ? 200 : 204, responseData);
  },
  getTopPrice(req, res) {
    let responseData = goodsService.findTopPrice();

    return successResponse(res, 200, responseData);
  },
  postTopPrice(req, res) {
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    let responseData = goodsService.findTopPrice(JSON.parse(req.body));

    return successResponse(res, 200, responseData);
  },
  getCommonPrice(req, res) {
    let responseData = goodsService.commonPrice();

    return successResponse(res, 200, responseData);
  },
  postCommonPrice(req, res) {
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    let responseData = goodsService.commonPrice(JSON.parse(req.body));

    return successResponse(res, 200, responseData);
  },
  postData(req, res) {
    if (!req.body) return errorResponse(res, 400, { message: 'No data is added' });
    const validate = validator(JSON.parse(req.body), 'goodsSchema');

    if (validate.errors) {
      return errorResponse(res, 422, { errors: validate.errors });
    }

    const result = goodsService.dataService(req.body);

    return result.status
      ? successResponse(res, 200, { message: result.message })
      : errorResponse(res, 400, { message: result.message });
  }
}
