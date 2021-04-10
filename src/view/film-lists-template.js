import {createElement} from '../utils/render.js';

const createFilmListsTemplate = (FilmListType) => {
  const {isHidden, isExtra, title} = FilmListType;
  return (
    `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
      <h2 class="films-list__title ${isHidden ? 'visually-hidden' : ''}">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmList {
  constructor() {
    this._element = null;
  }

  getTemplate(elem) {
    return createFilmListsTemplate(elem);
  }

  getElement(elem) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(elem));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

