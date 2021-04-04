import dayjs from 'dayjs';

export const createFilmCardTemplate = (filmCard) => {
  const {poster, title, rating, duration, genre, reliseDate, description, quantityComments, isWatchlist, isWatched, isFavorite} = filmCard;
  const date = dayjs(reliseDate).format('YYYY');
  const numberComments = quantityComments.length;
  const activeWatchlistClass = isWatchlist ? 'film-card__controls-item--active' : '' ;
  const activeWatchedClass = isWatched ? 'film-card__controls-item--active' : '' ;
  const activeFavoriteClass = isFavorite ? 'film-card__controls-item--active' : '' ;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">
      ${description.length > 140 ? description.slice(0, 139) + '...' : description}</p>
      <a class="film-card__comments">${numberComments} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${activeWatchlistClass}" type="button" >Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${activeWatchedClass}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${activeFavoriteClass}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};
