import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {getAllMeta, getAllUpcoming, getData} from '../api/storage';
import ReminderCard from '../components/ReminderCard';
import {ActivityIndicator} from 'react-native';
import {useTranslation} from 'react-i18next';
import {globalStyles} from '../styles/global';
import {generateGreetings} from '../utils/greeting';
import {theme} from '../utils/theme';

export default function Meta({navigation}) {
  const [reminders, setReminders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isFocused = useIsFocused();

  const {t} = useTranslation();
  React.useEffect(() => {
    async function getMetaReminders() {
      const data = await getAllMeta();
      let events = [];
      for (let entry of data) {
        const item = await getData(entry);
        if (item) {
          events.push({
            id: entry,
            ...item,
            occurs: moment(item.datetime, 'YYYY-MM-DD LT').calendar(),
          });
        }
      }
      events = events.sort(
        (a, b) =>
          moment(a.datetime, 'YYYY-MM-DD LT') -
          moment(b.datetime, 'YYYY-MM-DD LT'),
      );
      setReminders(events);
      setIsLoading(false);
    }
    getMetaReminders();
  }, [isFocused]);

  const onClickReminderCard = id => {
    navigation.navigate('ListReminder', {id: id});
  };

  if (isLoading) {
    <View style={globalStyles.loader}>
      <ActivityIndicator size="large" color="#333" />
    </View>;
  }

  return (
    <View style={globalStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{height: '100%'}}>
        <View style={globalStyles.header}>
          <Text style={globalStyles.greetings}>
            {t(`Greetings:${generateGreetings()}`)}
          </Text>
          <Text
            style={{
              color: theme.color.white,
              marginTop: 12,
              marginLeft: 16,
              opacity: 0.9,
            }}>
            {t('HomeScreen:reminderAboutReminder')}
          </Text>
        </View>
        <View style={globalStyles.inner}>
          {reminders.length !== 0 &&
            reminders.map((event, idx) => (
              <View key={idx}>
                {(idx == 0 ||
                  reminders[idx].occurs !== reminders[idx - 1].occurs) && (
                  <Text
                    style={{
                      marginBottom: 6,
                      marginLeft: 4,
                      color: theme.color.gray,
                    }}
                    key={idx}>
                    {moment(event.datetime, 'YYYY-MM-DD LT').calendar()}
                  </Text>
                )}
                <TouchableOpacity
                  key={event.id}
                  onPress={() => onClickReminderCard(event.id)}>
                  <ReminderCard event={event} key={event.id} />
                </TouchableOpacity>
              </View>
            ))}
        </View>
        {reminders.length == 0 && (
          <View style={globalStyles.imgContainer}>
            <Image
              style={globalStyles.image}
              source={require('../assets/calendar.png')}
              placeholder={'Relaxing'}
              contentFit="cover"
            />
            <Text style={globalStyles.prompt}>
              {t('HomeScreen:noEventsUpcoming')}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
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
