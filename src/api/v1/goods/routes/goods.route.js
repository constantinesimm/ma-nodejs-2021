const goodsRouter = require('express').Router();
const {goodsController} = require('../controllers');
const multer = require('multer');
const upload = multer();
const {
  validator: {
    validate,
    schemas: {bodyGoodsSchema, queryGoodsSchema},
  },
} = require(`${process.cwd()}/src/libs`);

goodsRouter
  .route('/filter')
  .get(validate({query: queryGoodsSchema}), goodsController.getFilter)
  .post(
    validate({
      body: bodyGoodsSchema,
      query: queryGoodsSchema,
    }),
    goodsController.postFilter,
  );

goodsRouter
  .route('/topprice')
  .get(goodsController.getTopPrice)
  .post(validate({body: bodyGoodsSchema}), goodsController.postTopPrice);

goodsRouter
  .route('/commonprice')
  .get(goodsController.getCommonPrice)
  .post(validate({body: bodyGoodsSchema}), goodsController.postCommonPrice);

goodsRouter.post('/data', upload.single('file'), goodsController.postData);

module.exports = goodsRouter;
