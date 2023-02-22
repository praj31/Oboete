import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import Container from 'toastify-react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/Ionicons';
import TodayReminderCard from '../components/TodayReminderCard';
import {useIsFocused} from '@react-navigation/native';
import {getAllToday, getData, removeKey} from '../api/storage';
import {deleteAlarms} from '../api/alarm';
import TabNavigation from '../components/TabNavigation';

export default function HomeScreen({navigation}) {
  const [reminders, setReminders] = React.useState([]);

  const isFocused = useIsFocused();

  React.useEffect(() => {
    async function getTodayReminders() {
      const data = await getAllToday();

      let events = [];
      for (let entry of data) {
        const item = await getData(entry);
        if (item) {
          events.push({id: entry, ...item});
        }
      }
      console.log(events);
      setReminders(events);
    }
    getTodayReminders();
  }, [isFocused]);

  const onClickReminderCard = id => {
    navigation.navigate('ListReminder', {id: id});
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
          style={{height: '100%'}}>
          {reminders.map(event => (
            <TouchableOpacity
              key={event.id}
              onPress={() => onClickReminderCard(event.id)}>
              <TodayReminderCard
                navigation={navigation}
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
          <Text style={styles.prompt}>No events today. Take your day off!</Text>
        </View>
      )}
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
});
