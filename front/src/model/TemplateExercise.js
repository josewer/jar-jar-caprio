export class TemplateExercise {
  constructor(exerciseId, numSeries = 0, numRepeats = 0, id = null, routineId = null) {
    this.id = id;
    this.routineId = routineId;
    this.exerciseId = exerciseId;
    this.numSeries = numSeries;
    this.numRepeats = numRepeats;
  }
}
