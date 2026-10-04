const { User } = require('../models');

const findByUsername = (username) => {
  return User.findOne({ where: { username } });
};

const createUser = (username, passwordHash) => {
  return User.create({ username, password: passwordHash });
};

module.exports = { findByUsername, createUser };
