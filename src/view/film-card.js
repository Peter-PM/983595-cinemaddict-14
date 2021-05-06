import {dateFormatYYYY, timeAdapter} from '../utils/date.js';
import AbstractView from './abstract.js';

const createFilmCardTemplate = (filmCard) => {
  const MAX_LENGTH_DESCRIPTION = 139;
  const {poster, title, rating, duration, genre, reliseDate, description, quantityComments, isWatchlist, isWatched, isFavorite} = filmCard;
  const date = dateFormatYYYY(reliseDate);
  const numberComments = quantityComments.length;

  const createButtons = () => {
    const buttonsCustom =  [
      {
        modifier: 'add-to-watchlist',
        isActive: isWatchlist,
        title: 'Add to watchlist',
      },
      {
        modifier: 'mark-as-watched',
        isActive: isWatched,
        title: 'Mark as watched',
      },
      {
        modifier: 'favorite',
        isActive: isFavorite,
        title: 'Mark as favorite',
      },
    ];
    return buttonsCustom.map(({modifier, isActive, title}) => `<button class="film-card__controls-item button film-card__controls-item--${modifier} ${isActive ? 'film-card__controls-item--active' : ''}" type="button" >${title}</button>`).join('');
  };

  const createDiscription = () => {
    return description.length >= MAX_LENGTH_DESCRIPTION ? description.slice(0, MAX_LENGTH_DESCRIPTION) + '...' : description;
  };

  return (
    `<article class="film-card">
      <h3 class="film-card__title" tabindex='0'>${title}</h3>
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
        ${createButtons()}
      </div>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._filmCard = film;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.clickFilmCard();
    document.querySelector('body').classList.add('hide-overflow');
  }

  setClickHandler(callback) {
    this._callback.clickFilmCard = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickHandler);
  }

}
