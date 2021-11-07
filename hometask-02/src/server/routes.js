const {
  notFound
} = require('./controllers');

const router = {
  data: {
    method: 'POST',
    pathname: '/data',
    controller: ''
  },
  filter: {
    method: 'GET',
    pathname: '/filter',
    controller: ''
  },
  topprice: {
    method: 'GET',
    pathname: '/topprice',
    controller: ''
  },
  commonprice: {
    method: 'GET',
    pathname: '/commonprice',
    controller: ''
  }
}

module.exports = (req, res) => {
  const { pathname, method } = req;

  for (let route of Object.keys(router)) {
    const [routeMethod, routePathname, routeController] = router[route];

    if (method === routeMethod && pathname === routePathname) return routeController(req, res);
  }

  return notFound(req, res);
}
