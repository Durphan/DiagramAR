const AppError = require('./AppError');
const { NOT_FOUND } = require('../constants/httpStatus');

class NotFoundError extends AppError {
  constructor(message, code = 'NOT_FOUND') {
    super(message, NOT_FOUND, code);
  }
}

module.exports = NotFoundError;