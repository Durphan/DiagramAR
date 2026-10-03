const verificarUsuarioExistente = async (req, res, next) => {
  const { username } = req.body;
  const usuario = await User.findOne({ where: { username } });

  if (usuario) {
    return res.status(409).json({ mensaje: "El usuario ya existe" });
  }

  next();
};