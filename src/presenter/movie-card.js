import {render, remove} from '../utils/render.js';
import FilmCardView from '../view/film-card.js';
import FilmPopupView from '../view/film-details-popup.js';
import {clickEsc} from '../utils/constants.js';


export default class MovieCard {
  constructor(container, changeData) {
    this._filmCardsContainer = container;
    this._changeData = changeData;

    this._filmCard = null;
    this._filmPopup = null;

    this._handleClick = this._handleClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);

    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);

  }

  init(film) {
    this._film = film;

    this._filmCard = new FilmCardView(film);
    this._filmPopup = new FilmPopupView(film);

    this._filmCard.setClickHandler(this._handleClick);


    render(this._filmCardsContainer, this._filmCard);
  }

  _renderPopup() {
    this._filmPopup.setClickCloseBtnHandler(this._handleCloseBtnClick);
    this._filmPopup.setClickWatchlistHandler(this._handleWatchlistClick);
    this._filmPopup.setClickWatchedHandler(this._handleWatchedClick);
    this._filmPopup.setClickFavoritesHandler(this._handleFavoritesClick);

    render(document.querySelector('body'), this._filmPopup);
  }

  _handleEscKeyDown(evt) {
    if (clickEsc(evt)) {
      evt.preventDefault();
      remove(this._filmPopup);
      document.removeEventListener('keydown', this._handleEscKeyDown);
      document.querySelector('body').classList.remove('hide-overflow');
    }
  }

  _handleClick() {
    document.addEventListener('keydown', this._handleEscKeyDown);
    this._renderPopup();
  }

  _handleCloseBtnClick() {
    document.removeEventListener('keydown', this._handleEscKeyDown);
    remove(this._filmPopup);
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatchlist: !this._film.isWatchlist,
        },
      ),
    );
    //this._changeData(this._film);
  }

  _handleWatchedClick() {
    this._film.isWatched = !this._film.isWatched;
  }

  _handleFavoritesClick() {
    this._film.isFavorite = !this._film.isFavorite;
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmPopup);
  }
}
