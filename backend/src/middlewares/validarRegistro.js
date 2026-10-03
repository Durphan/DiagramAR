const { User } = require('../../models');

const validarRegistro = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        mensaje: 'Usuario y contraseña son obligatorios',
      });
    }

    const usuario = await User.findOne({ where: { username } });

    if (usuario) {
      return res.status(409).json({
        mensaje: `El usuario ${usuario.username} ya existe en el sistema`,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'error al validar el registro' });
  }
};

module.exports = {
  validarRegistro,
};
