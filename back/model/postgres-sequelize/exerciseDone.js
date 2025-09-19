import { exerciseDoneModel, catExerciseModel } from './db.js';

export class ExerciseDone {
  async get({ sessionId }) {
    return await exerciseDoneModel.findAll({
      where: { sessionId },
      attributes: ['id', 'sessionId', 'exerciseId', 'series', 'repeatsPerSeries', 'weightPerSeries', 'comments']
    });
  }

  async getById({ id, sessionId }) {
    return await exerciseDoneModel.findByPk(id, {
      where: { sessionId },
      attributes: ['id', 'sessionId', 'exerciseId', 'series', 'repeatsPerSeries', 'weightPerSeries', 'comments'],
      include: [
        {
          model: catExerciseModel,
          as: 'exercise',
          attributes: ['id', 'name', 'mainMuscle', 'difficulty', 'involvedMuscles', 'equipment']
        }
      ]
    });
  }

  async exists({ id, sessionId }) {
    const count = await exerciseDoneModel.count({ where: { id, sessionId } });
    return count > 0;
  }


  async delete({ id, sessionId }) {
    return await exerciseDoneModel.destroy({ where: { id, sessionId } });
  }


  async post({ input, sessionId }) {
    return await exerciseDoneModel.create({
      id: crypto.randomUUID(),
      ...input,
      sessionId
    });
  }

  async put({ id, input, sessionId }) {
    const [numberOfAffectedRows, [updatedExerciseDone]] = await exerciseDoneModel.update(
      { ...input },
      { where: { id, sessionId }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      return false;
    }

    return updatedExerciseDone;
  }
}
