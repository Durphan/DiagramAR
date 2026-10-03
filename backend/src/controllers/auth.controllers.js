const bcrypt = require("bcryptjs");
const { User } = require("../../models");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        mensaje: "Usuario y contraseña son obligatorios"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await User.create({
      username,
      password: passwordHash
    });

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      usuarioId: usuario.id
    });
  } catch (error) {
      res.status(500).json({ message: "Error al crear el usuario" });
  }
}

module.exports = { registerUser };