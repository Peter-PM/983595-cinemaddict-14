import FilterMenuView from './view/site-menu.js';
import SortFilmView from './view/sort.js';
import UserRatingView from './view/user-rating.js';
import FilmContainerView from './view/film-list-container.js';
import FilmCardView from './view/film-card.js';
import ShowMoreBottonView from './view/show-more.js';
import FilmPopupView from './view/film-details-popup.js';
import FooterFilmInfo from './view/footer-statistic.js';
import FilmListView from './view/film-lists-template.js';
import {createFilmContent} from './mock/mock.js';
import {render} from './utils/render.js';
import {FilmListTypes, FilmCount} from './utils/constants.js';

const films = new Array(FilmCount.MAIN).fill().map(createFilmContent);
const topRatedFilms = Array.from(films);
const topCommentFilms = Array.from(films);

topRatedFilms.sort((item1, item2) => {
  return item2.rating - item1.rating;
});

topCommentFilms.sort((item1, item2) => {
  return item2.quantityComments.length - item1.quantityComments.length;
});

const renderFilmCard = (parentElement, film) => {
  const filmCard = new FilmCardView().getElement(film);
  const filmPopup = new FilmPopupView().getElement(film);

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      filmPopup.remove();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmCard.querySelector('.film-card__title').addEventListener('click', () => {
    document.addEventListener('keydown', onEscKeyDown);
    render(siteMainElement, filmPopup);
  });

  filmCard.querySelector('.film-card__poster').addEventListener('click', () => {
    document.addEventListener('keydown', onEscKeyDown);
    render(siteMainElement, filmPopup);
  });

  filmCard.querySelector('.film-card__comments').addEventListener('click', () => {
    document.addEventListener('keydown', onEscKeyDown);
    render(siteMainElement, filmPopup);
  });

  filmPopup.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    document.removeEventListener('keydown', onEscKeyDown);
    filmPopup.remove();
  });

  render(parentElement, filmCard);
};

const siteMainElement = document.querySelector('.main');
const siteHeader = document.querySelector('.header');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

render(siteHeader, new UserRatingView().getElement());
render(siteMainElement, new FilterMenuView(films).getElement());
render(siteMainElement, new SortFilmView().getElement());
render(siteMainElement, new FilmContainerView().getElement());

const filmSection = document.querySelector('.films');

render(filmSection, new FilmListView(FilmListTypes.ALL_MOVIES).getElement());

const filmListContainer = filmSection.querySelector('.films-list__container');
const filmList = document.querySelector('.films-list');

for (let i = 0; i < FilmCount.STEP; i++) {
  renderFilmCard(filmListContainer, films[i]);
}

render(filmList, new ShowMoreBottonView().getElement());

render(filmSection, new FilmListView(FilmListTypes.TOP_MOVIES).getElement());
render(filmSection, new FilmListView(FilmListTypes.COMMENTED_MOVIES).getElement());

const filmsList = document.querySelectorAll('.films-list--extra');

const containerRating = filmsList[0].querySelector('.films-list__container');
for (let i = 0; i < FilmCount.EXTRA; i++) {
  renderFilmCard(containerRating, topRatedFilms[i]);
}
const containerComment = filmsList[1].querySelector('.films-list__container');
for (let i = 0; i < FilmCount.EXTRA; i++) {
  renderFilmCard(containerComment, topCommentFilms[i]);
}

render(siteFooterStatisticElement, new FooterFilmInfo(FilmCount.MAIN).getElement());

