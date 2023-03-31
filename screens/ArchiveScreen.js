import * as React from 'react';
import {
    View,    
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
import ReminderCard from '../components/ReminderCard';
import GestureRecognizer from 'react-native-swipe-gestures';
import Container from 'toastify-react-native';
import {getAllToday,getData} from '../api/storage';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
export default function ArchiveScreen({navigation}) {
    const [archiveAlarms,setArchiveAlarms] = React.useState([]);
    const isFocused = useIsFocused();
    React.useEffect(() => {
    async function getArchiveReminders() {
      const data = await getAllToday();
      let events = [];
      for (let entry of data) {
        const item = await getData(entry);
        if (item) {
          // console.log("inside item",item);
          let eventTime = moment(item.datetime, 'YYYY-MM-DD LT');
          if (!eventTime.isAfter(moment()) && item.alarmType != 'Meta') {
            events.push({id: entry, ...item});          
          }
        }
      }
      events.sort(
        (a, b) =>
          moment(a.datetime, 'YYYY-MM-DD LT') -
          moment(b.datetime, 'YYYY-MM-DD LT'),
      );
      setArchiveAlarms(events);
      
    }getArchiveReminders();
  }, [isFocused]);
  const onClickReminderCard = id => {
    navigation.navigate('ListReminder', {id: id});
  };
        return(<GestureRecognizer
            style={styles.container}
            onSwipeLeft={() => navigation.navigate('UpcomingScreen')}>
            <Container position="top" />
      
            {/* <TabNavigation navigation={navigation} screenName={'today'} /> */}
            {archiveAlarms.length !== 0 && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{height: '100%'}}>
                {archiveAlarms.map(event => (
                  <TouchableOpacity
                    key={event.id}
                    onPress={() => onClickReminderCard(event.id)}>
                    <ReminderCard key={event.id} event={event} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            </GestureRecognizer>)


}
const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 24,
  },
})