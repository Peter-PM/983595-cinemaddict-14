import {render, remove} from '../utils/render.js';
import FilmContainerView from '../view/film-list-container.js';
import SortFilmView from '../view/sort.js';
import FilmListView from '../view/film-lists-template.js';
import ShowMoreBottonView from '../view/show-more.js';
import {FilmListTypes, FilmCount} from '../utils/constants.js';
import MovieCardPresenter from './movie-card.js';
import {SortType, UpdateType, UserAction} from '../utils/constants.js';
import {sortByDate, sortByRating, sortByComments} from '../utils/sort.js';
import {filter} from '../utils/filter.js';
//import MoviesModel from '../model/movies.js';

export default class MovieList {
  constructor(container, filmsModel, filterModel, commentsModel, api) {
    this._listContainer = container;
    this._renderedFilmCount = FilmCount.STEP;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._api = api;

    this._filmPresenter = {};
    this._filmPresenterComment = {};
    this._filmPresenterRating = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;

    this._filmsSectionComponent = new FilmContainerView();
    this._filmsListAllComponent = new FilmListView(FilmListTypes.ALL_MOVIES);

    this._filmsLoading = null;
    this._noFilmsComponent = null;
    this._buttonShowMoreComponent = null;
    this._filmsListTopRatingComponent = null;
    this._filmsListTopCommentComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);

  }

  init() {
    this._renderMovieList();
  }

  _getFilms(sortType = this._currentSortType) {
    const filterType = this._getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films);

    switch (sortType) {
      case SortType.DATE:
        return filtredFilms.slice().sort(sortByDate);
      case SortType.RATING:
        return filtredFilms.slice().sort(sortByRating);
      case SortType.COMMENTED:
        return filtredFilms.slice().sort(sortByComments);
      default:
        return filtredFilms;
    }
  }

  _getFilter() {
    return this._filterModel.getFilter();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateFilm(updateType, response);
        });
        break;
      case UserAction.ADD_COMMENT:
        this._commentsModel.createComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComments(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    //MoviesModel.adaptToClient(data);
    switch (updateType) {
      case UpdateType.PATCH:

        if (data.id in this._filmPresenter) {
          this._filmPresenter[data.id].init(data);
        }
        if (data.id in this._filmPresenterComment) {
          this._filmPresenterComment[data.id].init(data);
        }
        if (data.id in this._filmPresenterRating) {
          this._filmPresenterRating[data.id].init(data);
        }
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderMovieList();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderMovieList();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._filmsLoading);
        this._renderMovieList();
        break;
    }
  }

  _renderListContainer() {
    render(this._listContainer, this._filmsSectionComponent);
  }

  _destroyFilms(presenter) {
    Object.values(presenter).forEach((elem) => {
      elem.destroy();
    });
    presenter = {};
  }

  _clearFilmList() {
    this._destroyFilms(this._filmPresenter);
    this._destroyFilms(this._filmPresenterComment);
    this._destroyFilms(this._filmPresenterRating);
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    this._clearFilmList();

    remove(this._filmsLoading);
    remove(this._filmsListTopRatingComponent);
    remove(this._filmsListTopCommentComponent);
    remove(this._buttonShowMoreComponent);
    remove(this._sortComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FilmCount.STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortFilmView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._listContainer, this._sortComponent);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearBoard({resetRenderedFilmCount: true});
    this._renderMovieList();
  }

  _renderFilmCard(parentElement, film, presenter) {
    const filmPresenter = new MovieCardPresenter(parentElement, this._handleViewAction, this._filterModel, this._commentsModel, this._filmsModel);
    filmPresenter.init(film);
    presenter[film.id] = filmPresenter;
  }

  _renderFilms(films, container, presenter) {
    films.forEach((film) => {
      this._renderFilmCard(container, film, presenter);
    });
  }

  _renderNoFilmsPlug() {
    this._noFilmsComponent = new FilmListView(FilmListTypes.NO_MOVIES);
    render(this._filmsSectionComponent, this._noFilmsComponent);
  }

  _renderLoadingPlug() {
    this._filmsLoading = new FilmListView(FilmListTypes.LOADING);
    render(this._filmsSectionComponent, this._filmsLoading);
  }

  _renderMovieList() {

    if (this._isLoading) {
      this._renderListContainer();
      this._renderLoadingPlug();
      return;
    }

    this._renderSort();
    this._renderListContainer();

    if (!this._getFilms().length) {
      this._renderNoFilmsPlug();
      return;
    }
    if (this._noFilmsComponent !== null) {
      remove(this._noFilmsComponent);
    }

    this._renderFilmsListAll();
    this._renderFilmsListExtra();
  }

  _renderFilmsListAll() {
    this._filmAllContainer = this._filmsListAllComponent.getElement().querySelector('.films-list__container');

    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, this._renderedFilmCount));

    render(this._filmsSectionComponent, this._filmsListAllComponent);

    this._renderFilms(films, this._filmAllContainer, this._filmPresenter);

    if (filmCount > this._renderedFilmCount) {
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

    this._renderFilms(films, this._filmAllContainer, this._filmPresenter);

    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._buttonShowMoreComponent);
    }
  }

  _renderFilmsListExtra() {
    this._filmsListTopRatingComponent = new FilmListView(FilmListTypes.TOP_MOVIES);
    this._filmsListTopCommentComponent = new FilmListView(FilmListTypes.COMMENTED_MOVIES);

    this._filmRatingContainer = this._filmsListTopRatingComponent.getElement().querySelector('.films-list__container');
    this._filmCommentContainer = this._filmsListTopCommentComponent.getElement().querySelector('.films-list__container');

    const topRatedFilms = this._getFilms(SortType.RATING).slice(0, FilmCount.EXTRA);
    const topCommentFilms = this._getFilms(SortType.COMMENTED).slice(0, FilmCount.EXTRA);

    render(this._filmsSectionComponent, this._filmsListTopRatingComponent);
    render(this._filmsSectionComponent, this._filmsListTopCommentComponent);

    this._renderFilms(topRatedFilms, this._filmRatingContainer, this._filmPresenterRating);
    this._renderFilms(topCommentFilms, this._filmCommentContainer, this._filmPresenterComment);
  }
}
