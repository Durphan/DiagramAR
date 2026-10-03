const express = require("express");
const router = express.Router();

const { register } = require("../controllers/authController");
const verificarUsuarioExistente = require("../middlewares/verificarUsuarioExistente");


router.post(
  "/register",
  verificarUsuarioExistente,
  register
);

module.exports = router;