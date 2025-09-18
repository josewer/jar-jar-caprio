import { templateRoutineModel, templateExercisesModel, catExerciseModel } from './db.js';

export class Routine {
  async get() {
    return await templateRoutineModel.findAll();
  }

  async getById({ id }) {
    return await templateRoutineModel.findByPk(id, {
      include: [
        {
          model: templateExercisesModel,
                attributes: ['id', 'numSeries' , 'numRepeats'],
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

  async exists({ id }) {
    const count = await templateRoutineModel.count({ where: { id } });
    return count > 0;
  }


  async delete({ id }) {
    return await templateRoutineModel.destroy({ where: { id } });
  }

  async post({ input }) {
    return await templateRoutineModel.create({
      id: crypto.randomUUID(),
      ...input
    });
  }

  async put({ id, input }) {
    const [numberOfAffectedRows, [updatedExercise]] = await templateRoutineModel.update(
      { ...input },
      { where: { id }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      return false;
    }

    return updatedExercise;
  }
}
