const { goodsController } = require('../controllers');

const routes = [
  ['POST', '/data', goodsController.postData],
  ['GET', '/filter', goodsController.getFilter],
  ['POST', '/filter', goodsController.postFilter],
  ['GET', '/topprice', goodsController.getTopPrice],
  ['POST', '/topprice', goodsController.postTopPrice],
  ['GET', '/commonprice', goodsController.getCommonPrice],
  ['POST', '/commonprice', goodsController.postCommonPrice],
];

module.exports = routes;

