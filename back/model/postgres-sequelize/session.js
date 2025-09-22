import { trainingSessionModel, catExerciseModel, exerciseDoneModel } from './db.js';

export class Session {
  async get({ userId }) {
    return await trainingSessionModel.findAll({
      where: { userId },
      attributes: ['id', 'userId', 'startDate', 'endDate', 'totalDuration', 'perceivedEffort']
    });
  }

  async getById({ id, userId }) {
    return await trainingSessionModel.findByPk(id, {
      where: { userId },
      attributes: ['id', 'userId', 'startDate', 'endDate', 'totalDuration', 'perceivedEffort'],
      include: [{
        attributes: ['id', 'sessionId', 'exerciseId', 'series', 'repeatsPerSeries', 'weightPerSeries', 'comments'],
        model: exerciseDoneModel,
        as: 'exercisesDone',
        include: [
          {
            model: catExerciseModel,
            as: 'exercise',
            attributes: ['id', 'name', 'mainMuscle', 'difficulty', 'involvedMuscles', 'equipment']
          }
        ]
      }]
    });
  }

  async exists({ id, userId }) {
    const count = await trainingSessionModel.count({ where: { id, userId } });
    return count > 0;
  }


  async delete({ id, userId }) {
    return await trainingSessionModel.destroy({ where: { id, userId } });
  }

  async post({ input }) {
    return await trainingSessionModel.create({
      id: crypto.randomUUID(),
      ...input
    });
  }

  async put({ id, input }) {
    const [numberOfAffectedRows, [updatedSession]] = await trainingSessionModel.update(
      { ...input },
      { where: { id, userId: input.userId }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      return false;
    }

    return updatedSession;
  }
}
