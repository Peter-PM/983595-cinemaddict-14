import AbstractView from './abstract.js';

const createSiteMenuTemplate = (filters, currentFilterType) => {

  const createFilters = (item) => {

    return item.map(({title, href, count}) => {
      return `<a href="#${href}" class="main-navigation__item main-navigation__item--filter-type ${title === currentFilterType ? 'main-navigation__item--active' : ''}" data-filter-type="${title}">${title} ${href === 'all' ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>`;
    }).join('');
  };

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createFilters(filters)}
      </div>
      <a href="#stats" class="main-navigation__additional main-navigation__item--filter-type ${currentFilterType === 'Stats'? 'main-navigation__additional--active' : '' }" data-filter-type="Stats">Stats</a>
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

    const target = evt.target.closest('.main-navigation__item--filter-type');

    evt.preventDefault();
    if (target) {
      this._callback.filterTypeChange(target.dataset.filterType);
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
