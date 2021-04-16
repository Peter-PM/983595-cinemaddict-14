import {createElement} from '../utils/render.js';

const createFooterStatisticTemplate = (number) => {
  return `<p>${number} movies inside</p>`;
};

export default class FooterFilmInfo {
  constructor(films) {
    this._element = null;
    this._films = films;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
