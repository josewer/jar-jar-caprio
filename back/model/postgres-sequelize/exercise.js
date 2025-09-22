import { catExerciseModel } from './db.js';

export class Exercise {
  async get() {
    return await catExerciseModel.findAll();
  }

  async getById({ id }) {
    return await catExerciseModel.findByPk(id);
  }

  async exists({ id }) {
    const count = await catExerciseModel.count({ where: { id } });
    return count > 0;
  }

  async delete({ id }) {
    return await catExerciseModel.destroy({ where: { id } });
  }

  async post({ input }) {
    return await catExerciseModel.create({
      id: crypto.randomUUID(),
      ...input
    });
  }

  async put({ id, input }) {
    const [numberOfAffectedRows, [updatedExercise]] = await catExerciseModel.update(
      { ...input },
      { where: { id }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      return false;
    }

    return updatedExercise;
  }
}
