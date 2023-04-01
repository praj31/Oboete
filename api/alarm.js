import {
  schedulePushNotification,
  cancelScheduledPushNotification,
} from './notification';
// import { useNavigation } from '@react-navigation/native';
import {getData, getAllToday, removeKey} from './storage';
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
  //   RNAlarmEmitter.addListener(
  //     'OnNotificationOpened', async(data) => {
  //       // const navigation = useNavigation()
  //       console.log("open subs",JSON.parse(data))

  //       const allAlarms = await getAllToday();
  //       for (let entry of allAlarms) {
  //         const item = await getData(entry);
  //         if (item && item.alarms.find((a)=>a==JSON.parse(data).id)) {
  //           const item = await getData(entry);
  //           console.log("inside alarm item ",item);
  //           navigation.navigate('ListReminder', {id: entry});
  //         }
  //       }

  //       ReactNativeAN.stopAlarmSound()
  //     }
  // );
};

export const setupAlarms = async (
  title,
  date,
  interval,
  repeat,
  selectedSound,
) => {
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
        selectedSound,
      );
      alarms.push(identifier.id);
    }

    console.log('====================================');
    console.log('alarms id', alarms);
    console.log('====================================');
    return alarms;
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
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

  let {alarms} = reminder;
  for (let alarm of alarms) {
    await cancelScheduledPushNotification(alarm);
  }
};

export const updateAlarms = async (
  title,
  date,
  interval,
  repeat,
  id,
  selectedSound,
) => {
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
        selectedSound,
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
