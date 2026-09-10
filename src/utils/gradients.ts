const GRADIENTS = [
  "#B8BAF4, #6E70E8",
  "#E8B4A4, #D98A78",
  "#F0B8DA, #D86BA0",
  "#8AE08A, #3EAE68",
];

let usedGradients: string[] = [];

export const getGradientByIndex = (index: number) =>
  GRADIENTS[index % GRADIENTS.length];

export const getGradientColors = () => {
  const gradients = GRADIENTS;

  if (usedGradients.length === gradients.length) {
    usedGradients = [];
  }

  const availableGradients = gradients.filter(gradient => !usedGradients.includes(gradient));
  const selectedGradient = availableGradients[Math.floor(Math.random() * availableGradients.length)];
  
  usedGradients.push(selectedGradient);
  return selectedGradient;
};