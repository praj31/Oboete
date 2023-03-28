import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getData, removeKey } from '../api/storage';
import { deleteAlarms } from '../api/alarm';
import { displayToast } from '../api/toast';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { globalStyles } from '../styles/global';
import { formStyles } from '../styles/form';
import { theme } from '../utils/theme';

const ListReminder = props => {
  const [reminder, setReminder] = useState({});
  const [alarms, setAlarms] = useState([]);
  const navigation = props.navigation;
  const id = props.route.params.id;
  const [isLoading, setIsLoading] = React.useState(true);

  const { t } = useTranslation();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    async function fetchData() {
      let reminder = await getData(id);
      let allAlarms = [];
      if (reminder.repeat && reminder.repeat > 0) {
        for (let i = 1; i <= reminder.repeat; i++) {
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
  }, [isFocused]);

  const deleteEvent = async id => {
    await deleteAlarms(id);
    await removeKey(id);
    displayToast('success', t('Global:reminderDeleted'));
    navigation.goBack();
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
      <View style={{ marginBottom: 32 }}></View>
      <ScrollView showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ height: '100%' }}>
        {reminder && (
          <View style={globalStyles.inner}>
            <Text style={styles.title}>{t('ListReminder:title')}</Text>
            <Text style={styles.value}>{reminder.title}</Text>
            {reminder.note.length > 0 && (
              <View>
                <Text style={styles.title}>{t('ListReminder:description')}</Text>
                <Text style={styles.value}>{reminder.note}</Text>
              </View>
            )}
            <Text style={styles.title}>{t('ListReminder:date')}</Text>
            <Text style={styles.value}>
              {moment(reminder.datetime, 'YYYY-MM-DD LT').format('LL')}
            </Text>
            <Text style={styles.title}>{t('ListReminder:time')}</Text>
            <Text style={styles.value}>
              {moment(reminder.datetime, 'YYYY-MM-DD LT').format('LT')}
            </Text>
            <Text style={styles.title}>{t('ListReminder:interval')}</Text>
            <Text style={styles.value}>{reminder.interval ?? 0} minute(s)</Text>
            <Text style={styles.title}>{t('ListReminder:repeat')}</Text>
            <Text style={styles.value}>{reminder.repeat ?? 0} time(s)</Text>
            <Text style={styles.title}>{t('ListReminder:alarmType')}</Text>
            <Text style={styles.value}>{reminder.alarmType}</Text>
            <Text style={styles.title}>{t('ListReminder:alarmSound')}</Text>
            <Text style={styles.value}>{reminder.sound_name}</Text>

            {reminder.repeat > 0 && (
              <View style={styles.alarms}>
                <Text style={styles.title}>{t('ListReminder:alarms')}</Text>
                {alarms?.map((item, i) => (
                  <View key={i} style={styles.alarmTab}>
                    <Text style={styles.alarmTime}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
            <View style={styles.footer}>
              <View style={{ flex: 1, marginRight: 2 }}>
                <TouchableOpacity
                  style={[formStyles.actionBtn, formStyles.primaryBtn]}
                  onPress={() => navigation.navigate('EditReminder', { id: id })}>
                  <Text style={{ color: theme.color.white }}>
                    {t('ListReminder:edit')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, marginLeft: 2 }}>
                <TouchableOpacity
                  style={[formStyles.actionBtn, formStyles.primaryBtn]}
                  onPress={() => {
                    deleteEvent(id);
                  }}>
                  <Text style={{ color: theme.color.white }}>
                    {t('ListReminder:delete')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: theme.color.gray,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: theme.color.black,
    marginBottom: 12,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alarms: {
    marginBottom: 8,
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
  deleteBtn: {
    backgroundColor: theme.color.white,
    borderWidth: 1,
    borderColor: theme.color.warning,
  },
});
export default ListReminder;
