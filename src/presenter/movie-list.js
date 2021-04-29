import {render} from '../utils/render.js';
import FilmContainerView from '../view/film-list-container.js';
import SortFilmView from '../view/sort.js';
import NoFilmsTitleView from '../view/no-films.js';
import FilmListView from '../view/film-lists-template.js';
import ShowMoreBottonView from '../view/show-more.js';
import {FilmListTypes, FilmCount} from '../utils/constants.js';
import MovieCardPresenter from './movie-card.js';


export default class MovieList {
  constructor(container) {
    this._listContainer = container;
    this._renderedFilmCount = FilmCount.STEP;
    this._filmPresenter = {};

    this._filmSection = new FilmContainerView().getElement();
    this._buttonShowMore = new ShowMoreBottonView();
    this._filmListAll = new FilmListView(FilmListTypes.ALL_MOVIES);
    this._filmContainerAll = this._filmListAll.getElement().querySelector('.films-list__container');
    this._filmListTopRating = new FilmListView(FilmListTypes.TOP_MOVIES);
    this._filmListTopComment = new FilmListView(FilmListTypes.COMMENTED_MOVIES);
    this._filmContainerRating = this._filmListTopRating.getElement().querySelector('.films-list__container');
    this._filmContainerComment = this._filmListTopComment.getElement().querySelector('.films-list__container');

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(filmsList) {
    this._films = filmsList;
    this._renderMovieList();
    //this._clearFilmList();
  }

  _renderListContainer() {
    render(this._listContainer, this._filmSection);
  }

  _renderSort() {
    render(this._listContainer, new SortFilmView());
  }

  _renderFilmCard(parentElement, film) {
    const filmPresenter = new MovieCardPresenter(this._listContainer);
    filmPresenter.init(parentElement, film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderNoFilmsPlug() {
    render(this._filmSection, new NoFilmsTitleView());
  }

  _renderMovieList() {
    if (this._films.length === 0) {
      this._renderListContainer();
      this._renderNoFilmsPlug();
      return;
    }

    this._renderSort();
    this._renderListContainer();
    this._renderFilmsListAll();
  }

  _renderFilmsListAll() {

    render(this._filmSection, this._filmListAll);

    for (let i = 0; i < Math.min(FilmCount.STEP, FilmCount.MAIN); i++) {
      this._renderFilmCard(this._filmContainerAll, this._films[i]);
    }

    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    if (this._films.length > FilmCount.STEP) {

      render(this._filmListAll, this._buttonShowMore);

      this._buttonShowMore.setClickShowMoreHandler(this._handleLoadMoreButtonClick);
    }

    this._renderFilmsListExtra();
  }

  _handleLoadMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FilmCount.STEP);

    this._renderedFilmCount += FilmCount.STEP;

    if (this._renderedFilmCount >= this._films.length) {
      this._buttonShowMore.getElement().remove();
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

    const topRatedFilms = Array.from(this._films);
    const topCommentFilms = Array.from(this._films);

    topRatedFilms.sort((item1, item2) => {
      return item2.rating - item1.rating;
    });

    topCommentFilms.sort((item1, item2) => {
      return item2.quantityComments.length - item1.quantityComments.length;
    });

    render(this._filmSection, this._filmListTopRating);
    render(this._filmSection, this._filmListTopComment);

    for (let i = 0; i < FilmCount.EXTRA; i++) {
      this._renderFilmCard(this._filmContainerRating, topRatedFilms[i]);
    }
    for (let i = 0; i < FilmCount.EXTRA; i++) {
      this._renderFilmCard(this._filmContainerComment, topCommentFilms[i]);
    }
  }

  _clearFilmList() {
    Object.values(this._filmPresenter).forEach((elem) => {
      elem.destroy();
    });
    this._filmPresenter = {};
    this._buttonShowMore.getElement().remove();
    this._renderedFilmCount = FilmCount.STEP;
  }
}
