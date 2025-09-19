import { templateExercisesModel, catExerciseModel } from './db.js';

export class RoutineExercises {
  async get({ routineId }) {
    return await templateExercisesModel.findAll({
      where: { routineId },
      attributes: ['id', 'routineId', 'exerciseId', 'numSeries', 'numRepeats']
    });
  }

  async getById({ id, routineId }) {
    return await templateExercisesModel.findByPk(id, {
      where: { routineId },
      attributes: ['id', 'routineId', 'exerciseId', 'numSeries', 'numRepeats'],
      include: [
        {
          model: catExerciseModel,
          as: 'exercise',
          attributes: ['id', 'name', 'mainMuscle', 'difficulty', 'involvedMuscles', 'equipment']
        }
      ]
    });
  }

  async exists({ id }) {
    const count = await templateExercisesModel.count({ where: { id } });
    return count > 0;
  }


  async delete({ id , routineId }) {
    return await templateExercisesModel.destroy({ where: { id , routineId} });
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
