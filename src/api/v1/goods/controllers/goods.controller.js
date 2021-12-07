const {HttpError} = require(`${process.cwd()}/src/libs`);
const {goodsService, streamService} = require('../services');
const {
  response: {successMessages},
} = require(`${process.cwd()}/config`);

module.exports = {
  getFilter: async (req, res, next) => {
    try {
      let response = Object.keys(req.query).length
        ? await goodsService.filterGoodsList(req.query)
        : await goodsService.allGoodsList();

      return res.status(response.length ? 200 : 204).json(response);
    } catch (error) {
      return next(new HttpError(400, error.message));
    }
  },
  postFilter: async (req, res, next) => {
    if (!Object.keys(req.query).length) {
      return res.json(req.body);
    }

    try {
      const response = await goodsService.filterGoodsList(req.query, req.body);

      return res.status(response.length ? 200 : 204).json(response);
    } catch (error) {
      return next(new HttpError(400, error.message));
    }
  },
  getTopPrice: async (req, res, next) => {
    try {
      const response = await goodsService.findTopPrice();

      return res.json(response);
    } catch (error) {
      next(new HttpError(400, error.message));
    }
  },
  postTopPrice: async (req, res, next) => {
    try {
      const response = await goodsService.findTopPrice(req.body);

      return res.json(response);
    } catch (error) {
      next(new HttpError(400, error.message));
    }
  },
  getCommonPrice: async (req, res, next) => {
    try {
      const response = await goodsService.commonPrice();

      return res.json(response);
    } catch (error) {
      next(new HttpError(400, error.message));
    }
  },
  postCommonPrice: async (req, res, next) => {
    try {
      const response = await goodsService.commonPrice(req.body);

      return res.json(response);
    } catch (error) {
      next(new HttpError(400, error.message));
    }
  },
  postData: async (req, res, next) => {
    try {
      let response;
      if (!req.parseCsvAction) {
        response = await streamService(req);

        if (response) return res.json({message: successMessages.files.created});
      } else {
        response = goodsService.dataService(req.body);

        return response.status
          ? res.json({message: response.message})
          : next(new HttpError(400, response.message));
      }
    } catch (error) {
      next(new HttpError(400, error.message));
    }
  },
};
