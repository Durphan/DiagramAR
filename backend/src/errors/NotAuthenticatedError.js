const AppError = require('./AppError');
const { UNAUTHORIZED } = require('../constants/httpStatus');

class NotAuthenticatedError extends AppError {
  constructor(message, code = 'NOT_AUTHENTICATED') {
    super(message, UNAUTHORIZED, code);
  }
}

module.exports = NotAuthenticatedError;