import {createElement} from '../utils/render.js';

const createSortFilmsTemplate = () => {

  const sortList = [
    'Sort by default',
    'Sort by date',
    'Sort by rating',
  ];
  const createSorting = (list) => {
    return list.map((title) => `<li><a href="#" class="sort__button">${title}</a></li>`).join('');
  };

  return (
    `<ul class="sort">
      ${createSorting(sortList)}
    </ul>`
  );
};

export default class SortFilm {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortFilmsTemplate();
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

