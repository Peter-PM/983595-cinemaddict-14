import Observer from '../utils/observer.js';

export default class Movies extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        id: film.id,
        poster: film.film_info.poster,
        title: film.film_info.title,
        originalTitle: film.film_info.alternative_title,
        rating: film.film_info.total_rating,
        director: film.film_info.director,
        writers: film.film_info.writers,
        actors: film.film_info.actors,
        reliseDate: film.film_info.release.date,
        duration: film.film_info.runtime,
        country: film.film_info.release.release_country,
        genre: film.film_info.genre,
        description: film.film_info.description,
        ageRating: film.film_info.age_rating,
        isWatchlist: film.user_details.watchlist,
        isWatched: film.user_details.already_watched,
        isFavorite: film.user_details.favorite,
        watchedDate: film.user_details.watching_date,
        comments: film.comments,
        localComments: film.comments,
        localEmotion: null,
        localDescription: null,
        isDisabled: false,
      },
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'id': film.id,
        'comments': film.comments,
        'film_info': {
          'title': film.title,
          'alternative_title': film.originalTitle,
          'total_rating': film.rating,
          'poster': film.poster,
          'age_rating': film.ageRating,
          'director': film.director,
          'writers': film.writers,
          'actors': film.actors,
          'release': {
            'date': film.reliseDate,
            'release_country': film.country,
          },
          'runtime': film.duration,
          'genre': film.genre,
          'description': film.description,
        },
        'user_details': {
          'watchlist': film.isWatchlist,
          'already_watched': film.isWatched,
          'watching_date': film.watchedDate,
          'favorite': film.isFavorite,
        },
      },
    );

    delete adaptedFilm.poster;
    delete adaptedFilm.title;
    delete adaptedFilm.originalTitle;
    delete adaptedFilm.rating;
    delete adaptedFilm.director;
    delete adaptedFilm.writers;
    delete adaptedFilm.actors;
    delete adaptedFilm.reliseDate;
    delete adaptedFilm.duration;
    delete adaptedFilm.country;
    delete adaptedFilm.genre;
    delete adaptedFilm.description;
    delete adaptedFilm.ageRating;
    delete adaptedFilm.isWatchlist;
    delete adaptedFilm.isWatched;
    delete adaptedFilm.isFavorite;
    delete adaptedFilm.watchedDate;
    delete adaptedFilm.localDescription;
    delete adaptedFilm.localEmotion;
    delete adaptedFilm.localComments;
    delete adaptedFilm.isDisabled;

    return adaptedFilm;
  }
}
