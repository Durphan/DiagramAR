const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    const error = new Error('No autenticado');
    error.statusCode = 401;
    return next(error);
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.usuarioId = payload.usuarioId;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.warn('Token expirado');
    } else {
      console.warn('Token inválido:', error.name);
    }

    const err = new Error('Sesión inválida o expirada');
    err.statusCode = 401;
    next(err);
  }
}

module.exports = authenticateUser;
