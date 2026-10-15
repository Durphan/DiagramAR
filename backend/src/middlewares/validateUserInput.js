const { registerSchema } = require('../schemas/user.schema');
const logger = require('../utils/logger');

const validateUserInput = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  
  if (error) {  
    logger.error('Error de validación:', error);
    return res.status(400).json({ error: error.details[0].message });
  }
  return next();
};

module.exports = validateUserInput;
