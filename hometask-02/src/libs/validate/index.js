const { Validator } = require('jsonschema')
const v = new Validator();

const schemas = require('./schemas');

module.exports = (target, schema) => {
  const validate = v.validate(target, schemas[schema]);

  if (validate.errors.length) {
    return { errors: validate.errors.map(err => err.stack.replace('instance.', '')) }
  } else return true;
}
