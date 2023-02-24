import {
  schedulePushNotification,
  cancelScheduledPushNotification,
} from './notification';
import {getData, removeKey} from './storage';
import moment from 'moment';
import {NativeEventEmitter, NativeModules} from 'react-native';
import ReactNativeAN from '@kaistseo/react-native-alarm-notification';
const {RNAlarmNotification} = NativeModules;
const RNAlarmEmitter = new NativeEventEmitter(RNAlarmNotification);

export const loadAlarmListeners = async () => {
  //OnNotificationDismissed event
  RNAlarmEmitter.addListener('OnNotificationDismissed', data => {
    console.log('dismissed', JSON.parse(data)), ReactNativeAN.stopAlarmSound();
  });

  //OnNotificationOpened event
  RNAlarmEmitter.addListener('OnNotificationOpened', data => {
    console.log('opened', JSON.parse(data)), ReactNativeAN.stopAlarmSound();
  });
};

export const setupAlarms = async (title, date, interval, repeat) => {
  console.log('uihiuhihihi', date);
  let alarms = [];
  if (interval === 0) repeat = 0;
  try {
    for (let i = 0; i <= repeat; i++) {
      const identifier = await schedulePushNotification(
        title,
        interval * i,
        moment(date)
          .subtract(i * interval, 'minutes')
          .toDate(),
      );
      alarms.push(identifier.id);
    }
    return alarms;
  } catch (err) {
    for (let alarm of alarms) {
      await cancelScheduledPushNotification(alarm);
    }
    return [];
  }
};

export const checkAlarmValidity = async (date, interval, repeat) =>
  moment() <= moment(date).subtract(interval * repeat, 'minutes');

export const deleteAlarms = async id => {
  let reminder = await getData(id);

  // console.log('test data', reminder);
  let {alarms} = reminder;
  for (let alarm of alarms) {
    await cancelScheduledPushNotification(alarm);
  }
};

export const updateAlarms = async (title, date, interval, repeat, id) => {
  console.log('update', date);
  let alarms = [];
  if (interval === 0) repeat = 0;

  try {
    await deleteAlarms(id);
    await removeKey(id);
    for (let i = 0; i <= repeat; i++) {
      const identifier = await schedulePushNotification(
        title,
        interval * i,
        moment(date)
          .subtract(i * interval, 'minutes')
          .toDate(),
      );
      alarms.push(identifier.id);
    }
    return alarms;
  } catch (err) {
    for (let alarm of alarms) {
      await cancelScheduledPushNotification(alarm);
    }

    return [];
  }
};
