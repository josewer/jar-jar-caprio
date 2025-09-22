import { exerciseDoneModel, catExerciseModel, trainingSessionModel } from './db.js';

export class ExerciseDone {
  async get({ sessionId, userId }) {
    return await exerciseDoneModel.findAll({
      attributes: ['id', 'sessionId', 'exerciseId', 'series', 'repeatsPerSeries', 'weightPerSeries', 'comments'],
      include: [
        {
          model: trainingSessionModel,
          where: { id: sessionId, userId },
          attributes: []
        }
      ]
    });
  }

  async getById({ id, sessionId, userId }) {
    return await exerciseDoneModel.findByPk(id, {
      attributes: ['id', 'sessionId', 'exerciseId', 'series', 'repeatsPerSeries', 'weightPerSeries', 'comments'],
      include: [
        {
          model: trainingSessionModel,
          where: { id: sessionId, userId },
          attributes: []
        },
        {
          model: catExerciseModel,
          as: 'exercise',
          attributes: ['id', 'name', 'mainMuscle', 'difficulty', 'involvedMuscles', 'equipment']
        }
      ]
    });
  }

  async exists({ id, sessionId, userId }) {
    const count = await exerciseDoneModel.count({
      where: { id },
      include: [
        {
          model: trainingSessionModel,
          where: { id: sessionId, userId },
          attributes: []
        }
      ]
    });
    return count > 0;
  }


  async delete({ id, sessionId, userId }) {
    return await exerciseDoneModel.destroy({
      where: { id }
      , include: [
        {
          model: trainingSessionModel,
          where: { id: sessionId, userId },
          attributes: []
        }
      ]
    });
  }


  async post({ input, sessionId }) {
    return await exerciseDoneModel.create({
      id: crypto.randomUUID(),
      ...input,
      sessionId
    });
  }

  async put({ id, input, sessionId, userId }) {
    const [numberOfAffectedRows, [updatedExerciseDone]] = await exerciseDoneModel.update(
      { ...input },
      {
        where: { id },
        include: [
          {
            model: trainingSessionModel,
            where: { id: sessionId, userId },
            attributes: []
          }
        ]
        , returning: true
      }
    );

    if (numberOfAffectedRows === 0) {
      return false;
    }

    return updatedExerciseDone;
  }
}
