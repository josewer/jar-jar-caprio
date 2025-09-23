export const DifficultyType = {
  1: "Fácil",
  2: "Media",
  3: "Difícil"
}
export const DifficultyTypeOptions = Object.entries(DifficultyType).map(([code, label]) => ({
  code,
  label
})).sort((a, b) => a.code - b.code)
