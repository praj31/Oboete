import * as React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddReminder from './screens/AddReminder';
import Upcoming from './screens/Upcoming';
import ListReminder from './screens/ListReminder';
import { StatusBar } from 'react-native';
import moment from 'moment';
import { getAllKeys } from './api/storage';

import { clearAll } from './api/storage';

import './constants/DCSLocalize';

//for alarm
import ReactNativeAN from '@kaistseo/react-native-alarm-notification';
import { loadAlarmListeners } from './api/alarm';
import ToastManager from 'toastify-react-native';
import EditReminder from './screens/EditReminder';
import { WithSplashScreen } from './screens/Splash';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LanguageModal from './components/LanguageModal';
import { useTranslation } from 'react-i18next';
import { UpcomingScreenNavigator, TodayScreenNavigator } from './utils/StackNav';
import { theme } from './utils/theme';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

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
  const { i18n, t } = useTranslation();
  React.useEffect(() => {
    ReactNativeAN.stopAlarmSound();
    loadAlarmListeners();
    setIsAppReady(true);
    async function getAll() {
      const all = ReactNativeAN.getScheduledAlarms();
      // const all = await getAllKeys()
      console.log('All--', all);
    }
    // getAll();
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
  const languageChange = lang => {
    i18n.changeLanguage(lang);
  };
  LogBox.ignoreLogs(['Warning: ...']);

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={theme.color.primary}
          barStyle="light-content"
        />
        <ToastManager position="bottom" />
        <Tab.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerBackgroundContainerStyle: {
              backgroundColor: theme.color.white,
              height: 60
            },
            headerStyle: {
              backgroundColor: theme.color.primary,
            },
            headerTitleAlign: 'left',
            headerTintColor: theme.color.white,
            headerTitleStyle: {
              color: theme.color.white,
              fontSize: 18
            },
            headerRightContainerStyle: {
              paddingRight: 16
            },
            headerRight: () => {
              return <LanguageModal languageChange={languageChange} />;
            },
            tabBarShowLabel: false,
            unmountOnBlur: true,
            tabBarStyle: { paddingBottom: 6, height: 60, elevation: 0, borderTopColor: '#dcdcdc' },
            tabBarInactiveTintColor: theme.color.gray,
            tabBarActiveTintColor: theme.color.primary,
          }}>
          <Tab.Screen
            name="Today"
            component={TodayScreenNavigator}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color }) => {
                let iconName = focused ? 'today' : 'today-outline';
                return <Icon color={color} name={iconName} size={24} />;
              },
            }}
          />
          <Tab.Screen
            name="AddReminder"
            component={AddReminder}
            options={{
              headerTitle: t("Global:addReminder"),
              statusBarColor: theme.color.primary,
              tabBarIcon: ({ focused, color }) => {
                let iconName = focused ? 'add-circle' : 'add-circle-outline';
                return <Icon color={color} name={iconName} size={36} />;
              },
            }}
          />
          <Tab.Screen
            name="UpcomingScreen"
            component={UpcomingScreenNavigator}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color }) => {
                let iconName = focused ? 'calendar' : 'calendar-outline';
                return <Icon color={color} name={iconName} size={24} />;
              },
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </WithSplashScreen>
  );
}
