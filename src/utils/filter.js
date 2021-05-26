import {FilterType} from '../utils/constants.js';

export const filter = {
  [FilterType.ALL]: (arr) => arr,
  [FilterType.WATCHLIST]: (arr) => arr.filter((item) => item.isWatchlist),
  [FilterType.HISTORY]: (arr) => arr.filter((item) => item.isWatched),
  [FilterType.FAVORITES]: (arr) => arr.filter((item) => item.isFavorite),
};
