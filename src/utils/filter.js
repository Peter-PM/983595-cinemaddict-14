export const generateFilter = (films) => {
  const filrerLists = {
    Watchlist: [
      'Watchlist',
      'watchlist',
      (arr) => arr.filter((item) => item.isWatchlist).length,
    ],
    History: [
      'History',
      'history',
      (arr) => arr.filter((item) => item.isWatched).length,
    ],
    Favorites: [
      'Favorites',
      'favorites',
      (arr) => arr.filter((item) => item.isFavorite).length,
    ],
  };

  return Object.values(filrerLists).map(([title, id, countFilter]) => {
    return {
      title: title,
      href: id,
      count: countFilter(films),
    };
  });
};

