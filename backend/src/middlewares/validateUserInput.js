const { registerSchema } = require('../schemas/user.schema');

const validateUserInput = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  console.log('Error de validación:', error);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  return next();
};

module.exports = validateUserInput;
