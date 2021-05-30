import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const formatDateYear = (date) => {
  return dayjs(date).format('YYYY');
};

export const formatDatePopup = (date) => {
  return dayjs(date).format('DD MMMM YYYY');
};

export const formatDateComments = (date) => {
  return dayjs(date).format('YYYY/MM/DD HH:MM');
};

export const getTimeAdapter = (minutes) => {
  return dayjs.duration(minutes, 'm').hours() + 'h ' + dayjs.duration(minutes, 'm').minutes() + 'm';
};

export const getToday = () => {
  const day = dayjs();
  return formatDateComments(day);
};

export const getStatisticHours = (time) => {
  return Math.floor(time/60);
};

export const getStatisticMitutes = (time) => {
  return dayjs.duration(time, 'm').minutes();
};
