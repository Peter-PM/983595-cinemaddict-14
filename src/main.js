import {createSiteMenuTemplate} from './view/site-menu.js';
import {createSortFilmsTemplate} from './view/sort.js';
import {createSiteUserRatingTemplate} from './view/user-rating.js';
import {createFilmListContainerTemplate} from './view/film-list-container.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more.js';
//import {createFilmPopupTemplate} from './view/film-details-popup.js';
import {createFooterStatisticTemplate} from './view/footer-statistic.js';
import {createFilmListsTemplate} from './view/film-lists-template.js';
import {createFilmContent} from './mock/mock.js';

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

const FilmListTypes = {
  ALL_MOVIES: {
    title: 'All movies. Upcoming',
    isHidden: true,
    isExtra: false,
  },
  TOP_MOVIES: {
    title: 'Top rated',
    isHidden: false,
    isExtra: true,
  },
  COMMENTED_MOVIES: {
    title: 'Most commented',
    isHidden: false,
    isExtra: true,
  },
};

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeader = document.querySelector('.header');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

render(siteHeader, createSiteUserRatingTemplate());
render(siteMainElement, createSiteMenuTemplate(films));
render(siteMainElement, createSortFilmsTemplate());
render(siteMainElement, createFilmListContainerTemplate());

const filmSection = document.querySelector('.films');

render(filmSection, createFilmListsTemplate(FilmListTypes.ALL_MOVIES));

const filmListContainer = filmSection.querySelector('.films-list__container');
const filmList = document.querySelector('.films-list');

for (let i = 0; i < FILMS_COUNT_STEP; i++) {
  render(filmListContainer, createFilmCardTemplate(films[i]));
}

render(filmList, createShowMoreButtonTemplate());
//render(siteMainElement, createFilmPopupTemplate(films[0]));

render(filmSection, createFilmListsTemplate(FilmListTypes.TOP_MOVIES));
render(filmSection, createFilmListsTemplate(FilmListTypes.COMMENTED_MOVIES));

const filmsList = document.querySelectorAll('.films-list--extra');

const container = filmsList[0].querySelector('.films-list__container');
for (let i = 0; i < TOP_FILMS_COUNT; i++) {
  render(container, createFilmCardTemplate(topRatedFilms[i]));
}
const container2 = filmsList[1].querySelector('.films-list__container');
for (let i = 0; i < TOP_FILMS_COUNT; i++) {
  render(container2, createFilmCardTemplate(topCommentFilms[i]));
}

render(siteFooterStatisticElement, createFooterStatisticTemplate(FILMS_COUNT));
