import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import SoundCard from './SoundCard';
import { formStyles } from '../styles/form';

const Sound = require('react-native-sound');
Sound.setCategory('Playback');

function SoundModal({
  chosenSound,
  setChosenSound,
  selectedSound,
  setSelectedSound,
}) {
  const { t } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  // const [selectedSound, setSelectedSound] = useState('sound1');
  // const [chosenSound, setChosenSound] = useState(selectedSound || 'sound1');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const saveButtonClick = () => {
    toggleModal();
    setSelectedSound(chosenSound);
  };

  const cancelButtonClick = () => {
    toggleModal();
    setChosenSound(selectedSound);
  };

  let audioArray = [];

  const soundList = [
    {
      name: 'Sound 1',
      id: 1,
      url: 'sound1.mp3',
    },
    {
      name: 'Sound 2',
      id: 2,
      url: 'sound2.mp3',
    },
    {
      name: 'Sound 3',
      id: 3,
      url: 'sound3.mp3',
    },
    {
      name: 'Sound 4',
      id: 4,
      url: 'sound4.mp3',
    },
  ];

  // audioArray = soundList.map(sound => {
  //   return new Sound(sound.url, Sound.MAIN_BUNDLE, error => {
  //     if (error) {
  //       console.log('failed to load the sound', error);
  //     }
  //   });
  // });

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={toggleModal}>
        <Text style={formStyles.label}>{t('AddReminder:alarmSound')}</Text>
        <TextInput
          value={selectedSound}
          style={formStyles.textinput}
          editable={false}
        />
      </Pressable>

      <Modal
        isVisible={isModalVisible}
        animationInTiming={500}
        animationOutTiming={600}
        onBackButtonPress={cancelButtonClick}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            // maxHeight: 400,
            borderRadius: 12,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={true}
            style={{ height: '80%', padding: 12 }}>
            {soundList.map((sound, index) => {
              return (
                <TouchableOpacity key={sound.id}>
                  <SoundCard
                    sound={sound}
                    index={index}
                    selectedSound={selectedSound}
                    setSelectedSound={setSelectedSound}
                    chosenSound={chosenSound}
                    setChosenSound={setChosenSound}
                  // audioArray={audioArray}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.primaryBtn]}
                onPress={saveButtonClick}>
                <Text style={{ color: '#fff', fontSize: 16 }}>
                  {t('Global:save')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.secondaryBtn]}
                onPress={cancelButtonClick}>
                <Text style={{ fontSize: 16, color: '#111' }}>
                  {t('Global:cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 50,
    // justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#111',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    marginBottom: 10,
  },

  activeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'teal',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#111',
  },
  flagIcon: {
    width: 40,
    height: 30,
  },

  footer: {
    // position: 'absolute',
    width: '100%',
    bottom: 10,
    // margin: 24,
    padding: 20,
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
});
export default SoundModal;
