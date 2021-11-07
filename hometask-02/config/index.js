require('dotenv').config();
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
};

module.exports = {
  port: normalizePort(process.env.PORT || '3000')
}
