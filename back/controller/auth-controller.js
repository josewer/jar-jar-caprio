import { User } from '../model/postgres-sequelize/user.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export class AuthController {
  userModel = new User();

  async login(req, res) {
    const input = req.body;

    if (!input.username || !input.password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
      const user = await this.userModel.login({ input });

      if (user) {
        const accessToken = jwt.sign(
          { ...user, jti: crypto.randomUUID() }
          , config.app.secret_jwt_key
          , { expiresIn: config.app.access_token_expire_in }
        );

        const token = {
          access_token: accessToken
        };

        res.set('Cache-Control', 'no-store');
        res.cookie('access_token', accessToken, {
          httpOnly: true,
          sameSite: 'strict',
          secure: false,
          maxAge: 3600 * 1000,
          path: '/'
        }).json(token);
      } else {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async session(req, res) {
    let token = req.cookies?.access_token || req.header('Authorization');
    res.set('Cache-Control', 'no-store');
    if (!token) return res.status(401).json({ authenticated: false, message: 'Not is authorized' });

    if (token.startsWith('Bearer ')) { token = token.substring(7); }

    try {
      const decoded = jwt.verify(token, config.app.secret_jwt_key);

      return res.status(200).json({ authenticated: true, user: decoded });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ authenticated: false, message: 'Session is expired' });
      }

      return res.status(401).json({ authenticated: false, message: 'Token is invalid' });
    }
  }

  async logout(req, res) {
    res.clearCookie('access_token', { path: '/' });
    res.json({ message: 'Logged out' });
  }
}
