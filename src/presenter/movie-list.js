import {render, remove, replace} from '../utils/render.js';
import FilterMenuView from '../view/site-menu.js';
import FilmContainerView from '../view/film-list-container.js';
import SortFilmView from '../view/sort.js';
import FilmListView from '../view/film-lists-template.js';
import ShowMoreBottonView from '../view/show-more.js';
import {FilmListTypes, FilmCount} from '../utils/constants.js';
import MovieCardPresenter from './movie-card.js';
import {SortType, UpdateType, UserAction} from '../utils/constants.js';
import {sortByDate, sortByRating, sortByComments} from '../utils/sort.js';


export default class MovieList {
  constructor(container, filmsModel) {
    this._listContainer = container;
    this._renderedFilmCount = FilmCount.STEP;
    this._filmsModel = filmsModel;
    this._filmPresenter = {};
    this._filmPresenterComment = {};
    this._filmPresenterRating = {};
    this._currentSortType = SortType.DEFAULT;

    this._filmsSectionComponent = new FilmContainerView();
    this._filmsListAllComponent = new FilmListView(FilmListTypes.ALL_MOVIES);

    this._filterMenu = null;
    this._noFilmsComponent = null;
    this._buttonShowMoreComponent = null;
    this._filmsListTopRatingComponent = null;
    this._filmsListTopCommentComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderMenu();
    this._renderSort();
    this._renderMovieList();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortByDate);
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortByRating);
    }

    return this._filmsModel.getFilms();

  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.addComments(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.deleteComments(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        break;
      case UpdateType.MINOR:
        if (data.id in this._filmPresenter) {
          this._filmPresenter[data.id].init(data);
        }

        if (data.id in this._filmPresenterComment) {
          this._filmPresenterComment[data.id].init(data);
        }
        if (data.id in this._filmPresenterRating) {
          this._filmPresenterRating[data.id].init(data);
        }
        const newFilterMenu = new FilterMenuView(this._getFilms());
        replace(newFilterMenu, this._filterMenu);
        this._filterMenu = newFilterMenu;
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  _renderMenu() {
    this._filterMenu = new FilterMenuView(this._getFilms());
    render(this._listContainer, this._filterMenu);
  }

  _renderListContainer() {
    render(this._listContainer, this._filmsSectionComponent);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmList();
    remove(this._filmsListTopRatingComponent);
    remove(this._filmsListTopCommentComponent);
    this._renderMovieList();
  }

  _renderSort() {
    this._sortComponent = new SortFilmView();
    render(this._listContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmCard(parentElement, film, presenter) {
    const filmPresenter = new MovieCardPresenter(parentElement, this._handleViewAction);
    filmPresenter.init(film);
    presenter[film.id] = filmPresenter;
  }

  _renderNoFilmsPlug() {
    this._noFilmsComponent = new FilmListView(FilmListTypes.NO_MOVIES);
    render(this._filmsSectionComponent, this._noFilmsComponent);
  }

  _renderMovieList() {
    this._renderListContainer();

    if (!this._getFilms().length) {
      this._renderNoFilmsPlug();
      return;
    }

    this._renderFilmsListAll();
    this._renderFilmsListExtra();
  }

  _renderFilmsListAll() {
    this._filmAllContainer = this._filmsListAllComponent.getElement().querySelector('.films-list__container');

    const filmCount = this._getFilms().length;

    render(this._filmsSectionComponent, this._filmsListAllComponent);

    for (let i = 0; i < Math.min(FilmCount.STEP, FilmCount.MAIN); i++) {
      this._renderFilmCard(this._filmAllContainer, this._getFilms()[i], this._filmPresenter);
    }

    if (filmCount > FilmCount.STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    this._buttonShowMoreComponent = new ShowMoreBottonView();

    render(this._filmsListAllComponent, this._buttonShowMoreComponent);
    this._buttonShowMoreComponent.setClickShowMoreHandler(this._handleLoadMoreButtonClick);
  }

  _handleLoadMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FilmCount.STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);

    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._buttonShowMoreComponent);
    }
  }

  _renderFilms(films) {
    films.forEach((film) => {
      this._renderFilmCard(this._filmAllContainer, film, this._filmPresenter);
    });
  }

  _renderFilmsListExtra() {
    this._filmsListTopRatingComponent = new FilmListView(FilmListTypes.TOP_MOVIES);
    this._filmsListTopCommentComponent = new FilmListView(FilmListTypes.COMMENTED_MOVIES);

    this._filmRatingContainer = this._filmsListTopRatingComponent.getElement().querySelector('.films-list__container');
    this._filmCommentContainer = this._filmsListTopCommentComponent.getElement().querySelector('.films-list__container');

    const topRatedFilms = this._getFilms().slice();
    const topCommentFilms = this._getFilms().slice();

    topRatedFilms.sort(sortByRating);

    topCommentFilms.sort(sortByComments);

    render(this._filmsSectionComponent, this._filmsListTopRatingComponent);
    render(this._filmsSectionComponent, this._filmsListTopCommentComponent);

    topRatedFilms.slice(0, FilmCount.EXTRA).forEach((item) => {
      this._renderFilmCard(this._filmRatingContainer, item, this._filmPresenterRating);
    });
    topCommentFilms.slice(0, FilmCount.EXTRA).forEach((item) => {
      this._renderFilmCard(this._filmCommentContainer, item, this._filmPresenterComment);
    });
  }

  _clearFilmList() {
    this._destroyFilms(this._filmPresenter);
    this._destroyFilms(this._filmRatingContainer);
    this._destroyFilms(this._filmCommentContainer);
  }

  _destroyFilms(presenter) {
    Object.values(presenter).forEach((elem) => {
      elem.destroy();
    });
    presenter = {};
    remove(this._buttonShowMoreComponent);
    this._renderedFilmCount = FilmCount.STEP;
  }
}
