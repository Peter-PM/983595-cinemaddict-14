import {timeAdapter, dateFormatPopup, dateFormatComments} from '../utils/date.js';
import SmartView from './smart.js';

const createFilmPopupTemplate = (filmCard, commentary) => {
  const {poster, title, originalTitle, rating, director, writers, actors, duration, country, genre, reliseDate, description, ageRating, isWatchlist, isWatched, isFavorite, localEmotion, localDescription} = filmCard;
  const genres = genre.split(', ');

  const createGenreList = () => {
    let strigGenre = '';
    genres.forEach((item) => {
      strigGenre = strigGenre + `<span class="film-details__genre">${item}</span>`;
    });
    return strigGenre;
  };

  const createDetailsTable = () => {
    const filmDetails = [
      {
        term: 'Director',
        cell: director,
      },
      {
        term: 'Writers',
        cell: writers,
      },
      {
        term: 'Actors',
        cell: actors,
      },
      {
        term: 'Release Date',
        cell: dateFormatPopup(reliseDate),
      },
      {
        term: 'Runtime',
        cell: timeAdapter(duration),
      },
      {
        term: 'Country',
        cell: country,
      },
      {
        term: genres.length === 1 ? 'Genre' : 'Genres',
        cell: createGenreList(),
      },
    ];

    return filmDetails.map(({term, cell}) => `
      <tr class="film-details__row">
        <td class="film-details__term">${term}</td>
        <td class="film-details__cell">${cell}</td>
      </tr>`).join('');
  };

  const createInput = () => {
    const inputsCustom = [
      {
        id: 'watchlist',
        title: 'Add to watchlist',
        isChecked: isWatchlist,
      },
      {
        id: 'watched',
        title: 'Already watched',
        isChecked: isWatched,
      },
      {
        id: 'favorite',
        title: 'Add to favorites',
        isChecked: isFavorite,
      },
    ];

    return inputsCustom.map(({id, title, isChecked}) => `
      <input type="checkbox" class="film-details__control-input visually-hidden" id="${id}" name="${id}" ${isChecked ? 'checked' : ''}>
      <label for="${id}" class="film-details__control-label film-details__control-label--${id}">${title}</label>`).join('');
  };

  const createEmoji = () => {
    const emojiCustom = ['smile', 'sleeping', 'puke', 'angry'];
    return emojiCustom.map((item) => `
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${item}" value="${item}">
      <label class="film-details__emoji-label" for="emoji-${item}">
        <img src="./images/emoji/${item}.png" width="30" height="30" alt="emoji">
      </label>`).join('');
  };

  const createComments = () => {
    return commentary.map(({author, comment, date, emotion}) =>
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${dateFormatComments(date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`).join('');
  };

  const createEmotion = () => {
    return `${localEmotion ? `<img src="images/emoji/${localEmotion}.png" width="55" height="55" alt="emoji-${localEmotion}"></img>` : ''}`;
  };

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                ${createDetailsTable()}
              </table>

              <p class="film-details__film-description">
              ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            ${createInput()}
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentary.length}</span></h3>

            <ul class="film-details__comments-list">
              ${createComments()}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">
              ${createEmotion()}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${localDescription ? `${localDescription}` : ''}</textarea>
              </label>

              <div class="film-details__emoji-list">
                ${createEmoji()}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmPopup extends SmartView {
  constructor(film, comments) {
    super();

    this._film = film;
    this._comments = comments;

    this._clickCloseHandler = this._clickCloseHandler.bind(this);
    this._clickWatchlistHandler = this._clickWatchlistHandler.bind(this);
    this._clickWatchedHandler = this._clickWatchedHandler.bind(this);
    this._clickFavoritesHandler = this._clickFavoritesHandler.bind(this);

    this._commentEmotionHandler = this._commentEmotionHandler.bind(this);
    this._commentDescriptionHandler = this._commentDescriptionHandler.bind(this);

    this._setCommentsHandler();
  }

  restoreHandlers() {
    this._setCommentsHandler();
    this.setClickCloseBtnHandler(this._callback.clickClosePopup);
    this.setClickWatchlistHandler(this._callback.clickWatchlistPopup);
    this.setClickWatchedHandler(this._callback.clickWatchedPopup);
    this.setClickFavoritesHandler(this._callback.clickFavoritesPopup);
  }

  _setCommentsHandler() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('change', this._commentEmotionHandler);
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentDescriptionHandler);
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film, this._comments);
  }

  _clickWatchlistHandler() {
    this._callback.clickWatchlistPopup();
    this.updateData({
      isWatchlist: !this._film.isWatchlist,
    });
  }
  _clickWatchedHandler() {
    this._callback.clickWatchedPopup();
    this.updateData({
      isWatched: !this._film.isWatched,
    });
  }
  _clickFavoritesHandler() {
    this._callback.clickFavoritesPopup();
    this.updateData({
      isFavorite: !this._film.isFavorite,
    });
  }
  _clickCloseHandler(evt) {
    evt.preventDefault();
    this._callback.clickClosePopup();
    document.querySelector('body').classList.remove('hide-overflow');
  }

  _commentEmotionHandler(evt) {
    evt.preventDefault();
    this.updateData({
      localEmotion: evt.target.value,
    });
  }
  _commentDescriptionHandler(evt) {
    this.updateData({
      localDescription: evt.target.value,
    }, true);
  }

  setClickCloseBtnHandler(callback) {
    this._callback.clickClosePopup = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickCloseHandler);
  }

  setClickWatchlistHandler(callback) {
    this._callback.clickWatchlistPopup = callback;
    this.getElement().querySelector('#watchlist').addEventListener('click', this._clickWatchlistHandler);
  }
  setClickWatchedHandler(callback) {
    this._callback.clickWatchedPopup = callback;
    this.getElement().querySelector('#watched').addEventListener('click', this._clickWatchedHandler);
  }
  setClickFavoritesHandler(callback) {
    this._callback.clickFavoritesPopup = callback;
    this.getElement().querySelector('#favorite').addEventListener('click', this._clickFavoritesHandler);
  }
}
