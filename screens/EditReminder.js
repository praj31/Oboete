import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';
import {getData, storeData} from '../api/storage';
import {checkAlarmValidity, setupAlarms, updateAlarms} from '../api/alarm';
import {checkNotificationPermissionFunc} from '../api/notification';
import {displayToast} from '../api/toast';
import {getAllKeys} from '../api/storage';
import {useTranslation} from 'react-i18next';
import SoundModal from '../components/SoundModal';

export default function EditReminder(props) {
  moment.tz.setDefault();

  const {t} = useTranslation();
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState(moment().toDate());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [interval, setInterval] = React.useState('0');
  const [repeat, setRepeat] = React.useState('0');

  const [selectedSound, setSelectedSound] = React.useState('sound1.mp3');
  const [chosenSound, setChosenSound] = React.useState(
    selectedSound || 'sound1.mp3',
  );

  const [reminder, setReminder] = React.useState({});
  const navigation = props.navigation;
  const id = props.route.params.id;
  console.log('id:---', id);
  React.useEffect(() => {
    async function fetchData() {
      let reminder = await getData(id);
      if (reminder) {
        console.log(reminder);
        setTitle(reminder.title);
        setInterval(reminder.interval.toString());
        setRepeat(reminder.repeat.toString());
        setDate(new Date(moment(reminder.datetime, 'YYYY-MM-DD LT')));
        setReminder(reminder);
        setSelectedSound(reminder.sound_name || 'sound1.mp3');
        setChosenSound(reminder.sound_name || 'sound1.mp3');
      } else {
        alert('Error in fetching the event data');
        navigation.goBack();
      }
    }
    fetchData();
  }, []);

  const onChangeDate = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
  };

  const onChangeTime = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowTimePicker(false);
  };

  const editButtonClicked = async () => {
    let permission = await checkNotificationPermissionFunc();

    if (permission === true) {
      if (title) {
        let reminder = {
          title,
          datetime: moment(date).format('YYYY-MM-DD LT').toString(),
          interval: Number(interval) ?? 0,
          repeat: Number(repeat) ?? 0,
          sound_name: selectedSound,
        };
        if (
          moment(date).format('YYYY-MM-DD LT') <=
          moment().format('YYYY-MM-DD LT')
        ) {
          return alert(t('AddReminder:pastTimeAlert'));
        }
        let status = await checkAlarmValidity(moment(date), interval, repeat);

        if (status) {
          try {
            const alarms = await updateAlarms(
              title,
              date,
              Number(interval),
              Number(repeat),
              id,
              selectedSound,
            );

            reminder = {...reminder, alarms};
            await storeData(reminder);
            displayToast('success', t('Global:reminderModified'));
            navigation.navigate('Home');
          } catch (err) {
            console.log(err);
            alert(err);
          }
        } else {
          return alert(t('AddReminder:alarmConflictAlert'));
        }
      } else {
        alert(t('AddReminder:allFieldError'));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{t('AddReminder:editReminder')}</Text>
      <ScrollView>
        <Text style={styles.label}>{t('AddReminder:eventTitle')}</Text>
        <TextInput
          value={title}
          style={styles.textinput}
          onChangeText={setTitle}
          maxLength={40}
        />
        <Text style={styles.label}>{t('AddReminder:eventDate')}</Text>
        <Pressable onPress={() => setShowDatePicker(!showDatePicker)}>
          <TextInput
            autoFocus={true}
            autoCapitalize="sentences"
            style={styles.textinput}
            editable={false}
            value={moment(date).format('LL')}
          />
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            mode={'date'}
            minimumDate={new Date()}
            value={date}
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
        <Text style={styles.label}>{t('AddReminder:eventTime')}</Text>
        <Pressable onPress={() => setShowTimePicker(!showTimePicker)}>
          <TextInput
            style={styles.textinput}
            editable={false}
            value={moment(date).format('LT')}
          />
        </Pressable>
        {showTimePicker && (
          <DateTimePicker
            mode={'time'}
            minimumDate={new Date()}
            value={date}
            is24Hour={false}
            display="default"
            onChange={onChangeTime}
          />
        )}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1, marginRight: 4}}>
            <Text style={styles.label}>{t('AddReminder:interval')}</Text>
            <TextInput
              value={interval}
              style={styles.textinput}
              keyboardType="numeric"
              onChangeText={setInterval}
            />
          </View>
          <View style={{flex: 1, marginLeft: 4}}>
            <Text style={styles.label}>{t('AddReminder:repeat')}</Text>
            <TextInput
              value={repeat}
              inputMode="numeric"
              style={styles.textinput}
              keyboardType="numeric"
              onChangeText={setRepeat}
            />
          </View>
        </View>
        <SoundModal
          chosenSound={chosenSound}
          setChosenSound={setChosenSound}
          selectedSound={selectedSound}
          setSelectedSound={setSelectedSound}
        />
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.primaryBtn]}
            onPress={editButtonClicked}>
            <Text style={{color: '#fff', fontSize: 16}}>
              {t('AddReminder:update')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.secondaryBtn]}
            onPress={() => navigation.goBack()}>
            <Text style={{fontSize: 16, color: '#111'}}>
              {t('AddReminder:cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 16,
    color: '#111',
  },
  label: {
    color: '#666',
  },
  textinput: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 0,
    paddingRight: 8,
    width: '100%',
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#333',
    marginBottom: 24,
    color: '#333',
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
  actionBtn: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  primaryBtn: {
    backgroundColor: '#333',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#333',
  },
});
