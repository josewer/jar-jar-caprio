import { trainingSessionModel, catExerciseModel , exerciseDoneModel } from './db.js';

export class Session {
  async get() {
    return await trainingSessionModel.findAll({
      attributes: ['id', 'userId', 'startDate', 'endDate', 'totalDuration', 'perceivedEffort']
    });
  }

  async getById({ id }) {
    return await trainingSessionModel.findByPk(id, {
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

  async exists({ id }) {
    const count = await trainingSessionModel.count({ where: { id } });
    return count > 0;
  }


  async delete({ id }) {
    return await trainingSessionModel.destroy({ where: { id } });
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
      { where: { id }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      return false;
    }

    return updatedSession;
  }
}
