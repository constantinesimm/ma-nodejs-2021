const {HttpError} = require(`${process.cwd()}/src/libs`);
const discountsService = require('../services/discounts.service');

module.exports = {
  getPromise: (req, res, next) => {
    discountsService
      .calcDiscountWithPromise()
      .then(response => res.json(response))
      .catch(error => next(new HttpError(500, error.message)));
  },
  postPromise: (req, res, next) => {
    discountsService
      .calcDiscountWithPromise(req.body)
      .then(response => res.json(response))
      .catch(error => next(new HttpError(500, error.message)));
  },
  getPromisify: (req, res, next) => {
    discountsService
      .calcDiscountWithPromisify()
      .then(response => res.json(response))
      .catch(error => next(new HttpError(500, error.message)));
  },
  postPromisify: (req, res, next) => {
    discountsService
      .calcDiscountWithPromisify(req.body)
      .then(response => res.json(response))
      .catch(error => next(new HttpError(500, error.message)));
  },
  getAsync: async (req, res, next) => {
    try {
      const response = await discountsService.calcDiscountWithAsync();

      return res.json(response);
    } catch (error) {
      next(new HttpError(400, error.message));
    }
  },
  postAsync: async (req, res, next) => {
    try {
      const response = await discountsService.calcDiscountWithAsync(req.body);

      return res.json(response);
    } catch (error) {
      next(new HttpError(400, error.message));
    }
  },
  getCallback: async (req, res, next) => {
    try {
      await discountsService.calcDiscountWithCallback(response =>
        res.json(response),
      );
    } catch (error) {
      next(new HttpError(400, error.message));
    }
  },
  postCallback: async (req, res, next) => {
    try {
      await discountsService.calcDiscountWithCallback(
        response => res.json(response),
        req.body,
      );
    } catch (error) {
      next(new HttpError(400, error.message));
    }
  },
};
