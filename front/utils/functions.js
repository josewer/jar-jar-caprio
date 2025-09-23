export const getDifficultyColor = (difficulty) => {

  switch (difficulty) {
    case 1:
      return 'linear-gradient(145deg, #34d399, #10b981)';
    case 2:
      return 'linear-gradient(145deg, #facc15, #f59e0b)';
    case 3:
      return 'linear-gradient(145deg, #ef4444, #8b5cf6)';
    default:
      return 'linear-gradient(145deg, #10b981, #3b82f6)';
  }
}
