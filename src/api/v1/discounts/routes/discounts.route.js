/* eslint-disable import/no-dynamic-require */
const discountRoutes = require('express').Router();
const {discountsController} = require('../controllers');

const {
  validator: {
    validate,
    schemas: {bodyGoodsSchema},
  },
} = require(`${process.cwd()}/src/libs`);

discountRoutes
  .route('/promise')
  .get(discountsController.getPromise)
  .post(validate({body: bodyGoodsSchema}), discountsController.postPromise);

discountRoutes
  .route('/promisify')
  .get(discountsController.getPromisify)
  .post(validate({body: bodyGoodsSchema}), discountsController.postPromisify);

discountRoutes
  .route('/async')
  .get(discountsController.getAsync)
  .post(validate({body: bodyGoodsSchema}), discountsController.postAsync);

discountRoutes
  .route('/callback')
  .get(discountsController.getCallback)
  .post(validate({body: bodyGoodsSchema}), discountsController.postCallback);

module.exports = discountRoutes;
