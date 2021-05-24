//import {generateFilter} from '../utils/filter.js';
import AbstractView from './abstract.js';

const createSiteMenuTemplate = (films, currentFilterType) => {

  const createFilters = (item) => {

    return item.map(({title, href, count}) => {
      return `<a href="#${href}" class="main-navigation__item ${title === currentFilterType ? 'main-navigation__item--active' : ''}" data-filter-type="${title}">${title} ${href === 'all' ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>`;
    }).join('');
  };

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createFilters(films)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class FilterMenu extends AbstractView {
  constructor(film, currentFilterType) {
    super();
    this._filters = film;

    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {

    const target = evt.target.closest('.main-navigation__item');

    evt.preventDefault();
    if (target) {
      // console.log(target.dataset.filterType)
      this._callback.filterTypeChange(target.dataset.filterType);
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
