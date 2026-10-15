const asyncHandler = require('../utils/asyncHandler');
const { register } = require('../services/auth.service');
const { CREATED } = require('../constants/httpStatus');

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await register(username, password);
  res.status(CREATED).json({
    mensaje: 'Usuario creado correctamente',
    usuarioId: user.id,
  });
});

module.exports = { registerUser };
