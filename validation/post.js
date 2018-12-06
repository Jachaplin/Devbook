const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 3, max: 300 })) {
    errors.text = 'Post must be between 3 and 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors, // errors: errors,
    isValid: isEmpty(errors)
  };
};
