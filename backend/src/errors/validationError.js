const AppError = require('./AppError');
const { BAD_REQUEST } = require('../constants/httpStatus');

class ValidationError extends AppError {
  constructor(message, code = 'VALIDATION_ERROR') {
    super(message, BAD_REQUEST, code);
  }
}

module.exports = ValidationError;