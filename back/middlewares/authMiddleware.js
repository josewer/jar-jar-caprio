import config from '../config.js';
import jwt from 'jsonwebtoken';

export function authMiddleware (req, res, next) {
  let token = req.cookies?.access_token || req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Not is authorized' });

  if (token.startsWith('Bearer ')) { token = token.substring(7); }

  try {
    const decoded = jwt.verify(token, config.app.secret_jwt_key);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session is expired' });
    }

    return res.status(401).json({ message: 'Token is invalid' });
  }
}
