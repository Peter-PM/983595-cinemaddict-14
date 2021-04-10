import {generateDate} from '../utils/date.js';

export const getRandomNumber = function (min, max) {

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
};

const randomArrayLength = (arr, separator) => {
  const Length = getRandomNumber(1, arr.length);
  const newArr = arr.slice(0, Length).join(separator);
  return newArr;
};

const createTitle = () => {
  const title = [
    'Лига',
    'справедливости',
    'Зака',
    'Снайдера',
  ];

  return randomArrayLength(title, ' ');
};

const createAltTitle = () => {
  const altTitle = [
    'Zack',
    'Snyders',
    'Justice',
    'League',
  ];

  return randomArrayLength(altTitle, ' ');
};

const createDirector = () => {
  const directors = [
    'Зак Снайдер',
    'Джосс Уидон',
    'Кристофер Нолан',
    'Стивен Спилберг',
    'Стэнли Кубрик',
    'Альфред Хичкок',
  ];

  return directors[getRandomNumber(0, directors.length - 1)];
};

const createActors = () => {
  const actors = [
    'Бен Аффлек',
    'Галь Гадот',
    'Генри Кавилл',
    'Джейсон Момоа',
    'Эзра Миллер',
    'Рэй Фишер',
    'Эми Адамс',
    'Джереми Айронс',
    'Дайан Лэйн',
    'Джаред Лето',
  ];

  return randomArrayLength(actors, ', ');
};

const createDescription = () => {
  const description = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  ];

  return randomArrayLength(description, '');
};

const createCountry = () => {
  const countrys = [
    'США',
    'Великобритания',
    'Россия',
  ];

  return countrys[getRandomNumber(0, countrys.length - 1)];
};

const createGenre = () => {
  const genres = [
    'фантастика',
    'боевик',
    'фэнтези',
  ];

  return randomArrayLength(genres, ', ');
};

const createWriters = () => {
  const writers = [
    'Крис Террио ',
    'Джерри Сигел ',
    'Джо Шустер',
    'Зак Снайдер',
    'Уилл Билл',
  ];

  return randomArrayLength(writers, ', ');
};

const generateDuratuion = () => {
  return getRandomNumber(90, 250);
};

const createPoster = () => {
  const posters = [
    './images/posters/league1.webp',
    './images/posters/league2.webp',
    './images/posters/league3.webp',
    './images/posters/league4.webp',
  ];

  return posters[getRandomNumber(0, posters.length - 1)];
};

const createComments = () => {
  return new Array(getRandomNumber(0, 100));
};

export const createFilmContent = () => {
  return {
    poster: createPoster(),
    title: createTitle(),
    originalTitle: createAltTitle(),
    rating: (Math.random() * 10).toFixed(1),
    director: createDirector(),
    writers: createWriters(),
    actors: createActors(),
    reliseDate: generateDate(),
    duration: generateDuratuion(),
    country: createCountry(),
    genre: createGenre(),
    description: createDescription(),
    ageRating: getRandomNumber(6, 18) + '+',
    quantityComments: createComments(),
    isWatchlist: Boolean(getRandomNumber(0, 1)),
    isWatched: Boolean(getRandomNumber(0, 1)),
    isFavorite: Boolean(getRandomNumber(0, 1)),
  };
};
