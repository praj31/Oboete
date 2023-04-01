import * as React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'react-native';
import moment from 'moment';
import { getAllKeys } from './api/storage';

import { clearAll } from './api/storage';

import './constants/DCSLocalize';

//for alarm
import ReactNativeAN from '@kaistseo/react-native-alarm-notification';
import { loadAlarmListeners } from './api/alarm';
// import ToastManager from 'toastify-react-native';

import EditReminder from './screens/EditReminder';
import { WithSplashScreen } from './screens/Splash';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LanguageModal from './components/LanguageModal';
import { useTranslation } from 'react-i18next';
import {
  UpcomingScreenNavigator,
  TodayScreenNavigator,
  MetaScreenNavigator,
  SearchScreenNavigator,
  AddScreenNavigator,
} from './utils/StackNav';
import { theme } from './utils/theme';
import HeaderRight from './components/HeaderRight';

import { AlertNotificationRoot } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  AsyncStorage.getItem('user-language', (_, lang) => {
    if (lang === 'fr') {
      moment.updateLocale('fr', {
        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact: true,
        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysParseExact: true,
        calendar: {
          lastDay: '[Hier à]',
          sameDay: '[Aujourd’hui à]',
          nextDay: '[Demain à]',
          lastWeek: 'dddd [dernier à]',
          nextWeek: 'dddd [à]',
          sameElse: 'LL',
        },
      });
    } else {
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
    }
  })

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

  LogBox.ignoreLogs(['Warning: ...']);

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <AlertNotificationRoot theme="light">
        <NavigationContainer>
          <StatusBar
            backgroundColor={theme.color.primary}
            barStyle="light-content"
          />

          <Tab.Navigator
            screenOptions={{
              headerShadowVisible: false,
              headerBackgroundContainerStyle: {
                backgroundColor: theme.color.white,
                height: 60,
              },
              headerStyle: {
                backgroundColor: theme.color.primary,
              },
              headerTitleAlign: 'left',
              headerTintColor: theme.color.white,
              headerTitleStyle: {
                color: theme.color.white,
                fontSize: 18,
              },
              headerRightContainerStyle: {
                paddingRight: 16,
              },
              headerRight: () => {
                return <HeaderRight />;
              },
              unmountOnBlur: true,
              tabBarStyle: {
                paddingBottom: 12,
                height: 64,
                elevation: 0,
                borderTopColor: theme.color.border,
              },
              tabBarInactiveTintColor: theme.color.gray,
              tabBarActiveTintColor: theme.color.primary,
            }}>
            <Tab.Screen
              name="Today"
              component={TodayScreenNavigator}
              options={{
                headerShown: false,
                tabBarLabel: t('BottomNav:today'),
                tabBarIcon: ({ focused, color }) => {
                  let iconName = focused ? 'today' : 'today-outline';
                  return <Icon color={color} name={iconName} size={24} />;
                },
              }}
            />
            <Tab.Screen
              name="UpcomingScreen"
              component={UpcomingScreenNavigator}
              options={{
                headerShown: false,
                tabBarLabel: t('BottomNav:upcoming'),
                tabBarIcon: ({ focused, color }) => {
                  let iconName = focused ? 'calendar' : 'calendar-outline';
                  return <Icon color={color} name={iconName} size={24} />;
                },
              }}
            />
            <Tab.Screen
              name="AddReminderScreen"
              component={AddScreenNavigator}
              options={{
                headerShown: false,
                tabBarLabel: t('BottomNav:newEvent'),
                tabBarIcon: ({ focused, color }) => {
                  let iconName = focused ? 'add-circle' : 'add-circle-outline';
                  return <Icon color={color} name={iconName} size={28} />;
                },
              }}
            />

            <Tab.Screen
              name="MetaScreen"
              component={MetaScreenNavigator}
              options={{
                headerShown: false,
                tabBarLabel: t('BottomNav:meta'),
                tabBarIcon: ({ focused, color }) => {
                  let iconName = focused ? 'alarm' : 'alarm-outline';
                  return <Icon color={color} name={iconName} size={28} />;
                },
              }}
            />
            <Tab.Screen
              name="SearchScreen"
              component={SearchScreenNavigator}
              options={{
                headerShown: false,
                tabBarLabel: t('BottomNav:search'),
                tabBarIcon: ({ focused, color }) => {
                  let iconName = focused ? 'search' : 'search-outline';
                  return <Icon color={color} name={iconName} size={28} />;
                },
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AlertNotificationRoot>
    </WithSplashScreen>
  );
}
