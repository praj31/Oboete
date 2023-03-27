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
import { storeData } from '../api/storage';
import { setupAlarms } from '../api/alarm';
import { checkNotificationPermissionFunc } from '../api/notification';
import { displayToast } from '../api/toast';
import { useTranslation } from 'react-i18next';
import SoundModal from '../components/SoundModal';
import { useIsFocused } from '@react-navigation/native';
import { globalStyles } from '../styles/global';
import { formStyles } from '../styles/form';
import { theme } from '../utils/theme';

export default function AddReminder({ navigation }) {
  moment.tz.setDefault();
  const [title, setTitle] = React.useState('');
  const [note, setNote] = React.useState('');
  const [date, setDate] = React.useState(moment().toDate());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [interval, setInterval] = React.useState('0');
  const [repeat, setRepeat] = React.useState('0');
  const [alarmType, setAlarmType] = React.useState('One-time');
  const [showAlarmTypePicker, setShowAlarmTypePicker] = React.useState(false);

  const [selectedSound, setSelectedSound] = React.useState('sound1.mp3');
  const [chosenSound, setChosenSound] = React.useState(
    selectedSound || 'sound1.mp3',
  );

  const { t } = useTranslation();

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
          reminder = { ...reminder, alarms };
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

  return (
    <View style={globalStyles.container}>
      <View style={{ marginBottom: 32 }}>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ height: '100%' }}>
        <View style={globalStyles.inner}>
          <Text style={formStyles.label}>{t('AddReminder:eventTitle')}</Text>
          <TextInput
            value={title}
            style={formStyles.textinput}
            onChangeText={setTitle}
            maxLength={40}
          />
          <Text style={formStyles.label}>{t('AddReminder:eventDescription')}</Text>
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: 4 }}>
              <Text style={formStyles.label}>{t('AddReminder:interval')}</Text>
              <TextInput
                value={interval}
                style={formStyles.textinput}
                keyboardType="numeric"
                onChangeText={setInterval}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 4 }}>
              <Text style={formStyles.label}>{t('AddReminder:repeat')}</Text>
              <TextInput
                value={repeat}
                inputMode="numeric"
                style={formStyles.textinput}
                keyboardType="numeric"
                onChangeText={setRepeat}
              />
            </View>
          </View>
          <Text style={formStyles.label}>{t('AddReminder:alarmType')}</Text>
          <Pressable onPress={() => setShowAlarmTypePicker(!showAlarmTypePicker)}>
            <TextInput
              value={alarmType}
              style={formStyles.textinput}
              editable={false}
            />
          </Pressable>
          {showAlarmTypePicker && (
            <Modal
              visible={showAlarmTypePicker}
              onRequestClose={() => {
                setShowAlarmTypePicker(!showAlarmTypePicker);
              }}>
              <ScrollView
                style={{
                  padding: 24,
                  marginTop: 32,
                  width: '100%',
                }}>
                <Text style={{ fontSize: 18, marginBottom: 20 }}>
                  {t('AddReminder:selectAlarmType')}
                </Text>
                <Pressable
                  style={[
                    formStyles.actionBtn,
                    alarmType === 'One-time'
                      ? formStyles.primaryBtn
                      : formStyles.secondaryBtn,
                    formStyles.selectBtn,
                  ]}
                  onPress={() => {
                    setAlarmType('One-time');
                    setShowAlarmTypePicker(!showAlarmTypePicker);
                  }}>
                  <Text
                    style={[
                      alarmType === 'One-time'
                        ? [formStyles.baseFont, formStyles.fontWhite]
                        : [formStyles.baseFont, formStyles.fontBlack],
                    ]}>
                    {t('AddReminder:oneTime')}
                  </Text>
                  <Text
                    style={[
                      alarmType === 'One-time'
                        ? [formStyles.smallFont, formStyles.fontWhite]
                        : [formStyles.smallFont, formStyles.fontBlack],
                    ]}>
                    {t('AddReminder:oneTimeDescription')}
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    formStyles.actionBtn,
                    alarmType === 'Meta'
                      ? formStyles.primaryBtn
                      : formStyles.secondaryBtn,
                    formStyles.selectBtn,
                  ]}
                  onPress={() => {
                    setAlarmType('Meta');
                    setShowAlarmTypePicker(!showAlarmTypePicker);
                  }}>
                  <Text
                    style={[
                      alarmType === 'Meta'
                        ? [formStyles.baseFont, formStyles.fontWhite]
                        : [formStyles.baseFont, formStyles.fontBlack],
                    ]}>
                    {t('AddReminder:meta')}
                  </Text>
                  <Text
                    style={[
                      alarmType === 'Meta'
                        ? [formStyles.smallFont, formStyles.fontWhite]
                        : [formStyles.smallFont, formStyles.fontBlack],
                    ]}>
                    {t('AddReminder:metaDescription')}
                  </Text>
                </Pressable>
              </ScrollView>
            </Modal>
          )}
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
              <Text style={{ color: theme.color.white }}>
                {t('AddReminder:add')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView >
    </View>
  )
}