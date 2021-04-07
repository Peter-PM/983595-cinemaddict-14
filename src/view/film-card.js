import {dateFormatYYYY, timeAdapter} from '../utils/date.js';

export const createFilmCardTemplate = (filmCard) => {
  const MAX_LENGTH_DESCRIPTION = 139;
  const {poster, title, rating, duration, genre, reliseDate, description, quantityComments, isWatchlist, isWatched, isFavorite} = filmCard;
  const date = dateFormatYYYY(reliseDate);
  const numberComments = quantityComments.length;

  const buttonsCustom =  {
    watchlist: [
      'film-card__controls-item--add-to-watchlist',
      isWatchlist ? 'film-card__controls-item--active' : '',
      'Add to watchlist',
    ],
    watched: [
      'film-card__controls-item--mark-as-watched',
      isWatched ? 'film-card__controls-item--active' : '',
      'Mark as watched',
    ],
    favorite: [
      'film-card__controls-item--favorite',
      isFavorite ? 'film-card__controls-item--active' : '',
      'Mark as favorite',
    ],
  };

  const createButtons = (item) =>{
    return Object.values(item).map(([modifier, activ, title]) => `<button class="film-card__controls-item button ${modifier} ${activ}" type="button" >${title}</button>`).join('');
  };
  const createDiscription = () => {
    return description.length >= MAX_LENGTH_DESCRIPTION ? description.slice(0, MAX_LENGTH_DESCRIPTION) + '...' : description;
  };

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date}</span>
        <span class="film-card__duration">${timeAdapter(duration)}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">
      ${createDiscription()}</p>
      <a class="film-card__comments">${numberComments} comments</a>
      <div class="film-card__controls">
        ${createButtons(buttonsCustom)}
      </div>
    </article>`
  );
};
