const {serviceController} = require('../controllers');
const goodsRoutes = require('./goods-routes');
const discountRoutes = require('./discount-routes');

const routes = [].concat(goodsRoutes, discountRoutes);

module.exports = (req, res) => {
  for (const route in routes) {
    const [method, pathname, controller] = routes[route];

    const endpoint = req.pathname !== undefined ? req.pathname : req.url;

    if (req.method === method && endpoint === pathname)
      return controller(req, res);
  }

  return serviceController.notFound(req, res);
};
