const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/auth.controllers");
const { verificarUsuarioExistente } = require("../middlewares/verificarUsuarioExistente");


router.post(
  "/register",
  verificarUsuarioExistente,
  registerUser
);

module.exports = router;