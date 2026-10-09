const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    'string.min': 'El username debe tener al menos 3 caracteres',
    'string.max': 'El username no puede superar los 50 caracteres',
    'any.required': 'El username es obligatorio',
    'string.empty': 'El username no puede estar vacio',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'any.required': 'La contraseña es obligatoria',
    'string.empty': 'la contraseña no puede estar vacia',
  }),
});

module.exports = {
  registerSchema,
};
