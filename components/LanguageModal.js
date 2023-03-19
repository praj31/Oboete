import Modal from 'react-native-modal';

import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Animated,
  Button,
} from 'react-native';

import EnglishContent from '../translations/en/LanguageSelectionScreen';
import FrenchContent from '../translations/fr/LanguageSelectionScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

function LanguageModal({languageChange}) {
  const {i18n} = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);

  const [language, setLanguage] = useState(i18n.language || 'en'); // default language is English
  const [currentChosenLanguage, setCurrentChosenLanguage] = useState('en');
  const [fadeInAnim, setFadeInAnim] = useState(new Animated.Value(1));

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const langFunc = async () => {
    const lang = await AsyncStorage.getItem('user-language');
    setCurrentChosenLanguage(lang);
  };

  useEffect(() => {
    langFunc();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeInAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setLanguage(lang => (lang === 'en' ? 'fr' : 'en')); // toggle between English and French
        Animated.timing(fadeInAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const getText = () => {
    if (language === 'en') {
      return EnglishContent;
    } else {
      return FrenchContent;
    }
  };

  const changeLanguageFunc = lang => {
    setCurrentChosenLanguage(lang);
  };

  const saveButtonClick = () => {
    languageChange(currentChosenLanguage);
    setModalVisible(!isModalVisible);
  };

  const cancelButtonClick = () => {
    langFunc();
    setModalVisible(!isModalVisible);
  };

  const {t} = useTranslation();

  return (
    <View style={{flex: 1}}>
      <Pressable>
        <TouchableOpacity
          style={{backgroundColor: '#333', padding: 10, borderRadius: 8}}
          onPress={toggleModal}>
          <Text style={{color: '#fff'}}>{t('Global:changeLanguage')}</Text>
        </TouchableOpacity>
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
            maxHeight: 400,
            borderRadius: 12,
          }}>
          <View style={styles.container}>
            <Animated.Text style={[styles.header, {opacity: fadeInAnim}]}>
              {getText().title}
            </Animated.Text>
            <TouchableOpacity
              onPress={() => changeLanguageFunc('en')}
              style={
                currentChosenLanguage == 'en'
                  ? styles.activeButton
                  : styles.button
              }>
              <Image
                style={styles.flagIcon}
                source={require('../assets/eng_flag.png')}
              />
              <Animated.Text style={[styles.buttonText, {opacity: fadeInAnim}]}>
                {getText().en}
              </Animated.Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeLanguageFunc('fr')}
              style={
                currentChosenLanguage == 'fr'
                  ? styles.activeButton
                  : styles.button
              }>
              <Image
                style={styles.flagIcon}
                source={require('../assets/france_flag.png')}
              />
              <Animated.Text style={[styles.buttonText, {opacity: fadeInAnim}]}>
                {getText().fr}
              </Animated.Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.primaryBtn]}
                onPress={saveButtonClick}>
                <Text style={{color: '#fff', fontSize: 16}}>
                  {getText().save}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.secondaryBtn]}
                onPress={cancelButtonClick}>
                <Text style={{fontSize: 16, color: '#111'}}>
                  {getText().cancel}
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
    backgroundColor: '#EEDD82',
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
    position: 'absolute',
    width: '100%',
    bottom: 10,
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
});
export default LanguageModal;
