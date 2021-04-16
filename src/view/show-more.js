import AbstractView from './abstract.js';

const createShowMoreButtonTemplate = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class ShowMoreBotton extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }
}
