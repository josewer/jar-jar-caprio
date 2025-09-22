import { templateRoutineModel, templateExercisesModel, catExerciseModel } from './db.js';

export class Routine {
  async get({ userId }) {
    return await templateRoutineModel.findAll({
      where: { userId }
    });
  }

  async getById({ id, userId }) {
    return await templateRoutineModel.findByPk(id, {
      where: { userId },
      include: [
        {
          model: templateExercisesModel,
          attributes: ['id', 'numSeries', 'numRepeats'],
          include: [
            {
              model: catExerciseModel,
              as: 'exercise'
            }
          ]
        }
      ]
    });
  }

  async exists({ id, userId }) {
    const count = await templateRoutineModel.count({ where: { id, userId } });
    return count > 0;
  }


  async delete({ id, userId }) {
    return await templateRoutineModel.destroy({ where: { id, userId } });
  }

  async post({ input }) {
    return await templateRoutineModel.create({
      id: crypto.randomUUID(),
      ...input
    });
  }

  async put({ id, input }) {
    const [numberOfAffectedRows, [updatedRoutine]] = await templateRoutineModel.update(
      { ...input },
      { where: { id, userId: input.userId }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      return false;
    }

    return updatedRoutine;
  }
}
