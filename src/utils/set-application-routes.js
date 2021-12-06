const fs = require('fs');
const {api} = require('../../config').server;
const {
  authGuardMiddleware: {onlyPrivateRoute},
} = require('../middleware');

const readDirSync = path => fs.readdirSync(path);

const setApplicationRoutes = (app, modulesPath) => {
  const apiVersions = readDirSync(`${api.path}/${modulesPath}`);

  apiVersions.forEach(version => {
    const modules = readDirSync(`${api.path}/${modulesPath}/${version}`);

    modules.forEach(module => {
      const routes = readDirSync(
        `${api.path}/${modulesPath}/${version}/${module}/routes`,
      );

      for (let route of routes) {
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
