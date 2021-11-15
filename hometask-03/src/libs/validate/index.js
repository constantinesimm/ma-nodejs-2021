const { Validator } = require('jsonschema')
const validator = new Validator();

const schemas = require('./schemas');

module.exports = (target, schema) => {
  const validate = validator.validate(target, schemas[schema]);

  if (validate.errors.length) {
    return { errors: validate.errors.map(err => err.stack.replace('instance.', '')) }
  } else return true;
}
