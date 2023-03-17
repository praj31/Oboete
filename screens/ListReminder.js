import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getData, removeKey } from '../api/storage';
import { deleteAlarms } from '../api/alarm';
import { displayToast } from '../api/toast';
import moment from 'moment';

const ListReminder = props => {
  const [reminder, setReminder] = useState({});
  const [alarms, setAlarms] = useState([]);
  const navigation = props.navigation;
  const id = props.route.params.id;
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    async function fetchData() {
      let reminder = await getData(id);
      
      var allAlarms = [];
      if (reminder.repeat > 0) {
        for (var i = 1; i <= reminder.repeat; i++) {
          setAlarms([...alarms]);
          allAlarms.push(
            moment(reminder.datetime, 'YYYY-MM-DD LT')
              .subtract(reminder.interval * i, 'minutes')
              .format('LT'),
          );
        }

        setAlarms(allAlarms);
      }
      if (reminder) {
        setReminder(reminder);
      } else {
        alert('Error in fetching the event data');
        navigation.goBack();
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const deleteEvent = async id => {
    await deleteAlarms(id);
    await removeKey(id);
    displayToast('success', 'Reminder deleted!');
    navigation.goBack();
  };
  if (isLoading) {
    return (
      <View style={styles.horizontal}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#111" />
        </TouchableOpacity>
        <Text style={styles.h1}>Reminder Details</Text>
      </View>
      {reminder && (
        <View style={styles.detailsCard}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.value}>{reminder.title}</Text>
          {reminder.note && reminder.note.length>0&& <View>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.value}>{reminder.note}</Text>
          </View>}
          <Text style={styles.title}>Date</Text>
          <Text style={styles.value}>
            {moment(reminder.datetime, 'YYYY-MM-DD LT').format('LL')}
          </Text>
          <Text style={styles.title}>Time</Text>
          <Text style={styles.value}>
            {moment(reminder.datetime, 'YYYY-MM-DD LT').format('LT')}
          </Text>
          <Text style={styles.title}>Interval</Text>
          <Text style={styles.value}>{reminder.interval} minute(s)</Text>
          <Text style={styles.title}>Repeat</Text>
          <Text style={styles.value}>{reminder.repeat} time(s)</Text>
          <Text style={styles.title}>Alarm Type</Text>
          <Text style={styles.value}>{reminder.alarmType}</Text>
        </View>
      )}

      {reminder.repeat > 0 && (
        <View style={styles.alarms}>
          <Text style={styles.alarmTitle}>Alarms</Text>
          {alarms?.map((item, i) => (
            <View key={i} style={styles.alarmTab}>
              <Text style={styles.alarmTime}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.deleteBtn]}
            onPress={() => {
              deleteEvent(id);
            }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.editBtn]}
            onPress={() => navigation.navigate('EditReminder', { id: id })}>
            <Text style={{ fontSize: 16, color: '#111' }}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
  },
  backBtn: {
    marginRight: 8,
  },
  title: {
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: '#111',
    marginBottom: 12,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    margin: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    padding: 4,
  },
  alarms: {
    color: '#111',
    paddingTop: 10,
  },
  alarmTitle: {
    fontSize: 20,
    color: '#111',
    fontWeight: '900',
    marginBottom: 10,
  },
  alarmTab: {
    height: 36,
    backgroundColor: '#f2f2f2',
    marginBottom: 8,
    justifyContent: 'center',
    borderRadius: 5,
  },
  alarmTime: {
    color: '#111',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 15,
    paddingLeft: 10,
    fontWeight: '500',
  },
  actionBtn: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: 'red',
  },
  editBtn: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'white',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    height: 50,
  },
});
export default ListReminder;
