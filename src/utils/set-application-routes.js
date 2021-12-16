/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const {
  server: { api }
} = require('../../config');
const {
  authGuardMiddleware: {onlyPrivateRoute},
} = require('../middleware');

const readDirSync = path => fs.readdirSync(path);


/**
 * Simple function for concat all routes one time when app is started
 * Current function is walk recursive in modules directory(fn argument - modulesPath) as start dir
 * concats processed dirs and find directory "routes". Than getting all files than contains *.route.js and setup api-endpoint
 * Endpoint name is - baseURL/API-path/api-version/module-name/routes/routes-file-name
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
