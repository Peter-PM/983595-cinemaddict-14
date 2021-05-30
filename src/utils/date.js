import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const dateFormatYYYY = (date) => {
  return dayjs(date).format('YYYY');
};

export const dateFormatPopup = (date) => {
  return dayjs(date).format('DD MMMM YYYY');
};

export const dateFormatComments = (date) => {
  return dayjs(date).format('YYYY/MM/DD HH:MM');
};

export const timeAdapter = (minutes) => {
  return dayjs.duration(minutes, 'm').hours() + 'h ' + dayjs.duration(minutes, 'm').minutes() + 'm';
};

export const today = () => {
  const day = dayjs();
  return dateFormatComments(day);
};

export const dateStatisticHours = (time) => {
  return Math.floor(time/60);
};

export const dateStatisticMitutes = (time) => {
  return dayjs.duration(time, 'm').minutes();
};
