import AbstractView from './abstract.js';
import {SortType} from '../utils/constants.js';

const createSortFilmsTemplate = () => {

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
    const target = evt.target.closest('.sort__button');
    evt.preventDefault();
    if (evt.target.closest('.sort__button')) {
      this._callback.sortTypeChange(target.dataset.sortType);
    }
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}

