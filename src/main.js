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
import {render, FilmListTypes} from './utils/render.js';

const FILMS_COUNT = 20;
const FILMS_COUNT_STEP = 5;
const TOP_FILMS_COUNT = 2;

const films = new Array(FILMS_COUNT).fill().map(createFilmContent);
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
  filmCard.querySelector('.film-card__title').style = 'cursor: pointer'
  filmCard.querySelector('.film-card__title').addEventListener('click', () => {
    render(siteMainElement, filmPopup);
  });
  console.log(filmCard.querySelector('.film-card__title'));

  filmPopup.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    filmPopup.remove();
  });

  render(parentElement, filmCard)
};

const siteMainElement = document.querySelector('.main');
const siteHeader = document.querySelector('.header');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

render(siteHeader, new UserRatingView().getElement());
render(siteMainElement, new FilterMenuView().getElement(films));
render(siteMainElement, new SortFilmView().getElement());
render(siteMainElement, new FilmContainerView().getElement());

const filmSection = document.querySelector('.films');

render(filmSection, new FilmListView().getElement(FilmListTypes.ALL_MOVIES));

const filmListContainer = filmSection.querySelector('.films-list__container');
const filmList = document.querySelector('.films-list');

for (let i = 0; i < FILMS_COUNT_STEP; i++) {
  renderFilmCard(filmListContainer, films[i]);
}

render(filmList, new ShowMoreBottonView().getElement());
//render(siteMainElement, new FilmPopupView().getElement(films[0]));

render(filmSection, new FilmListView().getElement(FilmListTypes.TOP_MOVIES));
render(filmSection, new FilmListView().getElement(FilmListTypes.COMMENTED_MOVIES));

const filmsList = document.querySelectorAll('.films-list--extra');

const containerRating = filmsList[0].querySelector('.films-list__container');
for (let i = 0; i < TOP_FILMS_COUNT; i++) {
  renderFilmCard(containerRating, topRatedFilms[i]);
}
const containerComment = filmsList[1].querySelector('.films-list__container');
for (let i = 0; i < TOP_FILMS_COUNT; i++) {
  renderFilmCard(containerComment, topCommentFilms[i]);
}

render(siteFooterStatisticElement, new FooterFilmInfo().getElement(FILMS_COUNT));

