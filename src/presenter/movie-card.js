import {render, remove} from '../utils/render.js';
import FilmCardView from '../view/film-card.js';
import FilmPopupView from '../view/film-details-popup.js';
import {clickEsc} from '../utils/constants.js';


export default class MovieCard {
  constructor(container) {
    this._filmCardsContainer = container;

    this._filmCard = null;
    this._filmPopup = null;

    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);

  }

  init(parentContainer, film) {

    this._filmCard = new FilmCardView(film);
    this._filmPopup = new FilmPopupView(film);

    this._filmCard.setClickTitleHandler(this._handleTitleClick);
    this._filmCard.setClickPosterHandler(this._handlePosterClick);
    this._filmCard.setClickCommentsHandler(this._handleCommentsClick);
    this._filmPopup.setClickCloseBtnHandler(this._handleCloseBtnClick);

    render(parentContainer, this._filmCard);

  }

  _renderPopup() {

    render(this._filmCardsContainer, this._filmPopup);
  }

  _handleEscKeyDown(evt) {
    if (clickEsc(evt)) {
      evt.preventDefault();
      this._filmPopup.getElement().remove();
      document.removeEventListener('keydown', this._handleEscKeyDown);
      document.querySelector('body').classList.remove('hide-overflow');
    }
  }

  _handleTitleClick() {
    document.addEventListener('keydown', this._handleEscKeyDown);
    this._renderPopup();
  }

  _handlePosterClick() {
    document.addEventListener('keydown', this._handleEscKeyDown);
    this._renderPopup();
  }

  _handleCommentsClick() {
    document.addEventListener('keydown', this._handleEscKeyDown);
    this._renderPopup();
  }

  _handleCloseBtnClick() {
    document.removeEventListener('keydown', this._handleEscKeyDown);
    remove(this._filmPopup);
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmPopup);
  }
}
