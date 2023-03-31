import * as React from 'react';
import {Pressable, View} from 'react-native';
import {globalStyles} from '../styles/global';
import SettingsCard from '../components/SettingsCard';
import {useTranslation} from 'react-i18next';
import LanguageModal from '../components/LanguageModal';

export default function Settings() {
  const {i18n, t} = useTranslation();

  const languageChange = lang => {
    i18n.changeLanguage(lang);
  };

  return (
    <View>
      <LanguageModal languageChange={languageChange} />
    </View>
  );
}
