export const createFilmListsTemplate = (FilmListType) => {
  const {isHidden, isExtra, title} = FilmListType;
  return (
    `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
      <h2 class="films-list__title ${isHidden ? 'visually-hidden' : ''}">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};
