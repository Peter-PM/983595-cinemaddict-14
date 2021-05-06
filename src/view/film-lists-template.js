import AbstractView from './abstract.js';

const createFilmListsTemplate = (FilmListType) => {
  const {isHidden, isExtra, title, movies} = FilmListType;
  return (
    `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
      <h2 class="films-list__title ${isHidden ? 'visually-hidden' : ''}">${title}</h2>
      ${movies ? '<div class="films-list__container"></div>' : ''}
    </section>`
  );
};

export default class FilmList extends AbstractView {
  constructor(type) {
    super();
    this._filmListType = type;
  }

  getTemplate() {
    return createFilmListsTemplate(this._filmListType);
  }
}

