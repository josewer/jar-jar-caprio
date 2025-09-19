import { partialValidate, validate } from '../schemas/sessionSchema.js';
import { User } from '../model/postgres-sequelize/user.js';
import { Session } from '../model/postgres-sequelize/session.js';
import { AppError } from '../errors/AppError.js';

export class SessionController {
  userModel = new User();
  sessionModel = new Session();

  async get(req, res) {
    const session = await this.sessionModel.get();
    return res.status(200).json(session);
  }

  async getById(req, res) {
    const id = req.params.id;

    const session = await this.sessionModel.getById({ id });

    if (session) {
      return res.status(200).json(session);
    } else {
      return res.status(404).json({
        error: 'Not found',
        message: `Session with id ${id} does not exist`
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    const deleted = await this.sessionModel.delete({ id });

    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).json({
        error: 'Not found.',
        message: `Session with id ${id} does not exist.`
      });
    }
  }

  async post(req, res) {
    const result = validate(req.body);

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }

    const user = await this.userModel.exists({ id: result.data.userId });
    if (!user) { return res.status(400).json({ message: 'User does not exist' }); }

    try {
      const session = await this.sessionModel.post({ input: result.data })
      return res.status(201).json(session);
    } catch (error) {
      console.error(error)

      if (error instanceof AppError) {
        return res.status(error.status).json(error);
      }

      return res.status(500).json({
        error: 'Error.',
        message: 'Unexpected error'
      });
    }
  }


  async start(req, res) {

    const userId = req.body.userId;
    const startDate = new Date();

    const input = { userId, startDate }

    try {
      const session = await this.sessionModel.post({ input })
      return res.status(201).json(session);
    } catch (error) {
      console.error(error)

      if (error instanceof AppError) {
        return res.status(error.status).json(error);
      }

      return res.status(500).json({
        error: 'Error.',
        message: 'Unexpected error'
      });
    }
  }


  async finished(req, res) {

    const id = req.params.id;
    const endDate = new Date();

    const input = { endDate, ...req.body }

    const result = partialValidate(input);

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }

    try {
      const data = await this.sessionModel.put({ id, input: result.data })

      if (!data) {
        return res.status(404).json({
          error: 'Not found.',
          message: `Session with id ${id} does not exist.`
        });
      }

      const diffMs = data.endDate.getTime() - data.startDate.getTime();
      const diffMinutes = Math.floor(diffMs / (1000 * 60));

      const session = await this.sessionModel.put({ id, input: { totalDuration: diffMinutes } })

      if (!session) {
        return res.status(404).json({
          error: 'Not found.',
          message: `Session with id ${id} does not exist.`
        });
      }

      return res.status(200).json(session);
    } catch (error) {
      console.error(error)

      if (error instanceof AppError) {
        return res.status(error.status).json(error);
      }

      return res.status(500).json({
        error: 'Error.',
        message: 'Unexpected error'
      });
    }
  }


  async put(req, res) {
    const result = partialValidate(req.body);
    const id = req.params.id;

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }

    const user = await this.userModel.getById({ id: result.data.userId });
    if (!user) { return res.status(400).json({ message: 'User does not exist' }); }

    try {
      const session = await this.sessionModel.put({ id, input: result.data });
      return res.status(200).json(session);
    } catch (error) {
      console.error(error);

      if (error instanceof AppError) {
        return res.status(error.status).json(error);
      }

      return res.status(500).json({
        error: 'Error.',
        message: 'Unexpected error'
      });
    }
  }
}
