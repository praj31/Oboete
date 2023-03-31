import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';
import {storeData} from '../api/storage';
import {setupAlarms} from '../api/alarm';
import {checkNotificationPermissionFunc} from '../api/notification';
import {displayToast} from '../api/toast';
import {useTranslation} from 'react-i18next';
import SoundModal from '../components/SoundModal';
import {useIsFocused} from '@react-navigation/native';
import {globalStyles} from '../styles/global';
import {formStyles} from '../styles/form';
import {theme} from '../utils/theme';
import AlarmTypeModal from '../components/AlarmTypeModal';
import IntervalModal from '../components/intervalModal';
import RepeatModal from '../components/RepeatModal';

export default function AddReminder({navigation}) {
  moment.tz.setDefault();
  const [title, setTitle] = React.useState('');
  const [note, setNote] = React.useState('');
  const [date, setDate] = React.useState(moment().toDate());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [interval, setInterval] = React.useState('0');
  const [repeat, setRepeat] = React.useState('0');
  const [alarmType, setAlarmType] = React.useState('One-time');

  const [selectedSound, setSelectedSound] = React.useState('sound1.mp3');
  const [chosenSound, setChosenSound] = React.useState(
    selectedSound || 'sound1.mp3',
  );

  const {t} = useTranslation();

  const isFocused = useIsFocused();

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
          note: note,
          sound_name: selectedSound,
          alarmType,
        };
        console.log(reminder);
        if (moment(date) <= moment()) {
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
          // displayToast('success', t('Global:reminderAdded'));
          navigation.goBack();
        } catch (err) {
          alert(err);
        }
      } else {
        alert(t('AddReminder:allFieldError'));
      }
    }
  };

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
              onPress={addEventClicked}>
              <Text style={{color: theme.color.white}}>
                {t('AddReminder:add')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
