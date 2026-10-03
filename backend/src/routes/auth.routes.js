const express = require("express");
const router = express.Router();

const { register } = require("../controllers/auth.controllers");
const verificarUsuarioExistente = require("../middlewares/verificarUsuarioExistente");


router.post(
  "/register",
  verificarUsuarioExistente,
  register
);

module.exports = router;