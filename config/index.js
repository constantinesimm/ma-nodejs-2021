require('dotenv').config();
const url = require('url');
const {errors, success} = require('./constants/response-messages');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
};

const getPostgreConfig = connectionString => {
  const {auth, port, hostname, pathname} = url.parse(connectionString);

  return {
    username: auth ? auth.split(':').shift() : null,
    password: auth ? auth.split(':').pop() : null,
    host: hostname,
    port,
    database: pathname ? pathname.replace('/', '') : null,
  };
};

module.exports = {
  response: {
    errorMessages: errors,
    successMessages: success,
  },
  server: {
    api: {
      path: `${process.cwd()}/src`,
      baseUrl: '/api/v1',
    },
    directories: ['uploads'],
    port: normalizePort(process.env.PORT || '3000'),
  },
  database: {
    postgre: {
      get superUserDB() {
        return getPostgreConfig(process.env.POSTGRESQL_URL_SUPER);
      },
      get dbCredentials() {
        return getPostgreConfig(process.env.POSTGRESQL_URL);
      },
    },
  },
  auth: {
    basic: {
      username: process.env.CREDENTIALS_USERNAME,
      password: process.env.CREDENTIALS_PASSWORD,
      get authToken() {
        const authToken = Buffer.from(
          `${this.username}:${this.password}`,
        ).toString('base64');

        return `Basic ${authToken}`;
      },
    },
  },
};
