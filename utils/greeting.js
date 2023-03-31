import moment from 'moment';
export const generateGreetings = () => {
  let currentHour = moment().format('HH');

  if (currentHour >= 3 && currentHour < 12) {
    return 'goodMorning';
  } else if (currentHour >= 12 && currentHour < 15) {
    return 'goodAfternoon';
  } else if (currentHour >= 15 && currentHour < 22) {
    return 'goodEvening';
  } else if (currentHour >= 22 || currentHour < 3) {
    return 'goodNight';
  } else {
    return 'hiThere';
  }
};
