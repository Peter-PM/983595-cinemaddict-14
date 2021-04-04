export const createSiteMenuTemplate = (films) => {

  const watchlistNumbers = films.filter((item) => {
    return item.isWatchlist === true
  })
  const watchedNumbers = films.filter((item) => {
    return item.isWatched === true
  })
  const favoriteNumbers = films.filter((item) => {
    return item.isFavorite === true
  })

  return `
  <nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistNumbers.length}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedNumbers.length}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteNumbers.length}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
