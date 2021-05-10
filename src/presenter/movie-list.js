import {render, remove} from '../utils/render.js';
import FilterMenuView from '../view/site-menu.js';
import FilmContainerView from '../view/film-list-container.js';
import SortFilmView from '../view/sort.js';
import FilmListView from '../view/film-lists-template.js';
import ShowMoreBottonView from '../view/show-more.js';
import {FilmListTypes, FilmCount} from '../utils/constants.js';
import {updateItem} from '../utils/common.js';
import MovieCardPresenter from './movie-card.js';


export default class MovieList {
  constructor(container) {
    this._listContainer = container;
    this._renderedFilmCount = FilmCount.STEP;
    this._filmPresenter = {};

    this._filmSection = new FilmContainerView();
    this._buttonShowMore = new ShowMoreBottonView();
    this._filmListAll = new FilmListView(FilmListTypes.ALL_MOVIES);
    this._filmContainerAll = this._filmListAll.getElement().querySelector('.films-list__container');
    this._filmListTopRating = new FilmListView(FilmListTypes.TOP_MOVIES);
    this._filmListTopComment = new FilmListView(FilmListTypes.COMMENTED_MOVIES);
    this._filmContainerRating = this._filmListTopRating.getElement().querySelector('.films-list__container');
    this._filmContainerComment = this._filmListTopComment.getElement().querySelector('.films-list__container');
    this._noFilms = new FilmListView(FilmListTypes.NO_MOVIES);

    this._handlefilmChange = this._handlefilmChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._renderMovieList();
    //this._clearFilmList();
  }

  _handlefilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _renderMenu() {
    render(this._listContainer, new FilterMenuView(this._films));
  }

  _renderListContainer() {
    render(this._listContainer, this._filmSection);
  }

  _renderSort() {
    render(this._listContainer, new SortFilmView());
  }

  _renderFilmCard(parentElement, film) {
    const filmPresenter = new MovieCardPresenter(parentElement, this._handlefilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderNoFilmsPlug() {
    render(this._filmSection, this._noFilms);
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

    render(this._filmSection, this._filmListAll);

    for (let i = 0; i < Math.min(FilmCount.STEP, FilmCount.MAIN); i++) {
      this._renderFilmCard(this._filmContainerAll, this._films[i]);
    }

    if (this._films.length > FilmCount.STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    render(this._filmListAll, this._buttonShowMore);
    this._buttonShowMore.setClickShowMoreHandler(this._handleLoadMoreButtonClick);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FilmCount.STEP);

    this._renderedFilmCount += FilmCount.STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._buttonShowMore);
    }
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => {
        this._renderFilmCard(this._filmContainerAll, film);
      });
  }

  _renderFilmsListExtra() {

    const topRatedFilms = this._films.slice();
    const topCommentFilms = this._films.slice();

    topRatedFilms.sort((item1, item2) => {
      return item2.rating - item1.rating;
    });

    topCommentFilms.sort((item1, item2) => {
      return item2.quantityComments.length - item1.quantityComments.length;
    });

    render(this._filmSection, this._filmListTopRating);
    render(this._filmSection, this._filmListTopComment);

    topRatedFilms.slice(0, FilmCount.EXTRA).forEach((item) => {
      this._renderFilmCard(this._filmContainerRating, item);
    });
    topCommentFilms.slice(0, FilmCount.EXTRA).forEach((item) => {
      this._renderFilmCard(this._filmContainerComment, item);
    });
  }

  _clearFilmList() {
    Object.values(this._filmPresenter).forEach((elem) => {
      elem.destroy();
    });
    this._filmPresenter = {};
    remove(this._buttonShowMore);
    this._renderedFilmCount = FilmCount.STEP;
  }
}
