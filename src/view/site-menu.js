export const createSiteMenuTemplate = (films) => {

  const watchlistNumbers = films.filter((item) => {
    return item.isWatchlist === true;
  });
  const watchedNumbers = films.filter((item) => {
    return item.isWatched === true;
  });
  const favoriteNumbers = films.filter((item) => {
    return item.isFavorite === true;
  });
  const filrersList = {
    Watchlist: watchlistNumbers.length,
    History: watchedNumbers.length,
    Favorites: favoriteNumbers.length,
  };
  const createFilters = (item) => {
    return Object.entries(item).map(([key, value]) => `<a href="#watchlist" class="main-navigation__item">${key} <span class="main-navigation__item-count">${value}</span></a>`).join('');
  };

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${createFilters(filrersList)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
