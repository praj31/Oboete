import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Container from 'toastify-react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/Ionicons';
import ReminderCard from '../components/ReminderCard';
import { useIsFocused } from '@react-navigation/native';
import { getAllToday, getData, removeKey, storeData } from '../api/storage';
import { updateAlarms, deleteAlarms } from '../api/alarm';
import TabNavigation from '../components/TabNavigation';
import { ActivityIndicator } from 'react-native';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import LanguageModal from '../components/LanguageModal';
import ReactNativeAN from '@kaistseo/react-native-alarm-notification';

export default function HomeScreen({ navigation }) {
  const [reminders, setReminders] = React.useState([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = React.useState(true);
  const { i18n } = useTranslation();

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
            // console.log("all alarms are: ", item);
            events.push({ id: entry, ...item });
          }
          else {
            if (item.alarmType === "Meta") {
              console.log(moment(item.datetime, 'YYYY-MM-DD LT').add(1, 'day').toString())
              let updatedReminder = { ...item, datetime: moment(item.datetime, 'YYYY-MM-DD LT').add(1, 'day').format('YYYY-MM-DD LT').toString() }
              const alarms = await updateAlarms(
                updatedReminder.title,
                moment(updatedReminder.datetime, 'YYYY-MM-DD LT').toDate(),
                Number(updatedReminder.interval),
                Number(updatedReminder.repeat),
                entry,
              );
              updatedReminder = { ...updatedReminder, alarms };
              await storeData(updatedReminder);
            } else {
              await deleteAlarms(entry);
              await removeKey(entry);
            }
          }
        }
      }
      events.sort((a, b) => moment(a.datetime, 'YYYY-MM-DD LT') - moment(b.datetime, 'YYYY-MM-DD LT'))
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
      <View style={styles.horizontal}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  const languageChange = lang => {
    i18n.changeLanguage(lang);
  };

  return (
    <GestureRecognizer
      style={styles.container}
      onSwipeLeft={() => navigation.navigate('Upcoming')}>
      <Container position="top" />

      <TabNavigation navigation={navigation} screenName={'today'} />
      {reminders.length !== 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ height: '100%' }}>
          {reminders.map(event => (
            <TouchableOpacity
              key={event.id}
              onPress={() => onClickReminderCard(event.id)}>
              <ReminderCard
                key={event.id}
                event={event}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {reminders.length == 0 && (
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require('../assets/relaxing.png')}
            placeholder={'Relaxing'}
            contentFit="cover"
          />
          <Text style={styles.prompt}>{t('HomeScreen:noEventsToday')}</Text>
        </View>
      )}

      <LanguageModal languageChange={languageChange} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddReminder')}>
          <Text>
            <Icon name="add-outline" size={36} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 24,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    margin: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
  },
  h1: {
    fontSize: 36,
    fontWeight: 'bold',
    paddingBottom: 16,
    color: '#111',
  },
  imgContainer: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 256,
    height: 256,
  },
  prompt: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#111',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    height: 50,
  },
});
