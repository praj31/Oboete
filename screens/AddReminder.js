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
import {storeData} from '../api/storage';
import {setupAlarms} from '../api/alarm';
import {checkNotificationPermissionFunc} from '../api/notification';
import {displayToast} from '../api/toast';
import {useTranslation} from 'react-i18next';
import SoundModal from '../components/SoundModal';

export default function AddReminder({navigation}) {
  moment.tz.setDefault();
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

  const {t} = useTranslation();

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

  const addEventClicked = async () => {
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
        try {
          const alarms = await setupAlarms(
            title,
            date,
            Number(interval),
            Number(repeat),
            selectedSound,
          );

          if (alarms.length === 0)
            return alert(t('AddReminder:alarmConflictAlert'));
          reminder = {...reminder, alarms};
          await storeData(reminder);
          displayToast('success', t('Global:reminderAdded'));
          navigation.goBack();
        } catch (err) {
          alert(err);
        }
      } else {
        alert(t('AddReminder:allFieldError'));
      }
    }
  };

  // const performTest = async () => {
  // const test_date = new Date(Date.now() + 60 * 1000)
  // const test_title = "Testing"
  // let reminder = {
  // title: test_title,
  // datetime: moment(test_date)
  // .format('YYYY-MM-DD LT')
  // .toString(),
  // };
  // const alarms = await setupAlarms(test_title, test_date, 0, 0);
  // reminder = { ...reminder, alarms };
  // await storeData(reminder);
  // navigation.navigate('Home');
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{t('AddReminder:newReminder')}</Text>
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

        {/* <Button title="Test" onPress={performTest} /> */}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.primaryBtn]}
            onPress={addEventClicked}>
            <Text style={{color: '#fff', fontSize: 16}}>
              {t('AddReminder:add')}
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
