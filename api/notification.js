import ReactNativeAN from '@kaistseo/react-native-alarm-notification';

import {
  changeNotificationSetting,
  checkNotificationPermission,
} from 'react-native-check-notification-permission';

export const schedulePushNotification = async (title, minutes, date) => {
  const trigger = new Date(date);
  trigger.setMilliseconds(0);
  trigger.setSeconds(0);
  const reminderMessage =
    minutes == 0
      ? 'A gentle reminder 🔔'
      : `Your event is in ${minutes} minutes`;
  const alarmNotifData = {
    title: reminderMessage,
    message: title,
    channel: 'my_channel_id',
    small_icon: 'ic_launcher',
    has_button: true,
    data: {message: title},
    volume: 1.0,
  };
  let alDate = ReactNativeAN.parseDate(trigger);

  const setAlarmData = await ReactNativeAN.scheduleAlarm({
    ...alarmNotifData,
    fire_date: alDate,
  });

  return setAlarmData;
};

export const cancelScheduledPushNotification = async id => {
  await ReactNativeAN.deleteAlarm(id);
};

export const checkNotificationPermissionFunc = async () => {
  const notificationAccess = await checkNotificationPermission();

  if (!notificationAccess) {
    changeNotificationSetting();
  }

  return notificationAccess;
};
