import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import ReminderCard from '../components/ReminderCard';
import { getAllToday, getData, removeKey, storeData } from '../api/storage';
import { updateAlarms, deleteAlarms } from '../api/alarm';
import { ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../utils/theme';
import { globalStyles } from '../styles/global'
import { generateGreetings } from '../utils/greeting';

export default function HomeScreen({ navigation }) {
  const [reminders, setReminders] = React.useState([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = React.useState(true);

  const { t } = useTranslation();

  React.useEffect(() => {
    async function getTodayReminders() {
      const data = await getAllToday();
      let events = [];
      for (let entry of data) {
        const item = await getData(entry);
        if (item) {
          // console.log("inside item",item);
          let eventTime = moment(item.datetime, 'YYYY-MM-DD LT');
          if (eventTime.isAfter(moment())) {

            events.push({ id: entry, ...item });
          } else {
            if (item.alarmType === 'Meta') {
              console.log(
                moment(item.datetime, 'YYYY-MM-DD LT').add(1, 'day').toString(),
              );
              let updatedReminder = {
                ...item,
                datetime: moment(item.datetime, 'YYYY-MM-DD LT')
                  .add(1, 'day')
                  .format('YYYY-MM-DD LT')
                  .toString(),
              };
              const alarms = await updateAlarms(
                updatedReminder.title,
                moment(updatedReminder.datetime, 'YYYY-MM-DD LT').toDate(),
                Number(updatedReminder.interval),
                Number(updatedReminder.repeat),
                entry,
              );
              updatedReminder = { ...updatedReminder, alarms };
              await storeData(updatedReminder);
            }
            // else {
            //   await deleteAlarms(entry);
            //   await removeKey(entry);
            // }
          }
        }
      }
      events.sort(
        (a, b) =>
          moment(a.datetime, 'YYYY-MM-DD LT') -
          moment(b.datetime, 'YYYY-MM-DD LT'),
      );
      setReminders(events);
      setIsLoading(false);
    }
    getTodayReminders();
  }, [isFocused]);

  const onClickReminderCard = id => {
    navigation.navigate('ListReminder', { id: id });
  };

  if (isLoading) {
    return (
      <View style={globalStyles.loader}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }
  return (
    <View style={globalStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ height: '100%' }}>
        <View style={globalStyles.header}>
          <Text style={globalStyles.greetings}>{generateGreetings()}</Text>
          <Text style={{ color: theme.color.white, marginTop: 12, marginLeft: 16, opacity: 0.9 }}>{reminders.length} event(s) due today.</Text>
        </View>
        <View style={globalStyles.inner}>
          {
            reminders.length !== 0 && (
              reminders.map(event => (
                <TouchableOpacity
                  key={event.id}
                  onPress={() => onClickReminderCard(event.id)}>
                  <ReminderCard key={event.id} event={event} />
                </TouchableOpacity>
              ))
            )
          }
        </View>
        {
          reminders.length == 0 && (
            <View style={globalStyles.imgContainer}>
              <Image
                style={globalStyles.image}
                source={require('../assets/calendar.png')}
                placeholder={'Relaxing'}
                contentFit="cover"
              />
              <Text style={globalStyles.prompt}>{t('HomeScreen:noEventsToday')}</Text>
            </View>
          )
        }
      </ScrollView>
    </View >
  );
}
