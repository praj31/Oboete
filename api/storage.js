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
    return true;
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
    let keys = await getAllKeys();
    if (keys) {
      keys = keys.filter(
        item => item.split('_')[1] === moment().format('YYYY-MM-DD'),
      );
      return keys;
    }
    return null;
  } catch (_) {
    return null;
  }
};

export const getAllUpcoming = async () => {
  try {
    let keys = await getAllKeys();
    if (keys) {
      keys = keys.filter(
        item => item.split('_')[1] !== moment().format('YYYY-MM-DD'),
      );
      return keys;
    }
    return null;
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
