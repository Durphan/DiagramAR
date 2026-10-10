const { register, login } = require('../services/auth.service');

const registerUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await register(username, password);

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuarioId: user.id,
    });
  } catch (error) {
    if (error.message === `El usuario ${username} ya existe en el sistema`) {
      error.statusCode = 409;
    }
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { token } = await login(username, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15min en ms
    });

    return res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    if (error.message === 'Usuario o contraseña incorrectos') {
      error.statusCode = 401;
    }
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
