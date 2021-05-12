export const FilmListTypes = {
  ALL_MOVIES: {
    title: 'All movies. Upcoming',
    isHidden: true,
    isExtra: false,
    movies: true,
  },
  TOP_MOVIES: {
    title: 'Top rated',
    isHidden: false,
    isExtra: true,
    movies: true,
  },
  COMMENTED_MOVIES: {
    title: 'Most commented',
    isHidden: false,
    isExtra: true,
    movies: true,
  },
  NO_MOVIES: {
    title: 'There are no movies in our database',
    isHidden: false,
    isExtra: false,
    movies: false,
  },
};

export const FilmCount = {
  MAIN: 40,
  STEP: 5,
  EXTRA: 2,
};

export const clickEsc = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};
