import AbstractView from './abstract.js';

const createSortFilmsTemplate = () => {

  const sortList = [
    {
      title: 'Sort by default',
      type: 'default',

    },
    {
      title: 'Sort by date',
      type: 'date',
    },
    {
      title: 'Sort by rating',
      type: 'rating',
    },
  ];

  return (
    `<ul class="sort">
      ${sortList.map(({title, type}) => `<li><a href="#" class="sort__button data-sort-type="${type}">${title}</a></li>`).join('')}
    </ul>`
  );
};

export default class SortFilm extends AbstractView {

  getTemplate() {
    return createSortFilmsTemplate();
  }
}

