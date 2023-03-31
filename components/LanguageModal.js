import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import { formStyles } from '../styles/form';
import { theme } from '../utils/theme';
import SettingsCard from './SettingsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LanguageModal({ languageChange }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(i18n.language || 'en'); // default language is English
  const [currentChosenLanguage, setCurrentChosenLanguage] = useState('en');

  const langFunc = async () => {
    const lang = await AsyncStorage.getItem('user-language');
    setCurrentChosenLanguage(lang);
  };

  useEffect(() => {
    langFunc();
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

  const { t } = useTranslation();

  return (
    <View style={{}}>
      <Pressable style={{ padding: 15 }} onPress={toggleModal}>
        <SettingsCard title={t('Global:changeLanguage')} />
      </Pressable>

      <Modal
        isVisible={isModalVisible}
        swipeDirection={'down'}
        onSwipeComplete={() => cancelButtonClick()}
        propagateSwipe={true}
        animationInTiming={300}
        animationOutTiming={300}
        onBackButtonPress={cancelButtonClick}
        style={{ margin: 0, justifyContent: 'flex-end' }}>
        <View
          style={{
            backgroundColor: theme.color.white,
            borderRadius: 24,
            height: '60%',
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginBottom: 16,
              marginTop: 12,
            }}>
            <View
              style={{
                width: 36,
                height: 8,
                backgroundColor: theme.color.gray,
                borderRadius: 12,
              }}></View>
          </View>

          <Text style={styles.header}>
            {t('LanguageSelectionScreen:title')}
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={true}
            style={{
              paddingHorizontal: 16,
              marginBottom: 12,
              height: '100%',
            }}>
            <TouchableOpacity
              onPress={() => changeLanguageFunc('en')}
              style={[
                formStyles.actionBtn,
                styles.button,
                currentChosenLanguage == 'en'
                  ? formStyles.primaryBtn
                  : formStyles.secondaryBtn,
              ]}>
              <Image
                style={styles.flagIcon}
                source={require('../assets/eng_flag.png')}
              />
              <Text
                style={[
                  styles.buttonText,
                  currentChosenLanguage == 'en'
                    ? formStyles.fontWhite
                    : formStyles.fontBlack,
                ]}>
                {t('LanguageSelectionScreen:en')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeLanguageFunc('fr')}
              style={[
                formStyles.actionBtn,
                styles.button,
                currentChosenLanguage == 'fr'
                  ? formStyles.primaryBtn
                  : formStyles.secondaryBtn,
              ]}>
              <Image
                style={styles.flagIcon}
                source={require('../assets/france_flag.png')}
              />
              <Text
                style={[
                  styles.buttonText,
                  currentChosenLanguage == 'fr'
                    ? formStyles.fontWhite
                    : formStyles.fontBlack,
                ]}>
                {t('LanguageSelectionScreen:fr')}
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={{ paddingHorizontal: 16 }}>
            <View style={styles.footer}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[formStyles.actionBtn, formStyles.primaryBtn]}
                  onPress={saveButtonClick}>
                  <Text style={{ color: theme.color.white }}>
                    {t('LanguageSelectionScreen:save')}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[formStyles.actionBtn, formStyles.secondaryBtn]}
                  onPress={cancelButtonClick}>
                  <Text style={{ color: theme.color.black }}>
                    {t('LanguageSelectionScreen:cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  flagIcon: {
    width: 40,
    height: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,

    borderRadius: 10,
    marginBottom: 15,
  },

  buttonText: {
    fontSize: 18,
    marginLeft: 10,
  },
  footer: {
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

  header: {
    top: 15,

    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 60,
    textAlign: 'center',
    color: '#111',
  },
});
export default LanguageModal;
