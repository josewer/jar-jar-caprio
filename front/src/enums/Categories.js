export const Categories = {
  TRICEPS: "Tríceps",
  BACK: "Espalda",
  SHOULDER: "Hombro",
  ALL: "Todos",
  LEG: "Pierna",
  BICEPS: "Bíceps",
  ABS: "Abdomen",
  NECK: "Cuello",
  CHEST: "Pecho",
  FOREARM: "Antebrazo"
}


export const CategoriesOptions = Object.entries(Categories).map(([code, label]) => ({
  code,
  label
})).sort((a, b) => a.label.localeCompare(b.label, 'es'))