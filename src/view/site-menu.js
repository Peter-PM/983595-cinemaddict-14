import {generateFilter} from '../utils/filter.js';
import AbstractView from './abstract.js';

const createSiteMenuTemplate = (films) => {

  const createFilters = (item) => {

    return item.map(({title, href, count}) => {
      return `<a href="#${href}" class="main-navigation__item ${href === 'all' ? 'main-navigation__item--active' : ''}">${title} ${href === 'all' ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>`;
    }).join('');
  };

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createFilters(generateFilter(films))}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class FilterMenu extends AbstractView {
  constructor(film) {
    super();
    this._filters = film;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }
}
