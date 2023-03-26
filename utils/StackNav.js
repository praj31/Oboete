import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import ListReminder from '../screens/ListReminder';
import HomeScreen from '../screens/HomeScreen';
import LanguageModal from '../components/LanguageModal';
import EditReminder from '../screens/EditReminder';
import Upcoming from '../screens/Upcoming';
import ArchiveScreen from '../screens/ArchiveScreen';

const Stack = createNativeStackNavigator();

export const TodayScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ListReminder" component={ListReminder} />
      <Stack.Screen name="EditReminder" component={EditReminder} />
      
    </Stack.Navigator>
  );
};

export const UpcomingScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Upcoming" component={Upcoming} />
      <Stack.Screen name="ListReminder" component={ListReminder} />
      <Stack.Screen name="EditReminder" component={EditReminder} />
    </Stack.Navigator>
  );
};
export const ArchiveScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ArchiveScreen1" component={ArchiveScreen} />
      <Stack.Screen name="ListReminder" component={ListReminder} />
      <Stack.Screen name="EditReminder" component={EditReminder} />
      
    </Stack.Navigator>
  );
};