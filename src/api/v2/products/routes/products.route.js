const productsRouter = require('express').Router();
const {productsController} = require('../controllers');

const {
  validator: {
    validate,
    schemas: {
      paramsProductIdSchema,
      bodyRawProductSchema,
      bodyProductRequiredSchema,
    },
  },
} = require(`${process.cwd()}/src/libs`);

productsRouter.get(
  '/:productId',
  validate({params: paramsProductIdSchema}),
  productsController.getProduct,
);

productsRouter.post(
  '/create',
  validate({body: bodyProductRequiredSchema}),
  productsController.createProduct,
);

productsRouter.put(
  '/update/:productId',
  validate({params: paramsProductIdSchema, body: bodyRawProductSchema}),
  productsController.updateProduct,
);

productsRouter.delete(
  '/remove/:productId',
  validate({params: paramsProductIdSchema}),
  productsController.removeProduct,
);

module.exports = productsRouter;
