const services = require('../services');

const notFound = (req, res) => {
  const { message, code } = services.notFound();

  res.statusCode = code;
  res.write(message);

  return res.end();
};

module.exports = {
  notFound
}
