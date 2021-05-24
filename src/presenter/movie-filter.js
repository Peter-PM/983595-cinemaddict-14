import {render, replace, remove} from '../utils/render.js';
import FilterMenuView from '../view/site-menu.js';
import {UpdateType, FilterType} from '../utils/constants.js';
import {filter} from '../utils/filter.js';


export default class FilterMenu {
  constructor(filterContainer, filmModel, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmModel = filmModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterMenuView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmModel.getFilms();

    return [
      {
        title: FilterType.ALL,
        href: 'all',
        count: filter[FilterType.ALL](films).length,
      },
      {
        title: FilterType.WATCHLIST,
        href: 'watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        title: FilterType.HISTORY,
        href: 'history',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        title: FilterType.FAVORITES,
        href: 'favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}
