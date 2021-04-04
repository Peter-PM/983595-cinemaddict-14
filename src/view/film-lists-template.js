export const createFilmListsTemplate = (FilmListType) => {
 const {secondClass, titleClass, title} = FilmListType;
  return `
  <section class="films-list ${secondClass}">
    <h2 class="films-list__title ${titleClass}">${title}</h2>
    <div class="films-list__container"></div>
  </section>`;
};
