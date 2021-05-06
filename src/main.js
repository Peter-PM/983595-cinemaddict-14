import UserRatingView from './view/user-rating.js';
import FooterFilmInfoView from './view/footer-statistic.js';
import {createFilmContent} from './mock/mock.js';
import {render} from './utils/render.js';
import {FilmCount} from './utils/constants.js';
import MovieListPresenter from './presenter/movie-list.js';

const films = new Array(FilmCount.MAIN).fill().map(createFilmContent);
const siteMain = document.querySelector('.main');
const siteHeader = document.querySelector('.header');
const siteFooterStatistic = document.querySelector('.footer__statistics');

render(siteHeader, new UserRatingView(films.filter((item) => item.isWatchlist).length));

const movieList = new MovieListPresenter(siteMain);
movieList.init(films);

render(siteFooterStatistic, new FooterFilmInfoView(FilmCount.MAIN));
