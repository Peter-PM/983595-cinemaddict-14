import {createElement} from '../utils/render.js';

const createFooterStatisticTemplate = (number) => {
  return `<p>${number} movies inside</p>`;
};

export default class FooterFilmInfo {
  constructor() {
    this._element = null;
  }

  getTemplate(elem) {
    return createFooterStatisticTemplate(elem);
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
