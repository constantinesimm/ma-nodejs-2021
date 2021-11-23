const { discountController } = require('../controllers');

const routes = [
  ['GET', '/discount/promise', discountController.getPromise],
  ['POST', '/discount/promise', discountController.postPromise],
  ['GET', '/discount/promisify', discountController.getPromisify],
  ['POST', '/discount/promisify', discountController.postPromisify],
  ['GET', '/discount/async', discountController.getAsync],
  ['POST', '/discount/async', discountController.postAsync],
  ['GET', '/discount/callback', discountController.getCallback],
  ['POST', '/discount/callback', discountController.postCallback]
];

module.exports = routes;
