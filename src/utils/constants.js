export const FilmListTypes = {
  ALL_MOVIES: {
    title: 'All movies. Upcoming',
    isHidden: true,
    isExtra: false,
  },
  TOP_MOVIES: {
    title: 'Top rated',
    isHidden: false,
    isExtra: true,
  },
  COMMENTED_MOVIES: {
    title: 'Most commented',
    isHidden: false,
    isExtra: true,
  },
};

export const FilmCount = {
  MAIN: 9,
  STEP: 5,
  EXTRA: 2,
};

export const clickEsc = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};
