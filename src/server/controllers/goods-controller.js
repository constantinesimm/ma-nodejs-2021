const validator = require('../../libs/validate');
const {goodsService, streamService} = require('../../services');
const {errorMessages, successMessages} = require('../../../config');
const {errorResponse, successResponse} = require('../../libs/http-response');
module.exports = {
  async getFilter(req, res) {
    try {
      let responseData;

      if (Object.keys(req.query).length) {
        const validate = validator(req.query, 'queryGoodsSchema');

        if (validate.errors) {
          return errorResponse(res, 422, {errors: validate.errors});
        }

        responseData = await goodsService.filterGoods(req.query);
      } else responseData = await goodsService.allGoods();

      return successResponse(
        res,
        responseData.length ? 200 : 204,
        responseData,
      );
    } catch (error) {
      return errorResponse(res, 400, {error: error.message});
    }
  },
  async postFilter(req, res) {
    if (!Object.keys(req.query).length)
      return successResponse(res, 200, JSON.parse(req.body));

    const validateQuery = validator(req.query, 'queryGoodsSchema');
    const validateBody = validator(JSON.parse(req.body), 'goodsSchema');

    if (validateQuery.errors || validateBody.errors) {
      let errors = validateQuery.errors
        ? validateQuery.errors
        : validateBody.errors;

      return errorResponse(res, 422, {errors});
    }

    let responseData = await goodsService.filterGoods(
      req.query,
      JSON.parse(req.body),
    );

    return successResponse(res, responseData.length ? 200 : 204, responseData);
  },
  async getTopPrice(req, res) {
    try {
      let responseData = await goodsService.findTopPrice();

      return successResponse(res, 200, responseData);
    } catch (error) {
      return errorResponse(res, 400, {error: error.message});
    }
  },
  async postTopPrice(req, res) {
    try {
      const validate = validator(JSON.parse(req.body), 'goodsSchema');

      if (validate.errors) {
        return errorResponse(res, 422, {errors: validate.errors});
      }

      let responseData = await goodsService.findTopPrice(JSON.parse(req.body));

      return successResponse(res, 200, responseData);
    } catch (error) {
      return errorResponse(res, 400, {error: error.message});
    }
  },
  async getCommonPrice(req, res) {
    try {
      let responseData = await goodsService.commonPrice();

      return successResponse(res, 200, responseData);
    } catch (error) {
      return errorResponse(res, 400, {error: error.message});
    }
  },
  async postCommonPrice(req, res) {
    try {
      const validate = validator(JSON.parse(req.body), 'goodsSchema');

      if (validate.errors) {
        return errorResponse(res, 422, {errors: validate.errors});
      }

      let responseData = await goodsService.commonPrice(JSON.parse(req.body));

      return successResponse(res, 200, responseData);
    } catch (error) {
      return errorResponse(res, 400, {error: error.message});
    }
  },
  async postData(req, res) {
    if (req.headers['content-type'] === 'text/csv') {
      try {
        const result = await streamService(req);

        if (result) {
          return successResponse(res, 200, {
            message: successMessages.dataFileCreated,
          });
        }
      } catch (error) {
        return errorResponse(res, 500, {message: error.message});
      }
    } else {
      if (!req.body)
        return errorResponse(res, 400, {
          message: errorMessages.emptyRequestBody,
        });
      const validate = validator(JSON.parse(req.body), 'goodsSchema');

      if (validate.errors) {
        return errorResponse(res, 422, {errors: validate.errors});
      }

      const result = goodsService.dataService(req.body);

      return result.status
        ? successResponse(res, 200, {message: result.message})
        : errorResponse(res, 400, {message: result.message});
    }
  },
};
