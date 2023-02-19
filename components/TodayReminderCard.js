import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import * as React from 'react';

export default function TodayReminderCard({event, deleteEvent}) {
  return (
    <View style={styles.r_card}>
      <View style={{flex: 4}}>
        <Text style={styles.r_title}>{event.title}</Text>
        <Text style={styles.r_datetime}>
          {event.datetime.split(' ')[1]} {event.datetime.split(' ')[2]}
        </Text>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => deleteEvent(event.id)}
          style={styles.r_deleteEvent}>
          <Text>
            <Icon name="trash-outline" size={24} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  r_card: {
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: 4,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  r_title: {
    fontSize: 20,
    color: '#333',
    paddingBottom: 2,
  },
  r_datetime: {
    fontSize: 14,
    color: '#666',
  },
  r_deleteEvent: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff3344ee',
    borderRadius: 8,
  },
});
