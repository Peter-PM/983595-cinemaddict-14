import {render, replace, remove} from '../utils/render.js';
import FilmCardView from '../view/film-card.js';
import FilmPopupView from '../view/film-details-popup.js';
import {clickEsc, UpdateType, UserAction} from '../utils/constants.js';

export default class MovieCard {
  constructor(container, changeData, filterModel, commentsModel) {
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

    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCard;

    this._filmCard = new FilmCardView(film);

    this._filmCard.setClickHandler(this._handleClick);
    this._filmCard.setClickWatchlistHandler(this._handleWatchlistClick);
    this._filmCard.setClickWatchedHandler(this._handleWatchedClick);
    this._filmCard.setClickFavoritesHandler(this._handleFavoritesClick);

    if (prevFilmCard === null) {
      render(this._filmCardsContainer, this._filmCard);
      return;
    }

    if (this._filmCardsContainer.contains(prevFilmCard.getElement())) {
      replace(this._filmCard, prevFilmCard);
    }

    remove(prevFilmCard);
  }

  _getComments() {
    return this._commentsModel.getComments(this._film.comments);
  }

  _renderPopup() {
    const body = document.querySelector('body');
    const prevPopup = body.querySelector('.film-details');

    if (prevPopup) {
      prevPopup.remove();
    }

    this._filmPopup = new FilmPopupView(this._film, this._getComments());

    this._filmPopup.setClickCloseBtnHandler(this._handleCloseBtnClick);
    this._filmPopup.setClickWatchlistHandler(this._handleWatchlistClick);
    this._filmPopup.setClickWatchedHandler(this._handleWatchedClick);
    this._filmPopup.setClickFavoritesHandler(this._handleFavoritesClick);

    render(body, this._filmPopup);
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

  _handleFilterType(type) {
    if (this._filterModel.getFilter() === type) {
      return UpdateType.MINOR;
    }
    return UpdateType.PATCH;
  }


  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      this._handleFilterType('Watchlist'),
      Object.assign(
        {},
        this._film,
        {
          isWatchlist: !this._film.isWatchlist,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      this._handleFilterType('History'),
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _handleFavoritesClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      this._handleFilterType('Favorites'),
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmPopup);
  }
}
