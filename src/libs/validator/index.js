const {
  Validator,
  ValidationError,
} = require('express-json-validator-middleware');

const schemas = require('./schemas');

const {validate} = new Validator({
  allErrors: false,
  $data: true,
  messages: true,
  errorDataPath: 'property',
  removeAdditional: true,
});

const validateErrorsHandler = (error, res) => {
  if (error instanceof ValidationError) {
    let errors = {};
    const ignoredKeywords = ['oneOf'];

    for (let key of Object.keys(error.validationErrors)) {
      errors[key] = [];

      error.validationErrors[key].forEach(err => {
        if (!ignoredKeywords.includes(err.keyword)) {
          let reasonKey = Object.keys(err.params).shift();

          errors[key].push({
            reason: `${reasonKey} - ${err.params[reasonKey]}`,
            errors: `${err.params[reasonKey]}, ${err.message}`,
          });
        }
      });
    }

    return res.status(422).json({
      name: 'ValidationError',
      message: 'Validation Exception',
      errors,
    });
  }
};

module.exports = {
  validateErrorsHandler,
  validate,
  schemas,
};
