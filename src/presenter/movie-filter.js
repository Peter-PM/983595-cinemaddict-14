import {render, replace, remove} from '../utils/render.js';
import FilterMenuView from '../view/site-menu.js';
import {UpdateType, FilterType} from '../utils/constants.js';
import {filter} from '../utils/filter.js';
import UserRatingView from '../view/user-rating.js';

const UserRank = {
  ZERO: 0,
  NOVISE: 10,
  FAN: 20,
};

export default class FilterMenu {
  constructor(filterContainer, filmModel, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmModel = filmModel;

    this._filterComponent = null;
    this._ratingComponent = null;

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

  _renderUserRating(history) {
    const calculationRating = (number) => {
      if (number === UserRank.ZERO) {
        return '';
      }
      if (number > UserRank.ZERO && number <= UserRank.NOVISE) {
        return 'Novice';
      }
      if (number > UserRank.NOVISE && number <= UserRank.FAN) {
        return 'Fan';
      }
      return 'Movie Buff';
    };
    const rank = calculationRating(history);

    const siteHeader = document.querySelector('.header');

    const prevRatingComponent = this._ratingComponent;
    this._ratingComponent = new UserRatingView(rank);

    if (prevRatingComponent === null) {
      render(siteHeader, this._ratingComponent);
      return;
    }

    replace(this._ratingComponent, prevRatingComponent);
    remove(prevRatingComponent);
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

    this._renderUserRating(filter[FilterType.HISTORY](films).length);

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
