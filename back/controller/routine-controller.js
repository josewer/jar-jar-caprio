import { partialValidate, validate } from '../schemas/routineSchema.js';
import { Routine } from '../model/postgres-sequelize/routine.js';
import { AppError } from '../errors/AppError.js';

export class RoutineController {

  routineModel = new Routine();

  async get(req, res) {
    const userId = req.user.id;
    const routines = await this.routineModel.get({ userId });
    return res.status(200).json(routines);
  }

  async getById(req, res) {
    const id = req.params.id;
    const userId = req.user.id;
    const routine = await this.routineModel.getById({ id, userId });

    if (routine) {
      return res.status(200).json(routine);
    } else {
      return res.status(404).json({
        error: 'Not found',
        message: `Routine with id ${id} does not exist`
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    const userId = req.user.id;
    const deleted = await this.routineModel.delete({ id, userId });

    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).json({
        error: 'Not found.',
        message: `Routine with id ${id} does not exist.`
      });
    }
  }

  async post(req, res) {
    const result = validate(req.body);
    const userId = req.user.id;

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }

    try {
      const routine = await this.routineModel.post({ input: { ...result.data, userId } })
      return res.status(201).json(routine);
    } catch (error) {

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
    const userId = req.user.id;

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }

    try {
      const routine = await this.routineModel.put({ id, input: { ...result.data, userId } });
      return res.status(200).json(routine);
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
