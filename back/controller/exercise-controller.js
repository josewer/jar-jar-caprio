import { partialValidate, validate } from '../schemas/exerciseSchema.js';
// import { Exercise } from '../model/postgres-prisma/exercise.js';
// import { Exercise } from "../model/local-storage/exercise.js";
// import { Exercise } from "../model/postgres/Exercise.js";
import { Exercise } from '../model/postgres-sequelize/Exercise.js';

export class ExerciseController {
  exerciseModel = new Exercise();

  async get (req, res) {
    const exercises = await this.exerciseModel.get();
    return res.status(200).json(exercises);
  }

  async getById (req, res) {
    const id = req.params.id;

    const exercise = await this.exerciseModel.getById({ id });
    console.log(exercise);
    if (exercise) {
      return res.status(200).json(exercise);
    } else {
      return res.status(404).json({
        error: 'Not found',
        details: `Exercise with id ${id} does not exist`
      });
    }
  }

  async delete (req, res) {
    const id = req.params.id;

    const deleted = await this.exerciseModel.delete({ id });

    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).json({
        error: 'Not found.',
        details: `Exercise with id ${id} does not exist.`
      });
    }
  }

  async post (req, res) {
    const result = validate(req.body);

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }

    const exercise = await this.exerciseModel.post({ input: result.data });

    if (exercise) {
      return res.status(201).json(exercise);
    }

    return res.status(500).json({
      error: 'Error.',
      details: 'Unexpected error'
    });
  }

  async put (req, res) {
    const result = partialValidate(req.body);
    const id = req.params.id;

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }

    const exercise = await this.exerciseModel.put({ id, input: result.data });

    if (exercise) {
      return res.status(200).json(exercise);
    }

    return res.status(404).json({
      error: 'Not found.',
      details: `Exercise with id ${id} does not exist.`
    });
  }
}
