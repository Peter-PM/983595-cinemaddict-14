import {render} from '../utils/render.js';
import FilmContainerView from '../view/film-list-container.js';
import SortFilmView from '../view/sort.js';
import NoFilmsTitleView from '../view/no-films.js';
import FilmListView from '../view/film-lists-template.js';
import FilmCardView from '../view/film-card.js';
import FilmPopupView from '../view/film-details-popup.js';
import ShowMoreBottonView from '../view/show-more.js';
import {FilmListTypes, FilmCount, clickEsc} from '../utils/constants.js';


export default class MovieList {
  constructor(container) {
    this._listContainer = container;

    this._filmSection = new FilmContainerView().getElement();
    this._filmListAll = new FilmListView(FilmListTypes.ALL_MOVIES);
    this._filmContainerAll = this._filmListAll.getElement().querySelector('.films-list__container');
    this._filmListTopRating = new FilmListView(FilmListTypes.TOP_MOVIES);
    this._filmListTopComment = new FilmListView(FilmListTypes.COMMENTED_MOVIES);
    this._filmContainerRating = this._filmListTopRating.getElement().querySelector('.films-list__container');
    this._filmContainerComment = this._filmListTopComment.getElement().querySelector('.films-list__container');
  }

  init(filmsList) {
    this._films = filmsList;
    this._renderMovieList();
  }

  _renderListContainer() {
    render(this._listContainer, this._filmSection);
  }

  _renderSort() {
    render(this._listContainer, new SortFilmView());
  }

  _renderFilmCard(parentElement, film) {
    const filmCard = new FilmCardView(film);
    const filmPopup = new FilmPopupView(film);

    const onEscKeyDown = (evt) => {
      if (clickEsc(evt)) {
        evt.preventDefault();
        filmPopup.getElement().remove();
        document.removeEventListener('keydown', onEscKeyDown);
        document.querySelector('body').classList.remove('hide-overflow');
      }
    };

    filmCard.setClickTitleHandler(() => {
      document.addEventListener('keydown', onEscKeyDown);
      render(this._listContainer, filmPopup);
    });

    filmCard.setClickPosterHandler(() => {
      document.addEventListener('keydown', onEscKeyDown);
      render(this._listContainer, filmPopup);
    });

    filmCard.setClickCommentsHandler(() => {
      document.addEventListener('keydown', onEscKeyDown);
      render(this._listContainer, filmPopup);
    });

    filmPopup.setClickCloseBtnHandler(() => {
      document.removeEventListener('keydown', onEscKeyDown);
      filmPopup.getElement().remove();
    });

    render(parentElement, filmCard);
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
      let renderedFilmCount = FilmCount.STEP;

      const buttonShowMore = new ShowMoreBottonView();
      const filmList = this._filmSection.querySelector('.films-list');

      render(filmList, buttonShowMore);

      buttonShowMore.setClickShowMoreHandler(() => {
        this._films
          .slice(renderedFilmCount, renderedFilmCount + FilmCount.STEP)
          .forEach((film) => {
            this._renderFilmCard(this._filmContainerAll, film);
          });

        renderedFilmCount += FilmCount.STEP;

        if (renderedFilmCount >= this._films.length) {
          buttonShowMore.getElement().remove();
        }
      });
    }

    this._renderFilmsListExtra();
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

}
