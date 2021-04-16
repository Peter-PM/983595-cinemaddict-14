import {createElement} from '../utils/render.js';

const createSortFilmsTemplate = () => {

  const sortList = [
    {
      title: 'Sort by default',
      type: 'data-sort-type="default"',

    },
    {
      title: 'Sort by date',
      type: 'data-sort-type="date"',
    },
    {
      title: 'Sort by rating',
      type: 'data-sort-type="rating"',
    },
  ];

  const createSorting = (list) => {
    return list.map(({title, type}) => `<li><a href="#" class="sort__button" ${type}>${title}</a></li>`).join('');
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

