
export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const UserRank = {
  ZERO: 0,
  NOVISE: 10,
  FAN: 20,
};

export const calculationRating = (number) => {
  if (number === UserRank.ZERO) {
    return '';
  }
  if (number > UserRank.ZERO && number <= UserRank.NOVISE) {
    return 'Novice';
  }
  if (number > UserRank.NOVISE && number <= UserRank.FAN) {
    return 'Fan';
  }
  return 'Movie Buff';
};
