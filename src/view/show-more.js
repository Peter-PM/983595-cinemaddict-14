import AbstractView from './abstract.js';

const createShowMoreButtonTemplate = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class ShowMoreBotton extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.clickShowMore();
  }

  setClickShowMoreHandler(callback) {
    this._callback.clickShowMore = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
