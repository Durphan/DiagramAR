const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/auth.controllers');
const { validarRegistro } = require('../middlewares/validarRegistro');

router.post('/register', validarRegistro, registerUser);

module.exports = router;
