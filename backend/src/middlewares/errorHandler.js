const logger = require('../utils/logger');
const AppError = require('../errors/AppError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  logger.error(err);

  const isOperationalError = err instanceof AppError;
  const statusCode = isOperationalError ? err.statusCode : 500;
  const message = isOperationalError
    ? err.message
    : 'Internal server error';

  res.status(statusCode).json({
    code: isOperationalError ? err.code : 'INTERNAL_ERROR',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
