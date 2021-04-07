import {timeAdapter} from '../utils/date.js';

export const createFilmPopupTemplate = (filmCard) => {
  const {poster, title, originalTitle, rating, director, writers, actors, duration, country, genre, reliseDate, description, ageRating, quantityComments, isWatchlist, isWatched, isFavorite} = filmCard;
  const genres = genre.split(', ');

  const createGenreList = () => {
    let strigGenre = '';
    genres.forEach((item) => {
      strigGenre = strigGenre + `<span class="film-details__genre">${item}</span>`;
    });
    return strigGenre;
  };

  const createDetailsTable = () => {
    const filmDetails = {
      director: [
        'Director',
        director,
      ],
      writers: [
        'Writers',
        writers,
      ],
      actors: [
        'Actors',
        actors,
      ],
      relise: [
        'Release Date',
        reliseDate,
      ],
      runtime: [
        'Runtime',
        timeAdapter(duration),
      ],
      country: [
        'Country',
        country,
      ],
      genre: [
        genres.length === 1 ? 'Genre' : 'Genres',
        createGenreList(),
      ],
    };
    return Object.values(filmDetails).map(([term, cell]) => `
      <tr class="film-details__row">
        <td class="film-details__term">${term}</td>
        <td class="film-details__cell">${cell}</td>
      </tr>`).join('');
  };

  const createInput = () => {
    const inputsCustom = {
      watchlist: [
        'Add to watchlist',
        isWatchlist ? 'checked' : '',
      ],
      watched: [
        'Already watched',
        isWatched ? 'checked' : '',
      ],
      favorite: [
        'Add to favorites',
        isFavorite ? 'checked' : '',
      ],
    };
    return Object.entries(inputsCustom).map(([key, [caption, check]]) => `
      <input type="checkbox" class="film-details__control-input visually-hidden" id="${key}" name="${key}" ${check}>
      <label for="${key}" class="film-details__control-label film-details__control-label--${key}">${caption}</label>`).join('');
  };

  const createEmoji = () => {
    const emojiCustom = ['smile', 'sleeping', 'puke', 'angry'];
    return emojiCustom.map((item) => `
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${item}" value="${item}">
      <label class="film-details__emoji-label" for="emoji-${item}">
        <img src="./images/emoji/${item}.png" width="30" height="30" alt="emoji">
      </label>`).join('');
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
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${quantityComments.length}</span></h3>

            <ul class="film-details__comments-list"></ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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
