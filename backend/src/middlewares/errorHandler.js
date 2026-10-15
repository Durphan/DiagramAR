const logger = require('../utils/logger');
const errorMapping = require('../errors/errorMapping');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  logger.error(err);
  const statusCode = err.name ? errorMapping[err.name] || 500 : 500;
  res.status(statusCode).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
