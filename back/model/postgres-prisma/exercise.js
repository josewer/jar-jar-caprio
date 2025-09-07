import { prisma } from './db.js';

export class Exercise {
  async get () {
    return await prisma.exercise.findMany();
  }

  async getById ({ id }) {
    return await prisma.exercise.findUnique({
      where: { id }
    });
  }

  async delete ({ id }) {
    try {
      return await prisma.exercise.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        return false;
      }
      throw error;
    }
  }

  async post ({ input }) {
    return await prisma.exercise.create({
      data: {
        id: crypto.randomUUID(),
        ...input
      }
    });
  }

  async put ({ id, input }) {
    try {
      return await prisma.exercise.update({
        where: { id },
        data: {
          ...input
        }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return false;
      }
      throw error;
    }
  }
}
