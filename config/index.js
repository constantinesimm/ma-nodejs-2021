require('dotenv').config();
const {errors, success} = require('./constants/response-messages');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
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
  auth: {
    basic: {
      username: 'Masters',
      password: 'Academy',
      get authToken() {
        const authToken = Buffer.from(
          `${this.username}:${this.password}`,
        ).toString('base64');

        return `Basic ${authToken}`;
      },
    },
  },
};
