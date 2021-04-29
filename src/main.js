import FilterMenuView from './view/site-menu.js';
import SortFilmView from './view/sort.js';
import UserRatingView from './view/user-rating.js';
import FilmContainerView from './view/film-list-container.js';
import NoFilmsTitleView from './view/no-films.js';
import FilmCardView from './view/film-card.js';
import ShowMoreBottonView from './view/show-more.js';
import FilmPopupView from './view/film-details-popup.js';
import FooterFilmInfo from './view/footer-statistic.js';
import FilmListView from './view/film-lists-template.js';
import {createFilmContent} from './mock/mock.js';
import {render} from './utils/render.js';
import {FilmListTypes, FilmCount, clickEsc} from './utils/constants.js';

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
  const filmCard = new FilmCardView(film);
  const filmPopup = new FilmPopupView(film);

  const onEscKeyDown = (evt) => {
    if (clickEsc(evt)) {
      evt.preventDefault();
      filmPopup.getElement().remove();
      document.removeEventListener('keydown', onEscKeyDown);
      document.querySelector('body').classList.remove('hide-overflow');
    }
  };

  filmCard.setClickTitleHandler(() => {
    document.addEventListener('keydown', onEscKeyDown);
    render(siteMainElement, filmPopup);
  });

  filmCard.setClickPosterHandler(() => {
    document.addEventListener('keydown', onEscKeyDown);
    render(siteMainElement, filmPopup);
  });

  filmCard.setClickCommentsHandler(() => {
    document.addEventListener('keydown', onEscKeyDown);
    render(siteMainElement, filmPopup);
  });

  filmPopup.setClickCloseBtnHandler(() => {
    document.removeEventListener('keydown', onEscKeyDown);
    filmPopup.getElement().remove();
  });

  render(parentElement, filmCard);
};

const siteMainElement = document.querySelector('.main');
const siteHeader = document.querySelector('.header');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

render(siteHeader, new UserRatingView(films.filter((item) => item.isWatchlist).length));
render(siteMainElement, new FilterMenuView(films));


const filmSection = new FilmContainerView().getElement();


if (films.length === 0) {
  render(siteMainElement, filmSection);
  render(filmSection, new NoFilmsTitleView().getElement());
} else {
  render(siteMainElement, new SortFilmView());
  render(siteMainElement, filmSection);
  render(filmSection, new FilmListView(FilmListTypes.ALL_MOVIES));

  const filmListContainer = filmSection.querySelector('.films-list__container');
  const filmList = filmSection.querySelector('.films-list');

  for (let i = 0; i < Math.min(FilmCount.STEP, FilmCount.MAIN); i++) {
    renderFilmCard(filmListContainer, films[i]);
  }

  if (films.length > FilmCount.STEP) {
    let renderedFilmCount = FilmCount.STEP;
    const buttonShowMore = new ShowMoreBottonView();
    render(filmList, buttonShowMore);

    buttonShowMore.setClickShowMoreHandler(() => {
      films
        .slice(renderedFilmCount, renderedFilmCount + FilmCount.STEP)
        .forEach((film) => {
          renderFilmCard(filmListContainer, film);
        });

      renderedFilmCount += FilmCount.STEP;

      if (renderedFilmCount >= films.length) {
        buttonShowMore.getElement().remove();
      }
    });
  }

  render(filmSection, new FilmListView(FilmListTypes.TOP_MOVIES));
  render(filmSection, new FilmListView(FilmListTypes.COMMENTED_MOVIES));

  const filmsList = filmSection.querySelectorAll('.films-list--extra');

  const containerRating = filmsList[0].querySelector('.films-list__container');
  for (let i = 0; i < FilmCount.EXTRA; i++) {
    renderFilmCard(containerRating, topRatedFilms[i]);
  }
  const containerComment = filmsList[1].querySelector('.films-list__container');
  for (let i = 0; i < FilmCount.EXTRA; i++) {
    renderFilmCard(containerComment, topCommentFilms[i]);
  }
}

render(siteFooterStatisticElement, new FooterFilmInfo(FilmCount.MAIN));
