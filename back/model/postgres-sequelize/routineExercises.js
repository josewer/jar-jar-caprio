import { where } from 'sequelize';
import { templateExercisesModel, catExerciseModel, templateRoutineModel } from './db.js';

export class RoutineExercises {
  async get({ routineId, userId }) {
    return await templateExercisesModel.findAll({
      attributes: ['id', 'routineId', 'exerciseId', 'numSeries', 'numRepeats'],
      include: [
        {
          model: templateRoutineModel,
          where: { id: routineId, userId },
          attributes: []
        }
      ]
    });
  }

  async getById({ id, routineId, userId }) {
    return await templateExercisesModel.findByPk(id, {
      attributes: ['id', 'routineId', 'exerciseId', 'numSeries', 'numRepeats'],
      include: [
        {
          model: catExerciseModel,
          as: 'exercise',
          attributes: ['id', 'name', 'mainMuscle', 'difficulty', 'involvedMuscles', 'equipment']
        }, {
          model: templateRoutineModel,
          where: { id: routineId, userId },
          attributes: []
        }
      ]
    });
  }

  async exists({ id, routineId, userId }) {
    const count = await templateExercisesModel.count({
      where: { id },
      include: [
        {
          model: templateRoutineModel,
          where: { id: routineId, userId },
          attributes: []
        }
      ]
    });
    return count > 0;
  }


  async delete({ id, routineId , userId }) {
    return await templateExercisesModel.destroy({
      where: { id }
      , include: [
        {
          model: templateRoutineModel,
          where: { id: routineId, userId },
          attributes: []
        }
      ]
    });
  }

  async post({ input, routineId }) {
    return await templateExercisesModel.create({
      id: crypto.randomUUID(),
      routineId,
      ...input
    });
  }

  async put({ id, routineId, input }) {
    const [numberOfAffectedRows, [updatedExercise]] = await templateExercisesModel.update(
      { ...input },
      { where: { id, routineId }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      return false;
    }

    return updatedExercise;
  }
}
