const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/users.controllers');
const { validateBodyInput } = require('../middlewares/validateUserInput');
const { registerSchema } = require('../schemas/user.schema');

router.post('/', validateBodyInput(registerSchema), registerUser);

module.exports = router;
