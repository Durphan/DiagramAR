const { register } = require('../services/auth.service');

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await register(username, password);

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuarioId: user.id,
    });
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = { registerUser };
