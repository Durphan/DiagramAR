const logger = require('../utils/logger');
const ValidationError = require('../errors/validationError');



const validateBodyInput = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      logger.error('Error de validación:', error);
      throw new ValidationError(error.details[0].message);
    }
    return next();
  };
};

const validateParamsInput = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      logger.error('Error de validación:', error);
      throw new ValidationError(error.details[0].message);
    }
    return next();
  };
};

module.exports = {
  validateBodyInput,
  validateParamsInput,
};
