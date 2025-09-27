import { templateRoutineModel, templateExercisesModel, catExerciseModel } from './db.js';


export class Routine {
  async get({ userId }) {
    return await templateRoutineModel.findAll({
      where: { userId },
      include: [
        {
          model: templateExercisesModel,
          attributes: ['id', 'numSeries', 'numRepeats'],
          include: [
            {
              model: catExerciseModel,
               attributes: ['id', 'name'],
              as: 'exercise'
            }
          ]
        }
      ]
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

  const routineId = crypto.randomUUID();

  return await templateRoutineModel.create(
    {
        id: routineId,
        name: input.name,
        description: input.description,
        userId: input.userId,
        templateExercises: (input.templateExercises || []).map(ex => ({
          id: crypto.randomUUID(),
          routineId,
          exerciseId: ex.exerciseId,
          numSeries: ex.numSeries,
          numRepeats: ex.numRepeats
        }))
    },
    {
      include: [{ model: templateExercisesModel}]
    }
  );
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
