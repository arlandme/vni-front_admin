import Moment from 'moment';

export const formatDate = (date) => {
  return Moment(date).format('DD-MM-YYYY');
};

export const formatDateTime = (dateTime) => {
  return Moment(dateTime).format('DD-MM-YYYY, LT');
};