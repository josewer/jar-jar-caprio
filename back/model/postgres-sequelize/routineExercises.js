import { templateExercisesModel, catExerciseModel } from './db.js';

export class RoutineExercises {
  async get({ routineId }) {
    return await templateExercisesModel.findAll({
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

  async getById({ id }) {
    return await templateExercisesModel.findByPk(id);
  }

  async exists({ id }) {
    const count = await templateExercisesModel.count({ where: { id } });
    return count > 0;
  }


  async delete({ id }) {
    return await templateExercisesModel.destroy({ where: { id } });
  }

  async post({ input }) {
    return await templateExercisesModel.create({
      id: crypto.randomUUID(),
      ...input
    });
  }

  async put({ id, input }) {
    const [numberOfAffectedRows, [updatedExercise]] = await templateExercisesModel.update(
      { ...input },
      { where: { id }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      return false;
    }

    return updatedExercise;
  }
}
