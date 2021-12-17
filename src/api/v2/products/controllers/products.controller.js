const {productsService} = require('../services');

const {HttpError} = require(`${process.cwd()}/src/libs`);
const {
  response: {successMessages},
} = require(`${process.cwd()}/config`);

module.exports = {
  getProduct: async (req, res, next) => {
    try {
      const product = await productsService.getProductById(
        req.params.productId,
      );

      return res.status(product.length ? 200 : 204).json(product.shift());
    } catch (error) {
      return next(new HttpError(500, error));
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const result = await productsService.createProduct(req.body);

      if (result) return res.json({message: successMessages.db.created});
    } catch (error) {
      return next(new HttpError(500, error));
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const result = await productsService.updateProductById(
        req.params.productId,
        req.body,
      );

      if (result) return res.json({message: successMessages.db.updated});
    } catch (error) {
      return next(new HttpError(500, error));
    }
  },
  removeProduct: async (req, res, next) => {
    try {
      const result = await productsService.removeProductById(
        req.params.productId,
      );

      if (result) return res.json({message: successMessages.db.removed});
    } catch (error) {
      return next(new HttpError(500, error));
    }
  },
};
