const {Pool} = require('pg');
const {
  database: {postgre},
} = require('../../../config');

const dbClient = (mode = 'default') => {
  const clientModes = {
    default: postgre.dbCredentials,
    super: postgre.superUserDB,
  };

  if (!clientModes[mode]) {
    console.log('Not recognized client mode');
    process.exit(1);
  }

  return new Pool(clientModes[mode]);
};

module.exports = dbClient;
