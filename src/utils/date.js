import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {getRandomNumber} from '../mock/mock.js';

dayjs.extend(duration);
export const generateDate = () => {

  const maxDaysGap = 10;
  const daysGap = getRandomNumber(-maxDaysGap, maxDaysGap);
  return dayjs(dayjs().add(daysGap, 'day').toDate()).format('YYYY-MM-DDTHH:mm:ssZ');
};

export const dateFormatYYYY = (date) => {
  return dayjs(date).format('YYYY');
};

export const dateFormatDDMMMMYYYY = (date) => {
  return dayjs(date).format('DD MMMM YYYY');
};

export const timeAdapter = (minutes) => {
  return dayjs.duration(minutes, 'm').hours() + 'h ' + dayjs.duration(minutes, 'm').minutes() + 'm';
};
