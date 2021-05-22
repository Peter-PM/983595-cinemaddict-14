import {dateFormatYYYY} from '../utils/date.js';
import {render, remove} from '../utils/render.js';
import FilterMenuView from '../view/site-menu.js';
import FilmContainerView from '../view/film-list-container.js';
import SortFilmView from '../view/sort.js';
import FilmListView from '../view/film-lists-template.js';
import ShowMoreBottonView from '../view/show-more.js';
import {FilmListTypes, FilmCount} from '../utils/constants.js';
import {updateItem} from '../utils/common.js';
import MovieCardPresenter from './movie-card.js';
import {SortType} from '../utils/constants.js';

export default class MovieList {
  constructor(container, filmsModel) {
    this._listContainer = container;
    this._renderedFilmCount = FilmCount.STEP;
    this._filmsModel = filmsModel;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._filmsSectionComponent = new FilmContainerView();

    this._noFilmsComponent = null;
    this._buttonShowMoreComponent = null;
    this._filmsListAllComponent = null;
    this._filmsListTopRatingComponent = null;
    this._filmsListTopCommentComponent = null;

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedBoardFilms = films.slice();

    this._renderMovieList();
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourcedBoardFilms = updateItem(this._sourcedBoardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _renderMenu() {
    render(this._listContainer, new FilterMenuView(this._films));
  }

  _renderListContainer() {
    render(this._listContainer, this._filmsSectionComponent);
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort((item1, item2) => {
          return dateFormatYYYY(item2.reliseDate) - dateFormatYYYY(item1.reliseDate);
        });
        break;
      case SortType.RATING:
        this._films.sort((item1, item2) => {
          return item2.rating - item1.rating;
        });
        break;
      default:
        this._films = this._sourcedBoardFilms.slice();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearFilmList();
    this._renderFilmsListAll();
  }

  _renderSort() {
    this._sortComponent = new SortFilmView();
    render(this._listContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmCard(parentElement, film) {
    const filmPresenter = new MovieCardPresenter(parentElement, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderNoFilmsPlug() {
    this._noFilmsComponent = new FilmListView(FilmListTypes.NO_MOVIES);
    render(this._filmsSectionComponent, this._noFilmsComponent);
  }

  _renderMovieList() {
    this._renderMenu();

    if (!this._films.length) {
      this._renderListContainer();
      this._renderNoFilmsPlug();
      return;
    }

    this._renderSort();
    this._renderListContainer();
    this._renderFilmsListAll();
    this._renderFilmsListExtra();
  }

  _renderFilmsListAll() {
    this._filmsListAllComponent = new FilmListView(FilmListTypes.ALL_MOVIES);
    this._filmAllContainer = this._filmsListAllComponent.getElement().querySelector('.films-list__container');

    render(this._filmsSectionComponent, this._filmsListAllComponent);

    for (let i = 0; i < Math.min(FilmCount.STEP, FilmCount.MAIN); i++) {
      this._renderFilmCard(this._filmAllContainer, this._films[i]);
    }

    if (this._films.length > FilmCount.STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    this._buttonShowMoreComponent = new ShowMoreBottonView();

    render(this._filmsListAllComponent, this._buttonShowMoreComponent);
    this._buttonShowMoreComponent.setClickShowMoreHandler(this._handleLoadMoreButtonClick);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FilmCount.STEP);

    this._renderedFilmCount += FilmCount.STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._buttonShowMoreComponent);
    }
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => {
        this._renderFilmCard(this._filmAllContainer, film);
      });
  }

  _renderFilmsListExtra() {
    this._filmsListTopRatingComponent = new FilmListView(FilmListTypes.TOP_MOVIES);
    this._filmsListTopCommentComponent = new FilmListView(FilmListTypes.COMMENTED_MOVIES);

    this._filmRatingContainer = this._filmsListTopRatingComponent.getElement().querySelector('.films-list__container');
    this._filmCommentContainer = this._filmsListTopCommentComponent.getElement().querySelector('.films-list__container');

    const topRatedFilms = this._films.slice();
    const topCommentFilms = this._films.slice();

    topRatedFilms.sort((item1, item2) => {
      return item2.rating - item1.rating;
    });

    topCommentFilms.sort((item1, item2) => {
      return item2.comments.length - item1.comments.length;
    });

    render(this._filmsSectionComponent, this._filmsListTopRatingComponent);
    render(this._filmsSectionComponent, this._filmsListTopCommentComponent);

    topRatedFilms.slice(0, FilmCount.EXTRA).forEach((item) => {
      this._renderFilmCard(this._filmRatingContainer, item);
    });
    topCommentFilms.slice(0, FilmCount.EXTRA).forEach((item) => {
      this._renderFilmCard(this._filmCommentContainer, item);
    });
  }

  _clearFilmList() {
    Object.values(this._filmPresenter).forEach((elem) => {
      elem.destroy();
    });
    this._filmPresenter = {};
    remove(this._buttonShowMoreComponent);
    this._renderedFilmCount = FilmCount.STEP;
  }
}
