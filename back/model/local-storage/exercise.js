export class Exercise {
  exercises = [{
    id: 1,
    name: 'Jose',
    muscle: 'Legs',
    category: 'Cardio'
  }];

  async get () {
    return this.exercises;
  }

  async getById ({ id }) {
    const exercise = this.exercises.find(f => f.id === id);
    return exercise;
  }

  async delete ({ id }) {
    const index = this.exercises.findIndex(f => f.id === id);
    console.log(index);

    if (index !== -1) {
      this.exercises.splice(index, 1);
      return true;
    }

    return false;
  }

  async post ({ input }) {
    const exercise = {
      id: crypto.randomUUID(),
      ...input
    };

    this.exercises.push(exercise);
    return exercise;
  }

  async put ({ id, input }) {
    const index = this.exercises.findIndex(f => f.id === id);

    if (index === -1) { return null; }

    const exercise = {
      id,
      ...input
    };

    this.exercises[index] = exercise;
    return exercise;
  }
}
