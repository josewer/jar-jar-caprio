
export class Routine {

  constructor(name, description, id = null, userId = null, exercises = []) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.templateExercises = exercises;
  }

  addExercise(exerciseId, numSeries, numRepeats) {
    const newExercise = new TemplateExercise(exerciseId, numSeries, numRepeats, null, this.id);
    this.templateExercises.push(newExercise);
  }


  removeExercise(exerciseId) {
    this.templateExercises = this.templateExercises.filter(e => e.exerciseId !== exerciseId);
  }
}
