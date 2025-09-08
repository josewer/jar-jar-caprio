import config from '../../config.js';
import { userModel } from './db.js';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError.js';
import { Op } from 'sequelize';

export class User {
  async get () {
    return await userModel.findAll();
  }

  async getById ({ id }) {
    return await userModel.findByPk(id);
  }

  async delete ({ id }) {
    return await userModel.destroy({ where: { id } });
  }

  async post ({ input }) {
    const hashPass = await bcrypt.hash(input.password, Number(config.app.saltOrRounds));
    input.password = hashPass;

    const [user, created] = await userModel.findOrCreate({
      where: { username: input.username },
      defaults: {
        id: crypto.randomUUID(),
        ...input
      }
    });

    if (!created) { throw new AppError('Username already taken', 409); }

    return user;
  }

  async put ({ id, input }) {
    const exist = await userModel.count({
      where: {
        [Op.and]: [
          { username: input.username },
          { id: { [Op.ne]: id } }
        ]
      }
    });

    if (exist !== 0) {
      throw new AppError('Username already taken', 409);
    }

    const hashPass = await bcrypt.hash(input.password, Number(config.app.saltOrRounds));

    input.password = hashPass;

    const [numberOfAffectedRows, [updatedExercise]] = await userModel.update(
      { ...input },
      { where: { id }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      return false;
    }

    return updatedExercise;
  }

  async login ({ input }) {
    const user = await userModel.findOne({
      where: { username: input.username }
    });

    if (!user) { return null; }

    const isValid = await bcrypt.compare(input.password, user.password);

    if (!isValid) { return null; }

    return { username: user.username, email: user.email };
  }
}
