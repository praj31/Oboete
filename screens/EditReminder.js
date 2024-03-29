import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';
import {getData, storeData} from '../api/storage';
import {checkAlarmValidity, updateAlarms} from '../api/alarm';
import {checkNotificationPermissionFunc} from '../api/notification';
import {displayAlert, displayToast} from '../api/toast';
import {useTranslation} from 'react-i18next';
import SoundModal from '../components/SoundModal';
import {formStyles} from '../styles/form';
import {globalStyles} from '../styles/global';
import {theme} from '../utils/theme';
import AlarmTypeModal from '../components/AlarmTypeModal';
import IntervalModal from '../components/IntervalModal';
import RepeatModal from '../components/RepeatModal';

export default function EditReminder(props) {
  moment.tz.setDefault();

  const {t} = useTranslation();
  const [title, setTitle] = React.useState('');
  const [note, setNote] = React.useState('');
  const [date, setDate] = React.useState(moment().toDate());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [interval, setInterval] = React.useState('0');
  const [repeat, setRepeat] = React.useState('0');
  const [alarmType, setAlarmType] = React.useState('');

  const [selectedSound, setSelectedSound] = React.useState('sound1.mp3');
  const [chosenSound, setChosenSound] = React.useState(
    selectedSound || 'sound1.mp3',
  );

  const [_, setReminder] = React.useState({});
  const navigation = props.navigation;
  const id = props.route.params.id;

  React.useEffect(() => {
    async function fetchData() {
      let reminder = await getData(id);
      if (reminder) {
        setTitle(reminder.title);
        setNote(reminder.note);
        setInterval(reminder.interval.toString());
        setRepeat(reminder.repeat.toString());
        setDate(new Date(moment(reminder.datetime, 'YYYY-MM-DD LT')));
        setAlarmType(reminder.alarmType);
        setReminder(reminder);
        setSelectedSound(reminder.sound_name || 'sound1.mp3');
        setChosenSound(reminder.sound_name || 'sound1.mp3');
      } else {
        displayAlert(
          'error',
          t('Global:error'),
          'Error in fetching the event data',
          t('Global:close'),
        );
        navigation.goBack();
      }
    }
    fetchData();
  }, [id]);

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
          note: note,
          alarmType,
          sound_name: selectedSound,
        };
        if (moment(date) <= moment()) {
          return displayAlert(
            'error',
            t('Global:error'),
            t('AddReminder:pastTimeAlert'),
            t('Global:close'),
          );
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
            const {key} = await storeData(reminder);
            displayToast(
              'success',
              t('Global:success'),
              t('Global:reminderModified'),
            );
            navigation.navigate('ListReminder', {id: key});
          } catch (err) {
            console.log(err);
            // alert(err);
          }
        } else {
          return displayAlert(
            'error',
            t('Global:error'),
            t('AddReminder:alarmConflictAlert'),
            t('Global:close'),
          );
        }
      } else {
        displayAlert(
          'error',
          t('Global:error'),
          t('AddReminder:allFieldError'),
          t('Global:close'),
        );
      }
    }
  };

  // React.useEffect(() => {
  //   if (alarmType === 'Meta') {
  //     setInterval('0');
  //     setRepeat('0');
  //   }
  // }, [alarmType]);

  return (
    <View style={globalStyles.container}>
      <View style={{marginBottom: 32}}></View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{height: '100%'}}>
        <View style={globalStyles.inner}>
          <Text style={formStyles.label}>{t('AddReminder:eventTitle')}</Text>
          <TextInput
            autoFocus
            value={title}
            style={formStyles.textinput}
            onChangeText={setTitle}
            maxLength={40}
          />
          <Text style={formStyles.label}>
            {t('AddReminder:eventDescription')}
          </Text>
          <TextInput
            value={note}
            style={formStyles.textinput}
            onChangeText={setNote}
            maxLength={140}
          />
          <Text style={formStyles.label}>{t('AddReminder:eventDate')}</Text>
          <Pressable onPress={() => setShowDatePicker(!showDatePicker)}>
            <TextInput
              autoFocus={true}
              autoCapitalize="sentences"
              style={formStyles.textinput}
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
          <Text style={formStyles.label}>{t('AddReminder:eventTime')}</Text>
          <Pressable onPress={() => setShowTimePicker(!showTimePicker)}>
            <TextInput
              style={formStyles.textinput}
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
            <IntervalModal interval={interval} setInterval={setInterval} />
            <RepeatModal repeat={repeat} setRepeat={setRepeat} />
          </View>
          <AlarmTypeModal alarmType={alarmType} setAlarmType={setAlarmType} />
          <SoundModal
            chosenSound={chosenSound}
            setChosenSound={setChosenSound}
            selectedSound={selectedSound}
            setSelectedSound={setSelectedSound}
          />
          <View>
            <TouchableOpacity
              style={[formStyles.actionBtn, formStyles.primaryBtn]}
              onPress={editButtonClicked}>
              <Text style={{color: theme.color.white}}>
                {t('AddReminder:update')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  selectBtn: {
    marginVertical: 12,
    alignItems: 'flex-start',
  },
  baseFont: {
    fontSize: 16,
  },
  smallFont: {
    marginVertical: 6,
    fontSize: 12,
  },
  fontWhite: {
    color: '#fff',
  },
  fontBlack: {
    color: '#333',
  },
  whiteSpace: {
    marginBottom: 60,
  },
});
