import dayjs from 'dayjs';

export const sortByDate = (movieA, movieB) => dayjs(movieB.reliseDate).diff(movieA.reliseDate);

export const sortByRating = (movieA, movieB) => movieB.rating - movieA.rating;
