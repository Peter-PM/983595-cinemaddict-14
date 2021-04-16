import AbstractView from './abstract.js';

const createFilmListContainerTemplate = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class FilmContainer extends AbstractView {

  getTemplate() {
    return createFilmListContainerTemplate();
  }
}
