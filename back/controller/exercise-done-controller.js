import { partialValidate, validate } from '../schemas/exerciseDoneSchema.js';
import { ExerciseDone } from '../model/postgres-sequelize/exerciseDone.js';
import { AppError } from '../errors/AppError.js';

export class ExerciseDoneController {

  exerciseDoneModel = new ExerciseDone();

  async get(req, res) {
    const sessionId = req.params.sessionId;
    const exerciseDone = await this.exerciseDoneModel.get({sessionId});
    return res.status(200).json(exerciseDone);
  }

  async getById(req, res) {
    const id = req.params.id;
    const sessionId = req.params.sessionId;

    const exerciseDone = await this.exerciseDoneModel.getById({ id , sessionId});

    if (exerciseDone) {
      return res.status(200).json(exerciseDone);
    } else {
      return res.status(404).json({
        error: 'Not found',
        message: `Exercise done with id ${id} does not exist`
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    const deleted = await this.exerciseDoneModel.delete({ id , sessionId });

    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).json({
        error: 'Not found.',
        message: `Exercise done with id ${id} does not exist.`
      });
    }
  }

  async post(req, res) {
    const result = validate(req.body);
    const sessionId = req.params.sessionId;

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }

    try {
      const exerciseDone = await this.exerciseDoneModel.post({ input: result.data , sessionId })
      return res.status(201).json(exerciseDone);
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
    const sessionId = req.params.sessionId;

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }

    try {
      const exerciseDone = await this.exerciseDoneModel.put({ id, input: result.data , sessionId});
      return res.status(200).json(exerciseDone);
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
