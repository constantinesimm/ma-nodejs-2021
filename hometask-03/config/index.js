require('dotenv').config();
const { errors, success } = require('./constants/response-messages');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
};

module.exports = {
  errorMessages: errors,
  successMessages: success,
  port: normalizePort(process.env.PORT || '3000')
}
