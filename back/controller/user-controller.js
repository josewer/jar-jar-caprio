import { partialValidate, validate } from '../schemas/userSchema.js';
import { User } from '../model/postgres-sequelize/user.js';
import { AppError } from '../errors/AppError.js';

export class UserController {
  userModel = new User();

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
