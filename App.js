import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddReminder from './screens/AddReminder';
import Upcoming from './screens/Upcoming';
import ListReminder from './screens/ListReminder';
import moment from 'moment';
import { getAllKeys } from './api/storage';

//for alarm
import ReactNativeAN from '@kaistseo/react-native-alarm-notification';
import { loadAlarmListeners } from './api/alarm';
import ToastManager from 'toastify-react-native';
import EditReminder from './screens/EditReminder';
import { WithSplashScreen } from './screens/Splash';

const Stack = createNativeStackNavigator();

export default function App() {
  moment.updateLocale('en', {
    calendar: {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      lastWeek: '[Last] dddd',
      nextWeek: 'dddd',
      sameElse: 'LL',
    },
  });
  const [isAppReady, setIsAppReady] = React.useState(false);
  React.useEffect(() => {
    ReactNativeAN.stopAlarmSound();
    loadAlarmListeners();
    setIsAppReady(true);
    async function getAll() {
      const all = ReactNativeAN.getScheduledAlarms()
      // const all = await getAllKeys()
      console.log("All--", all);
    }
    getAll()
  }, []);


  // React.useEffect(() => {
  //   initialize().then((context) => {
  //     store.current = context.store;
  //     queryClient.current = context.queryClient;

  //     setIsAppReady(true);
  //   });
  // }, []);

  // to delete all alarms
  // clearAll();

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <NavigationContainer>
        <ToastManager position="bottom" />
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditReminder"
            component={EditReminder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Upcoming"
            component={Upcoming}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ListReminder"
            component={ListReminder}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WithSplashScreen>
  );
}
