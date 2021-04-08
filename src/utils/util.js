export const getRandomNumber = function (min, max) {

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
};
