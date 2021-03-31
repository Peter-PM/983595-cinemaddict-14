import {createSiteMenuTemplate} from './view/site-menu.js';
import {createSortFilmsTemplate} from './view/sort.js';
import {createSiteUserRatingTemplate} from './view/user-rating.js';
import {createFilmListContainerTemplate} from './view/film-list-container.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more.js';
//import {createFilmPopupTemplate} from './view/film-details-popup.js';
import {createFooterStatisticTemplate} from './view/footer-statistic.js';
import {createFilmListsTemplate} from './view/film-lists-template.js';

const FILMS_COUNT = 5;
const TOP_FILMS_COUNT = 2;

const FilmListTypes = {
  ALL_MOVIES: {
    title: 'All movies. Upcoming',
    titleClass: 'visually-hidden',
  },
  TOP_MOVIES: {
    title: 'Top rated',
    secondClass: 'films-list--extra',
  },
  COMMENTED_MOVIES: {
    title: 'Most commented',
    secondClass: 'films-list--extra',
  },
};

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderLogoElement = document.querySelector('.header__logo');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderLogoElement, createSiteUserRatingTemplate());
render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createSortFilmsTemplate());
render(siteMainElement, createFilmListContainerTemplate());

const filmSection = document.querySelector('.films');

render(filmSection, createFilmListsTemplate(FilmListTypes.ALL_MOVIES.title, '', FilmListTypes.ALL_MOVIES.titleClass));

const filmListContainer = filmSection.querySelector('.films-list__container');
const filmList = document.querySelector('.films-list');

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmListContainer, createFilmCardTemplate());
}

render(filmList, createShowMoreButtonTemplate());
//render(siteMainElement, createFilmPopupTemplate());

render(filmSection, createFilmListsTemplate(FilmListTypes.TOP_MOVIES.title, FilmListTypes.TOP_MOVIES.secondClass));
render(filmSection, createFilmListsTemplate(FilmListTypes.COMMENTED_MOVIES.title, FilmListTypes.COMMENTED_MOVIES.secondClass));

const filmsList = document.querySelectorAll('.films-list--extra');

filmsList.forEach((el) => {
  for (let i = 0; i < TOP_FILMS_COUNT; i++) {
    const container = el.querySelector('.films-list__container');
    render(container, createFilmCardTemplate());
  }
});

render(siteFooterStatisticElement, createFooterStatisticTemplate());
