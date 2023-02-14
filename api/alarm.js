import {
  schedulePushNotification,
  cancelScheduledPushNotification,
} from './notification';
import { getData } from './storage';
import moment from 'moment';
import {NativeEventEmitter, NativeModules} from 'react-native';

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
  let alarms = [];
  for (let i = 0; i <= repeat; i++) {
    const identifier = await schedulePushNotification(
      title,
      moment(date)
        .subtract(i * interval, 'minutes')
        .toDate()
    );

    
    alarms.push(identifier.id);
  }
  
  return alarms;
};

export const deleteAlarms = async (id) => {
  let reminder = await getData(id);
  let { alarms } = reminder;
  for (let alarm of alarms) {
    await cancelScheduledPushNotification(alarm);
  }
};
