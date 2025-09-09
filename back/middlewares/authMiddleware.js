import config from '../config.js';
import jwt from 'jsonwebtoken';

export function authMiddleware (req, res, next) {
  let token = req.cookies?.token || req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No autenticado' });

  if (token.startsWith('Bearer ')) { token = token.substring(7); }

  try {
    const decoded = jwt.verify(token, config.app.secret_jwt_key);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
}
