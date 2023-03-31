import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as React from 'react'
import { theme } from '../utils/theme';
import moment from 'moment';

export default function ReminderCard({ event }) {

  return (
    <View style={styles.card}>
      <View style={styles.fancy}></View>
      <View style={{ flex: 4, marginLeft: 12 }}>
        <Text style={styles.cardTitle}>{event.title}</Text>
        <Text style={styles.cardDatetime}>
          {moment(event.datetime, 'YYYY-MM-DD LT').format("hh:mm A")}
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          <Icon name="chevron-forward" size={24} color={theme.color.primary} />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: 4,
    padding: 16,
    backgroundColor: theme.color.white,
    borderWidth: 1,
    borderColor: theme.color.primary,
    overflow: 'hidden'
  },
  cardTitle: {
    fontSize: 18,
    color: theme.color.black,
    paddingBottom: 2,
  },
  cardDatetime: {
    fontSize: 14,
    color: theme.color.gray,
  },
  fancy: {
    position: 'absolute',
    backgroundColor: theme.color.primary,
    width: 8,
    top: -12,
    height: 1200,
    borderRadius: 8
  },
});
