import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import ListReminder from '../screens/ListReminder';
import HomeScreen from '../screens/HomeScreen';
import LanguageModal from '../components/LanguageModal';
import EditReminder from '../screens/EditReminder';
import Upcoming from '../screens/Upcoming';
import { theme } from './theme';
import { Text } from 'react-native'
import { changeLanguage } from 'i18next';

const Stack = createNativeStackNavigator();

export const TodayScreenNavigator = () => {
  const { t } = useTranslation()
  const languageChange = lang => {
    i18n.changeLanguage(lang);
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: theme.color.white,
        headerBackgroundContainerStyle: {
          backgroundColor: theme.color.white,
          height: 60
        },
        headerStyle: {
          backgroundColor: theme.color.primary,
        },
        headerTitleAlign: 'left',
        headerTitleStyle: {
          color: theme.color.white,
          fontSize: 18
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
        headerTitle: t("Global:today"),
        headerRight: () => {
          return <LanguageModal languageChange={changeLanguage} />
        }
      }} />
      <Stack.Screen name="ListReminder" component={ListReminder} options={{
        headerTitle: t("ListReminder:reminderDetail"),
        headerRight: () => {
          return <LanguageModal languageChange={changeLanguage} />
        }
      }} />
      <Stack.Screen name="EditReminder" component={EditReminder} options={{
        headerTitle: t("AddReminder:editReminder"),
        headerRight: () => {
          return <LanguageModal languageChange={changeLanguage} />
        }
      }} />
    </Stack.Navigator>
  );
};

export const UpcomingScreenNavigator = () => {
  const { t } = useTranslation()
  const languageChange = lang => {
    i18n.changeLanguage(lang);
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerBackgroundContainerStyle: {
          backgroundColor: theme.color.white,
          height: 60
        },
        headerStyle: {
          backgroundColor: theme.color.primary,
        },
        headerTintColor: theme.color.white,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          color: theme.color.white,
          fontSize: 18
        },
      }}>
      <Stack.Screen name="Upcoming" component={Upcoming} options={{
        headerTitle: t("Global:upcoming"),
        headerRight: () => {
          return <LanguageModal languageChange={changeLanguage} />
        }
      }} />
      <Stack.Screen name="ListReminder" component={ListReminder} options={{
        headerTitle: t("ListReminder:reminderDetail"),
        headerRight: () => {
          return <LanguageModal languageChange={changeLanguage} />
        }
      }} />
      <Stack.Screen name="EditReminder" component={EditReminder} options={{
        headerTitle: t("AddReminder:editReminder"),
        headerRight: () => {
          return <LanguageModal languageChange={changeLanguage} />
        }
      }} />
    </Stack.Navigator>
  );
};
