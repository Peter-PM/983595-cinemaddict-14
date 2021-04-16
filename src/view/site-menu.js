import {generateFilter} from '../utils/filter.js';
import {createElement} from '../utils/render.js';

const createSiteMenuTemplate = (films) => {

  const createFilters = (item) => {
    return item.map(({title, href, count}) => `<a href="#${href}" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>`).join('');
  };

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${createFilters(generateFilter(films))}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class FilterMenu {
  constructor(film) {
    this._element = null;
    this._filters = film;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
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
