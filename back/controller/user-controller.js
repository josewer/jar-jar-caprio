import { partialValidate, validate } from '../schemas/userSchema.js';
import { User } from '../model/postgres-sequelize/user.js';
import { AppError } from '../errors/AppError.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export class UserController {
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
          secure: Boolean(config.app.cookie_access_token_secure), // si es prod a true
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

  async get (req, res) {
    const users = await this.userModel.get();
    return res.status(200).json(users);
  }

  async getById (req, res) {
    const id = req.params.id;

    const user = await this.userModel.getById({ id });

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({
        error: 'Not found',
        details: `User with id ${id} does not exist`
      });
    }
  }

  async delete (req, res) {
    const id = req.params.id;

    const deleted = await this.userModel.delete({ id });

    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).json({
        error: 'Not found.',
        details: `User with id ${id} does not exist.`
      });
    }
  }

  async post (req, res) {
    const result = validate(req.body);

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }

    try {
      const user = await this.userModel.post({ input: result.data });

      if (user) {
        return res.status(201).json(user);
      }
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.status).json(error);
      }

      return res.status(500).json({
        error: 'Error.',
        details: 'Unexpected error'
      });
    }
  }

  async put (req, res) {
    const result = partialValidate(req.body);
    const id = req.params.id;

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }

    try {
      const user = await this.userModel.put({ id, input: result.data });
      if (user) { return res.status(200).json(user); }
    } catch (error) {
      console.error(error);

      if (error instanceof AppError) {
        return res.status(error.status).json(error);
      }

      return res.status(404).json({
        error: 'Not found.',
        details: `User with id ${id} does not exist.`
      });
    }
  }
}
