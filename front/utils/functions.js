export const getDifficultyColor = (difficulty, show) => {

  if (!show) {
    return 'var(--card-background-color-default)';
  }

  switch (difficulty) {
    case 1:
      return 'var(--card-background-color-level-1)';
    case 2:
      return 'var(--card-background-color-level-2)';
    case 3:
      return 'var(--card-background-color-level-3)';
    default:
      return 'var(--card-background-color-default)';
  }
}


export function parseTimeToSeconds(time) {
  const [min, sec] = time.split(':').map(Number)
  return min * 60 + sec
}