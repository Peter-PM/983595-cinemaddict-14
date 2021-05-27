import UserRatingView from './view/user-rating.js';
import FooterFilmInfoView from './view/footer-statistic.js';
import {render} from './utils/render.js';
import {UpdateType} from './utils/constants.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments.js';
import MovieListPresenter from './presenter/movie-list.js';
import FilterMenuPresenter from './presenter/movie-filter.js';
import Api from './api.js';

// import {createFilmContent} from './mock/mock.js';
// import {FilmCount} from './utils/constants.js';
// const films = new Array(FilmCount.MAIN).fill().map(createFilmContent);
// console.log(films[0])

const AUTHORIZATION = 'Basic GtnhGtnhjdbx2021';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict/';

const api = new Api(END_POINT, AUTHORIZATION);

const siteMain = document.querySelector('.main');
const siteHeader = document.querySelector('.header');
const siteFooterStatistic = document.querySelector('.footer__statistics');

document.querySelector('body').style.maxWidth = '1350px';

const commentsModel = new CommentsModel();
const filterModel = new FilterModel();
const filmsModel = new MoviesModel();
const filterList = new FilterMenuPresenter(siteMain, filmsModel, filterModel);

api.getFilms().then((films) => {
  //console.log(films[0])
  filmsModel.setFilms(UpdateType.INIT, films);
  render(siteHeader, new UserRatingView(12));
  filterList.init();
})
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

const movieList = new MovieListPresenter(siteMain, filmsModel, filterModel, commentsModel, api);
movieList.init();

render(siteFooterStatistic, new FooterFilmInfoView(30));
