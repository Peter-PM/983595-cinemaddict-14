import AbstractView from './abstract.js';

const createSiteUserRatingTemplate = (rank) => {

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRating extends AbstractView {
  constructor(rank) {
    super();
    this._userRank = rank;
  }

  getTemplate() {
    return createSiteUserRatingTemplate(this._userRank);
  }
}

