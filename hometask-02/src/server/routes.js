const controllers = require('./controllers');

const router = [
  ['POST', '/data', controllers.postDataController],
  ['GET', '/filter', controllers.getFilterController],
  ['POST', '/filter', controllers.postFilterController],
  ['GET', '/topprice', controllers.getTopPriceController],
  ['POST', '/topprice', controllers.postTopPriceController],
  ['GET', '/commonprice', controllers.getCommonPriceController],
  ['POST', '/commonprice', controllers.postCommonPriceController]
];

module.exports = (req, res) => {
  for (const route in router) {
    const [method, pathname, controller] = router[route];

    if (req.method === method && req.pathname === pathname) return controller(req, res);
  }

  return controllers.notFoundController(req, res);
}
