import { templateRoutineModel, templateExercisesModel, catExerciseModel } from './db.js';


export class Routine {
  async get({ userId }) {
    return await templateRoutineModel.findAll({
      where: { userId },
      include: [
        {
          model: templateExercisesModel,
          attributes: ['id', 'numSeries', 'numRepeats', 'timePerSet', 'restTime', 'type'],
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
          attributes: ['id', 'numSeries', 'numRepeats', 'timePerSet', 'restTime', 'type'],
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
    await templateExercisesModel.destroy({
      where: { routineId: id }
    })
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
          numRepeats: ex.numRepeats,
          restTime: ex.restTime,
          type: ex.type,
          timePerSet: ex.timePerSet
        }))
      },
      {
        include: [{ model: templateExercisesModel }]
      }
    );
  }

  async put({ id, input }) {
    // 1. Actualizamos la rutina principal
    const [numberOfAffectedRows, updatedRoutines] = await templateRoutineModel.update(
      {
        name: input.name,
        description: input.description,
        userId: input.userId
      },
      {
        where: { id, userId: input.userId },
        returning: true // funciona en Postgres
      }
    );

    if (numberOfAffectedRows === 0) {
      return false;
    }

    const updatedRoutine = updatedRoutines[0];

    // 2. Gestionamos los ejercicios asociados
    if (input.templateExercises && input.templateExercises.length > 0) {
      // 🔹 Opción A: eliminar los antiguos y crear los nuevos
      await templateExercisesModel.destroy({
        where: { routineId: id }
      });

      const exercisesToInsert = input.templateExercises.map(ex => ({
        id: ex.id || crypto.randomUUID(),
        routineId: id,
        exerciseId: ex.exerciseId,
        numSeries: ex.numSeries,
        numRepeats: ex.numRepeats,
        restTime: ex.restTime,
        type: ex.type,
        timePerSet: ex.timePerSet
      }));

      await templateExercisesModel.bulkCreate(exercisesToInsert);
    }

    // 3. Devolver la rutina con los ejercicios actualizados
    const result = await templateRoutineModel.findOne({
      where: { id },
      include: [{ model: templateExercisesModel }]
    });

    return result;
  }
}
