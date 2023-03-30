import * as React from 'react';
import {View, Text} from 'react-native';
import {globalStyles} from '../styles/global';
import {generateGreetings} from '../utils/greeting';
import {theme} from '../utils/theme';
import {useTranslation} from 'react-i18next';

export default function Meta() {
  const {t} = useTranslation();
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.greetings}>
          {t(`Greetings:${generateGreetings()}`)}
        </Text>
        <Text
          style={{
            color: theme.color.white,
            marginTop: 12,
            marginLeft: 16,
            opacity: 0.9,
          }}>
          Reminders about reminders.
        </Text>
      </View>
    </View>
  );
}
