import UserRatingView from './view/user-rating.js';
import FooterFilmInfoView from './view/footer-statistic.js';
import {createFilmContent, commentsArray} from './mock/mock.js';
import {render} from './utils/render.js';
import {FilmCount} from './utils/constants.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments.js';
import MovieListPresenter from './presenter/movie-list.js';
import FilterMenuPresenter from './presenter/movie-filter.js';

const films = new Array(FilmCount.MAIN).fill().map(createFilmContent);
const siteMain = document.querySelector('.main');
const siteHeader = document.querySelector('.header');
const siteFooterStatistic = document.querySelector('.footer__statistics');

const commentsModel = new CommentsModel();
commentsModel.setComments(commentsArray);

const filmsModel = new MoviesModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

render(siteHeader, new UserRatingView(films.filter((item) => item.isWatchlist).length));

const filterList = new FilterMenuPresenter(siteMain, filmsModel, filterModel);
filterList.init();

const movieList = new MovieListPresenter(siteMain, filmsModel, filterModel, commentsModel);
movieList.init();

render(siteFooterStatistic, new FooterFilmInfoView(FilmCount.MAIN));
