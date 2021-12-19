const bodyGoodsSchema = require('./body-goods.schema');
const queryGoodsSchema = require('./query-goods.schema');
const paramsProductIdSchema = require('./params-product-id.schema');
const {
  bodyRawProductSchema,
  bodyProductRequiredSchema,
} = require('./body-raw-product.schema');

module.exports = {
  bodyGoodsSchema,
  queryGoodsSchema,
  paramsProductIdSchema,
  bodyRawProductSchema,
  bodyProductRequiredSchema,
};
