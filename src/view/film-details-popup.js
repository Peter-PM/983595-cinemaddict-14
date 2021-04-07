import {timeAdapter, dateFormatDDMMMMYYYY} from '../utils/date.js';

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
        cell: dateFormatDDMMMMYYYY(reliseDate),
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
        check: isWatchlist ? 'checked' : '',
      },
      {
        id: 'watched',
        title: 'Already watched',
        check: isWatched ? 'checked' : '',
      },
      {
        id: 'favorite',
        title: 'Add to favorites',
        check: isFavorite ? 'checked' : '',
      },
    ];
    return inputsCustom.map(({id, title, check}) => `
      <input type="checkbox" class="film-details__control-input visually-hidden" id="${id}" name="${id}" ${check}>
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


  // const arr = [
  //   {
  //     term: 'Director',
  //     cell: director,
  //   },
  //   {
  //     term: 'Writers',
  //     cell: writers,
  //   },
  //   {
  //     term: 'Actors',
  //     cell: actors,
  //   },
  //   {
  //     term: 'Release Date',
  //     cell: reliseDate,
  //   },
  //   {
  //     term: 'Runtime',
  //     cell: timeAdapter(duration),
  //   },
  //   {
  //     term: 'Country',
  //     cell: country,
  //   },
  //   {
  //     term: genres.length === 1 ? 'Genre' : 'Genres',
  //     cell: createGenreList(),
  //   },
  // ]

  // console.log(arr.map(({term,cell}) => { return `<tr class="film-details__row">
  //   <td class="film-details__term">${term}</td>
  //   <td class="film-details__cell">${cell}</td>
  // </tr>`}).join(''));


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


