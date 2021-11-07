const {
  filterController,
  getTopPriceController,
  postTopPriceController,
  getCommonPriceController,
  postCommonPriceController,
  dataController,
  notFoundController
} = require('./controllers');

const router = [
  ['POST', '/data', dataController],
  ['GET', '/filter', filterController],
  ['POST', '/filter', filterController],
  ['GET', '/topprice', getTopPriceController],
  ['POST', '/topprice', postTopPriceController],
  ['GET', '/commonprice', getCommonPriceController],
  ['POST', '/commonprice', postCommonPriceController]
];

module.exports = (req, res) => {
  for (const route in router) {
    const [method, pathname, controller] = router[route];

    if (req.method === method && req.pathname === pathname) return controller(req, res);
  }

  return notFoundController(req, res);
}
