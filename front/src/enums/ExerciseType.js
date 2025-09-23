export const ExerciseType = {
  STRETCHING: "Estiramiento",
  STRENGTH: "Fuerza",
  CARDIO: "Cardio"
}

export const ExerciseTypeOptions = Object.entries(ExerciseType).map(([code, label]) => ({
  code,
  label
})).sort((a, b) => a.label.localeCompare(b.label, 'es'))