let usedGradients: string[] = [];

export const getGradientColors = () => {
  const gradients = [
    '#A7A9EF, #5B5DE5',
    '#E99D82, #D76A5C',
    '#EFA7D2, #D04C86',
    '#6AEB6E, #088F45'
  ];

  if (usedGradients.length === gradients.length) {
    usedGradients = [];
  }

  const availableGradients = gradients.filter(gradient => !usedGradients.includes(gradient));
  const selectedGradient = availableGradients[Math.floor(Math.random() * availableGradients.length)];
  
  usedGradients.push(selectedGradient);
  return selectedGradient;
};