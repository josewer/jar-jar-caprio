import { User } from '../model/postgres-sequelize/user.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export class AuthController {
  userModel = new User();

  async login (req, res) {
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

        return res.status(200).cookie('access_token', accessToken, {
          httpOnly: true,
          secure: Boolean(config.app.cookie_access_token_secure),
          sameSite: 'strict',
          maxAge: Number(config.app.cookie_access_token_expire_in)
        }).json(token);
      } else {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
