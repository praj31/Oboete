import * as React from 'react';
import {View, Text, TextInput} from 'react-native';
import {globalStyles} from '../styles/global';
import {formStyles} from '../styles/form';
import {useTranslation} from 'react-i18next';

export default function Search() {
  const {t} = useTranslation();
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TextInput
          style={formStyles.searchbar}
          placeholder={t('SearchScreen:placeholder')}
          autoFocus
        />
      </View>
    </View>
  );
}
