const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');
const ConflictError = require('../errors/ConflictError');

const ensureUsernameIsAvailable = async (username) => {
  const existingUser = await userRepository.findByUsername(username);

  if (existingUser) {
    throw new ConflictError(`Validation Error: El nombre de usuario "${username}" ya está en uso. Por favor, elige otro.`);
  }
};

const register = async (username, password) => {
  await ensureUsernameIsAvailable(username);
  const passwordHash = await bcrypt.hash(password, 10);
  return userRepository.createUser(username, passwordHash);
};

module.exports = { register };
