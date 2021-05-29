import FooterFilmInfoView from './view/footer-statistic.js';
import {render} from './utils/render.js';
import {UpdateType} from './utils/constants.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments.js';
import MovieListPresenter from './presenter/movie-list.js';
import FilterMenuPresenter from './presenter/movie-filter.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic GtnhGtnhjdbx2021';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict/';

const api = new Api(END_POINT, AUTHORIZATION);

const siteMain = document.querySelector('.main');
const siteFooterStatistic = document.querySelector('.footer__statistics');

const commentsModel = new CommentsModel(api);
const filterModel = new FilterModel();
const filmsModel = new MoviesModel();
const filterList = new FilterMenuPresenter(siteMain, filmsModel, filterModel);
const movieList = new MovieListPresenter(siteMain, filmsModel, filterModel, commentsModel, api);

api.getFilms().then((films) => {
  filmsModel.setFilms(UpdateType.INIT, films);
  filterList.init();
  render(siteFooterStatistic, new FooterFilmInfoView(filmsModel.getFilms()));
})
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

movieList.init();
