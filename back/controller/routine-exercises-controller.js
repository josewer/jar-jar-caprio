import { partialValidate, validate } from '../schemas/routineExercisesSchema.js';
import { RoutineExercises } from '../model/postgres-sequelize/routineExercises.js';

import { Routine } from '../model/postgres-sequelize/routine.js';
import { AppError } from '../errors/AppError.js';
import { Exercise } from '../model/postgres-sequelize/exercise.js';

export class RoutineExercisesController {
  routineExercisesModel = new RoutineExercises();
  exerciseModel = new Exercise();
  routineModel = new Routine();

  async get(req, res) {

    const routineId = req.params.routineId;

    const routinesExercise = await this.routineExercisesModel.get({routineId});
    return res.status(200).json(routinesExercise);
  }

  async getById(req, res) {
    const id = req.params.id;

    const routinesExercise = await this.routineExercisesModel.getById({ id });

    if (routinesExercise) {
      return res.status(200).json(routinesExercise);
    } else {
      return res.status(404).json({
        error: 'Not found',
        message: `Routine exercise with id ${id} does not exist`
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    const deleted = await this.routineExercisesModel.delete({ id });

    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).json({
        error: 'Not found.',
        message: `Routine exercise with id ${id} does not exist.`
      });
    }
  }

  async post(req, res) {
    const result = validate(req.body);

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }

    const routine = await this.routineModel.exists({ id: result.data.routineId });
    if (!routine) { return res.status(400).json({ message: 'Routine does not exist' }); }

    const exercise = await this.exerciseModel.exists({ id: result.data.exerciseId });
    if (!exercise) { return res.status(400).json({ message: 'Exercise does not exist' }); }

    try {
      const routineExercise = await this.routineExercisesModel.post({ input: result.data })
      return res.status(201).json(routineExercise);
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

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }


    const routine = await this.routineModel.exists({ id: result.data.routineId });
    if (!routine) { return res.status(400).json({ message: 'Routine does not exist' }); }

    const exercise = await this.exerciseModel.exists({ id: result.data.exerciseId });
    if (!exercise) { return res.status(400).json({ message: 'Exercise does not exist' }); }

    try {
      const routineExercise = await this.routineExercisesModel.put({ id, input: result.data });
      return res.status(200).json(routineExercise);
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
