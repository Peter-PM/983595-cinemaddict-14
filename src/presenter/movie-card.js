import {render, replace, remove} from '../utils/render.js';
import FilmCardView from '../view/film-card.js';
import FilmPopupView from '../view/film-details-popup.js';
import {clickEsc, UpdateType, UserAction} from '../utils/constants.js';

const State = {
  DISABLING: 'DISABLED',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

const SHAKE_ANIMATION_TIMEOUT = 600;


export default class MovieCard {
  constructor(container, changeData, filterModel, commentsModel, filmsModel, api) {
    this._filmCardsContainer = container;
    this._changeData = changeData;

    this._filmCard = null;
    this._filmPopup = null;
    this._filmComments = null;

    this._handleClick = this._handleClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
    this._commentDeleteClick = this._commentDeleteClick.bind(this);
    this._commentAddClick = this._commentAddClick.bind(this);

    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._filmsModel = filmsModel;
    this._api = api;
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCard;
    this._commentsModel.setComments(this._film.comments);

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

  setSaving() {
    this._filmPopup.updateData({
      isDisabled: true,
      isError: false,
    });
  }

  _setViewState(state) {
    const resetFormState = () => {
      this._filmPopup.updateData({
        isDisabled: false,
        isError: false,
      });
    };
    switch (state) {
      case State.DISABLING:
        this._filmPopup.updateData({
          isDisabled: true,
        });
        break;
      case State.ABORTING:
        this._setShake(resetFormState);
        break;
    }
  }

  _setShake(callback) {
    this._filmPopup.updateData({
      isError: true,
    });
    setTimeout(() => {
      this._filmPopup.updateData({
        isError: false,
      });
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _renderPopup() {
    const body = document.querySelector('body');
    const prevPopup = body.querySelector('.film-details');

    this._api.getComments(this._film.id).then((comments) => {
      this._commentsModel.setComments(comments);
      this._film.comments = this._commentsModel.getComments();
      this._filmPopup = new FilmPopupView(this._film, 1);

      if (prevPopup) {
        prevPopup.remove();
      }

      this._filmPopup.setClickCloseBtnHandler(this._handleCloseBtnClick);
      this._filmPopup.setClickWatchlistHandler(this._handleWatchlistClick);
      this._filmPopup.setClickWatchedHandler(this._handleWatchedClick);
      this._filmPopup.setClickFavoritesHandler(this._handleFavoritesClick);
      this._filmPopup.setCommentDeleteHandler(this._commentDeleteClick);
      this._filmPopup.setCommentAddHandler(this._commentAddClick);

      render(body, this._filmPopup);
    });
  }

  _handleEscKeyDown(evt) {
    if (clickEsc(evt)) {
      evt.preventDefault();
      this._filmPopup.clickCloseHandler(evt);
      document.removeEventListener('keydown', this._handleEscKeyDown);

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

  _commentAddClick(film) {
    this._setViewState(State.DISABLING);
    this._api.addComment(
      film.id,
      {
        comment: film.localDescription,
        emotion: film.localEmotion,
      },
    ).then((response) => {
      this._changeData(
        UserAction.ADD_COMMENT,
        UpdateType.COMMENT,
        response.comments,
      );
      this._filmPopup.updateData({
        comments: this._commentsModel.getComments(),
        localEmotion: '',
        localDescription: '',
        // isDisabled: true,
      });
      this._film.comments = this._commentsModel.getComments();
      this.init(this._film);
    })
      .catch(() => {
        this._setViewState(State.ABORTING);
      });
  }

  _commentDeleteClick(commentId) {
    this._api.deleteComment(commentId).then(() => {
      this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.COMMENT,
        commentId,
      );
      this._filmPopup.updateData({
        comments: this._commentsModel.getComments(),
      });
      this._film.comments = this._commentsModel.getComments();
      this.init(this._film);
    });
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
