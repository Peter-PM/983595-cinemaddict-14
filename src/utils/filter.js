import {FilterType} from '../utils/constants.js';

export const generateFilter = (films) => {
  const filrerLists = {
    All: [
      'All movies',
      'all',
      (arr) => arr.length,
    ],
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

export const filter = {
  [FilterType.ALL]: (arr) => arr,
  [FilterType.WATCHLIST]: (arr) => arr.filter((item) => item.isWatchlist),
  [FilterType.HISTORY]: (arr) => arr.filter((item) => item.isWatched),
  [FilterType.FAVORITES]: (arr) => arr.filter((item) => item.isFavorite),
};
