import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import {getAllUpcoming, getData, removeKey} from '../api/storage';
import UpcomingReminderCard from '../components/UpcomingReminderCard';
import TabNavigation from '../components/TabNavigation';
import {ActivityIndicator} from 'react-native';
import moment from 'moment';

export default function Upcoming({navigation}) {
  const [reminders, setReminders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    async function getUpcomingReminders() {
      const data = await getAllUpcoming();
      let events = [];
      for (let entry of data) {
        const item = await getData(entry);
        if (item) {
          console.log("inside item",item);
          var beforeTime = moment(item.datetime, 'YYYY-MM-DD LT');
          if(beforeTime.isAfter(new Date()))
          {
          console.log("all alarms are: ",item);
          events.push({id: entry, ...item});
          }
          else{
            await deleteAlarms(entry);
            await removeKey(entry);
          }
        }
        
      }

      setReminders(events);
      setIsLoading(false);
    }
    getUpcomingReminders();
  }, [isFocused]);

  const onClickReminderCard = id => {
    navigation.navigate('ListReminder', {id: id});
  };

  if (isLoading) {
    <View style={styles.horizontal}>
      <ActivityIndicator size="large" color="#333" />
    </View>;
  }

  return (
    <GestureRecognizer
      style={styles.container}
      onSwipeRight={() => navigation.navigate('Home')}>
      {/* <Text style={styles.h1}>Upcoming</Text> */}
      <TabNavigation navigation={navigation} screenName={'upcoming'} />
      {reminders.length !== 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{height: '100%'}}>
          {reminders.map(event => (
            <TouchableOpacity
              key={event.id}
              onPress={() => onClickReminderCard(event.id)}>
              <UpcomingReminderCard event={event} key={event.id} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {reminders.length == 0 && (
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require('../assets/checklist.png')}
            placeholder={'Relaxing'}
            contentFit="cover"
          />
          <Text style={styles.prompt}>Woohoo! You are all caught up!</Text>
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    height: 50,
  },
});
