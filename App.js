import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddReminder from './screens/AddReminder';
import Upcoming from './screens/Upcoming';
import ListReminder from './screens/ListReminder';
import moment from 'moment';

import {clearAll} from './api/storage';

//for alarm
import ReactNativeAN from '@kaistseo/react-native-alarm-notification';
import {loadAlarmListeners} from './api/alarm';
import ToastManager from 'toastify-react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  moment.updateLocale('en', {
    calendar: {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      lastWeek: '[Last] dddd',
      nextWeek: '[Next] dddd',
      sameElse: 'LL',
    },
  });

  React.useEffect(() => {
    ReactNativeAN.stopAlarmSound();
    loadAlarmListeners();
  }, []);

  // to delete all alarms
  // clearAll()

  return (
    <NavigationContainer>
      <ToastManager />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddReminder"
          component={AddReminder}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Upcoming"
          component={Upcoming}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ListReminder"
          component={ListReminder}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
