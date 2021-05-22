import AbstractView from './abstract.js';
import {SortType} from '../utils/constants.js';

const createSortFilmsTemplate = () => {

  // const sortList = [
  //   {
  //     title: 'Sort by default',
  //     type: 'default',

  //   },
  //   {
  //     title: 'Sort by date',
  //     type: 'date',
  //   },
  //   {
  //     title: 'Sort by rating',
  //     type: 'rating',
  //   },
  // ];
  // ${sortList.map(({title, type}) => `<li><a href="#" class="sort__button data-sort-type="${type}">${title}</a></li>`).join('')}
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class SortFilm extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortFilmsTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);

  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}

