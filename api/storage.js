import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import moment from 'moment';
import ReactNativeAN from '@kaistseo/react-native-alarm-notification';

export const storeData = async value => {
  try {
    let key = uuid.v4();
    key = key + '_' + value.datetime.substring(0, 10);
    const jsonValue = JSON.stringify(value);
    // console.log("data to be saved in setItem",jsonValue);
    await AsyncStorage.setItem(key, jsonValue);
    return {success: true, key};
  } catch (e) {
    return false;
  }
};

export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return null;
  }
};

export const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    return null;
  }
  return keys;
};

export const getAllToday = async () => {
  try {
    let todayData = [];
    let keys = await getAllKeys();
    if (keys) {
      keys = keys.filter(
        item => item.split('_')[1] === moment().format('YYYY-MM-DD'),
      );

      const result = await AsyncStorage.multiGet(keys);

      try {
        await result.map(data => {
          if (data[1] && JSON.parse(data[1]).alarmType !== 'Meta') {
            todayData.push(data[0]);
          }
        });
      } catch (error) {
        // console.log(error);
      }
      return todayData;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const getAllUpcoming = async () => {
  try {
    let upcomingData = [];
    let keys = await getAllKeys();
    if (keys) {
      keys = keys.filter(
        item => item.split('_')[1] !== moment().format('YYYY-MM-DD'),
      );
      const result = await AsyncStorage.multiGet(keys);

      try {
        await result.map(data => {
          if (data[1] && JSON.parse(data[1]).alarmType !== 'Meta') {
            upcomingData.push(data[0]);
          }
        });
      } catch (error) {
        // console.log(error);
      }
      return upcomingData;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const getAllMeta = async () => {
  try {
    let metaData = [];
    let keys = await getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    try {
      await result.map(data => {
        if (data[1]) {
          try {
            const parsedData = JSON.parse(data[1]);
            if (parsedData.alarmType === 'Meta') {
              metaData.push(data[0]);
            }
          } catch (error) {}
        }
      });
    } catch (error) {}

    return metaData;
  } catch (e) {
    return null;
  }
};

export const clearAll = async () => {
  try {
    let allAlarmData = await ReactNativeAN.getScheduledAlarms();
    allAlarmData.map(al => {
      ReactNativeAN.deleteAlarm(al.id);
    });

    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};

export const removeKey = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};
