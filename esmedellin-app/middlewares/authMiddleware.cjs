// middlewares/authMiddleware.cjs
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer TOKEN'

  if (!token) {
    return res.status(403).json({ message: 'Se requiere autenticación.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido.' });
    }
    req.user = user; // Almacena la información del usuario en la solicitud
    next();
  });
};

module.exports = authMiddleware;
