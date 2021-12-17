const discount = require('./discount');
const setApplicationRoutes = require('./set-application-routes');
const setupDirectories = require('./setup-directories');
const latestUploadedFile = require('./latest-uploaded-data');
const createPostgreDatabase = require('./setup-postgre-db');

module.exports = {
  discount,
  setupDirectories,
  setApplicationRoutes,
  latestUploadedFile,
  createPostgreDatabase,
};
