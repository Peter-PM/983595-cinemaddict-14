import AbstractView from './abstract.js';

const createFooterStatisticTemplate = (number) => {
  return `<p>${number} movies inside</p>`;
};

export default class FooterFilmInfo extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._films);
  }
}
