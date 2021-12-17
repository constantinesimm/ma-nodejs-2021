const fs = require('fs');
const {
  server: {api},
} = require('../../config');
const {
  authGuardMiddleware: {onlyPrivateRoute},
} = require('../middleware');

const readDirSync = path => fs.readdirSync(path);

/**
 * Function Description
 * Setup api-routes pattern
 * Concats modules directory and created API-endpoints that app is listening.
 * On app startup function walk recursive in modules path directory(modules path is required argument).
 * Finding "routes" dir in each module and getting all files than contains *.route.js
 * Created endpoint name - <modules path>/<api-version>/<module-name>/<router.routes endpoint>
 * if routes path contains more than 1 route file api-url added route filename
 *
 * Example:
 * http://localhost:5000/api/v1/goods/filter
 * where:
 * baseURL - http://localhost:5000
 * /api - modules path
 * /v1 - api version
 * /products - module
 * /filter - router route endpoint
 */
const setApplicationRoutes = (app, modulesPath) => {
  const apiVersions = readDirSync(`${api.path}/${modulesPath}`);

  apiVersions.forEach(version => {
    const modules = readDirSync(`${api.path}/${modulesPath}/${version}`);

    modules.forEach(module => {
      const routes = readDirSync(
        `${api.path}/${modulesPath}/${version}/${module}/routes`,
      );

      for (const route of routes) {
        let endpoint = `/${modulesPath}/${version}/${module}`;
        const routeFile = `${api.path}/${modulesPath}/${version}/${module}/routes/${route}`;

        // if routes dir contains more than 1 routes file - add routes filename into endpoint
        if (routes.length > 1) endpoint += `/${route.split('.').shift()}`;

        app.use(endpoint, onlyPrivateRoute, require(routeFile));
      }
    });
  });
};

module.exports = setApplicationRoutes;
