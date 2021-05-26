import AbstractView from './abstract.js';

const createSiteUserRatingTemplate = (number) => {
  const calculationRating = () => {
    if (number === 0) {
      return '';
    }
    if (number > 0 && number <= 10) {
      return '<p class="profile__rating">Novice</p>';
    }
    if (number >= 11 && number <= 20) {
      return '<p class="profile__rating">Fan</p>';
    }
    return '<p class="profile__rating">Movie Buff</p>';
  };

  return (
    `<section class="header__profile profile">
      ${calculationRating()}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRating extends AbstractView {
  constructor(rating) {
    super();
    this._userRating = rating;
  }

  getTemplate() {
    return createSiteUserRatingTemplate(this._userRating);
  }
}

