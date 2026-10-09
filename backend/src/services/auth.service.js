const bcrypt = require('bcryptjs');
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

module.exports = { register };
