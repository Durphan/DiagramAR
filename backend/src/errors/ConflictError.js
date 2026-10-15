const AppError = require('./AppError');
const { CONFLICT } = require('../constants/httpStatus');

class ConflictError extends AppError {
  constructor(message, code = 'CONFLICT') {
    super(message, CONFLICT, code);
  }
}

module.exports = ConflictError;