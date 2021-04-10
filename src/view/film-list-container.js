import {createElement} from '../utils/render.js';

const createFilmListContainerTemplate = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class FilmContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListContainerTemplate();
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
