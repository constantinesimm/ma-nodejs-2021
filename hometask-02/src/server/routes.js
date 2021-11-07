const {
  filterController,
  topPriceController,
  commonPriceController,
  dataController,
  notFoundController
} = require('./controllers');

const router = [
  ['POST', '/data', dataController],
  ['GET', '/filter', filterController],
  ['POST', '/filter', filterController],
  ['GET', '/topprice', topPriceController],
  ['POST', '/topprice', topPriceController],
  ['GET', '/commonprice', commonPriceController],
  ['POST', '/commonprice', commonPriceController]
];

module.exports = (req, res) => {
  for (const route in router) {
    const [method, pathname, controller] = router[route];

    if (req.method === method && req.pathname === pathname) return controller(req, res);
  }

  return notFoundController(req, res);
}
