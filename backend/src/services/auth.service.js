const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');

const ensureUsernameIsAvailable = async (username) => {
  const existingUser = await userRepository.findByUsername(username);

  if (existingUser) {
    const error = new Error(`El usuario ${username} ya existe en el sistema`);
    throw error;
  }
};

const register = async (username, password) => {
  await ensureUsernameIsAvailable(username);
  const passwordHash = await bcrypt.hash(password, 10);
  return userRepository.createUser(username, passwordHash);
};

const login = async (username, password) => {
  const user = await userRepository.findByUsername(username);
  const correctPassword = await bcrypt.compare(password, user.password);

  if (!user || !correctPassword) {
    const error = new Error('Usuario o contraseña incorrectos');
    throw error;
  }

  const token = jwt.sign(
    {
      usuarioId: user.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  return { token: token };
};

module.exports = {
  register,
  login,
};
