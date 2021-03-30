import {createSiteMenuTemplate} from './view/site-menu.js';
import {createSiteUserRatingTemplate} from './view/user-rating.js';
import {createFilmListTemplate} from './view/film-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more.js';
//import {createFilmPopupTemplate} from './view/film-details-popup.js';
import {createFooterStatisticTemplate} from './view/footer-statistic.js';
import {createFilmListTopTemplate} from './view/film-list-top.js';
import {createFilmListCommentTemplate} from './view/film-list-comment.js';

const TASK_COUNT = 5;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderLogoElement = document.querySelector('.header__logo');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderLogoElement, createSiteUserRatingTemplate());
render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createFilmListTemplate());

const filmSection = document.querySelector('.films');
const filmList = document.querySelector('.films-list');
const filmListContainer = document.querySelector('.films-list__container');

for (let i = 0; i < TASK_COUNT; i++) {
  render(filmListContainer, createFilmCardTemplate());
}

render(filmList, createShowMoreButtonTemplate());
//render(siteMainElement, createFilmPopupTemplate());

render(filmSection, createFilmListTopTemplate());
render(filmSection, createFilmListCommentTemplate());

const filmsList = document.querySelectorAll('.films-list--extra');

filmsList.forEach((el) => {
  for (let i = 0; i < 2; i++) {
    const container = el.querySelector('.films-list__container');
    render(container, createFilmCardTemplate());
  }
});

render(siteFooterStatisticElement, createFooterStatisticTemplate());
