import FilterMenuView from './view/site-menu.js';
import UserRatingView from './view/user-rating.js';
import FooterFilmInfo from './view/footer-statistic.js';
import {createFilmContent} from './mock/mock.js';
import {render} from './utils/render.js';
import {FilmCount} from './utils/constants.js';
import MovieListView from './presenter/movie-list.js';

const films = new Array(FilmCount.MAIN).fill().map(createFilmContent);
const siteMainElement = document.querySelector('.main');
const siteHeader = document.querySelector('.header');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

render(siteHeader, new UserRatingView(films.filter((item) => item.isWatchlist).length));
render(siteMainElement, new FilterMenuView(films));

const movieList = new MovieListView(siteMainElement);
movieList.init(films);

render(siteFooterStatisticElement, new FooterFilmInfo(FilmCount.MAIN));
