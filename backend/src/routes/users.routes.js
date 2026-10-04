const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/users.controllers');
const validateUserInput = require('../middlewares/validateUserInput');

router.post('/', validateUserInput, registerUser);

module.exports = router;
