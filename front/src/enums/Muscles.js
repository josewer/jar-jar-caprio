export const Muscles = {
  QUADRICEPS: "Cuádriceps",
  CALF: "Gemelo",
  ADDUCTOR: "Aductor",
  ABS: "Abdomen",
  TRICEPS: "Tríceps",
  TRAPEZIUS: "Trapecio",
  GLUTE: "Glúteo",
  DELTOID: "Deltoides",
  FOREARM: "Antebrazo",
  OBLIQUES: "Oblicuos",
  LUMBAR: "Lumbar",
  BICEPS: "Bíceps",
  LATS: "Dorsal",
  CHEST: "Pectoral",
  NECK: "Cuello"
}

export const MusclesOptions = Object.entries(Muscles).map(([code, label]) => ({
  code,
  label
})).sort((a, b) => a.label.localeCompare(b.label, 'es'))
