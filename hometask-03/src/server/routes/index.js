const { serviceController } = require("../controllers");
const goodsRoutes = require('./goods-routes');
//const discountRoutes;

const routes = [].concat(
  goodsRoutes/*, discountRoutes*/
);

module.exports = (req, res) => {
  for (const route in routes) {
    const [method, pathname, controller] = routes[route];

    if (req.method === method && req.pathname === pathname) return controller(req, res);
  }

  return serviceController.notFound(req, res);
}
