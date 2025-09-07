import { exerciseModel } from './db.js';

export class Exercise {
  async get () {
    return await exerciseModel.findAll();
  }

  async getById ({ id }) {
    return await exerciseModel.findByPk(id);
  }

  async delete ({ id }) {
    return await exerciseModel.destroy({ where: { id } });
  }

  async post ({ input }) {
    return await exerciseModel.create({
      id: crypto.randomUUID(),
      ...input
    });
  }

  async put ({ id, input }) {
    const [numberOfAffectedRows, [updatedExercise]] = await exerciseModel.update(
      { ...input },
      { where: { id }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      return false;
    }

    return updatedExercise;
  }
}
