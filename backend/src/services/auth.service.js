const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');

const validateUserNotDuplicated = async (username) => {
  const existingUser = await userRepository.findByUsername(username);

  if (existingUser) {
    const error = new Error(`El usuario ${username} ya existe en el sistema`);
    error.status = 409;
    throw error;
  }
};

const register = async (username, password) => {
  await validateUserNotDuplicated(username);
  const passwordHash = await bcrypt.hash(password, 10);
  return userRepository.createUser(username, passwordHash);
};

module.exports = { register };
