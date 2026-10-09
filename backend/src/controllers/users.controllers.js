const { register } = require('../services/auth.service');

const registerUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await register(username, password);

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuarioId: user.id,
    });
  } catch (error) {
    if (error.message === `El usuario ${username} ya existe en el sistema`){
      error.statusCode = 409
    }
    next(error)
  }
};

module.exports = { registerUser };
