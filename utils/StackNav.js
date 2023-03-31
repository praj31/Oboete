import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import ListReminder from '../screens/ListReminder';
import HomeScreen from '../screens/HomeScreen';
import Meta from '../screens/Meta';
import Search from '../screens/Search';
import LanguageModal from '../components/LanguageModal';
import EditReminder from '../screens/EditReminder';
import Upcoming from '../screens/Upcoming';
import {theme} from './theme';
import HeaderRight from '../components/HeaderRight';
import Archive from '../screens/Archive';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator();

const Navigator = ({children}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: theme.color.white,
        headerBackgroundContainerStyle: {
          backgroundColor: theme.color.white,
          height: 60,
        },
        headerStyle: {
          backgroundColor: theme.color.primary,
        },
        headerTitleAlign: 'left',
        headerTitleStyle: {
          color: theme.color.white,
          fontSize: 18,
        },
      }}>
      {children}
    </Stack.Navigator>
  );
};

const getCommon = Stack => {
  const {i18n, t} = useTranslation();
  const languageChange = lang => {
    i18n.changeLanguage(lang);
  };
  return [
    <Stack.Screen
      key="Settings"
      name="Settings"
      component={Settings}
      options={{
        headerTitle: t('Global:settings'),
        headerRight: () => {
          return <HeaderRight />;
        },
      }}
    />,
    <Stack.Screen
      key="Archive"
      name="Archive"
      component={Archive}
      options={{
        headerTitle: t('Global:archive'),
        headerRight: () => {
          return <HeaderRight />;
        },
      }}
    />,
    <Stack.Screen
      key="ListReminder"
      name="ListReminder"
      component={ListReminder}
      options={{
        headerTitle: t('ListReminder:reminderDetail'),
        headerRight: () => {
          return <HeaderRight />;
        },
      }}
    />,
    <Stack.Screen
      key="EditReminder"
      name="EditReminder"
      component={EditReminder}
      options={{
        headerTitle: t('AddReminder:editReminder'),
        headerRight: () => {
          return <HeaderRight />;
        },
      }}
    />,
  ];
};

export const TodayScreenNavigator = () => {
  const {i18n, t} = useTranslation();
  const common = getCommon(Stack);
  const languageChange = lang => {
    i18n.changeLanguage(lang);
  };
  return (
    <Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: t('Global:today'),
          headerRight: () => {
            return <HeaderRight />;
          },
        }}
      />
      {common}
    </Navigator>
  );
};

export const UpcomingScreenNavigator = () => {
  const {t} = useTranslation();
  const common = getCommon(Stack);
  const languageChange = lang => {
    i18n.changeLanguage(lang);
  };
  return (
    <Navigator>
      <Stack.Screen
        name="Upcoming"
        component={Upcoming}
        options={{
          headerTitle: t('Global:upcoming'),
          headerRight: () => {
            return <HeaderRight />;
          },
        }}
      />
      {common}
    </Navigator>
  );
};

export const MetaScreenNavigator = () => {
  const {t} = useTranslation();
  const common = getCommon(Stack);
  const languageChange = lang => {
    i18n.changeLanguage(lang);
  };
  return (
    <Navigator>
      <Stack.Screen
        name="Meta"
        component={Meta}
        options={{
          headerTitle: t('BottomNav:meta'),
          headerRight: () => {
            return <HeaderRight />;
          },
        }}
      />
      {common}
    </Navigator>
  );
};

export const SearchScreenNavigator = () => {
  const {t} = useTranslation();
  const common = getCommon(Stack);
  const languageChange = lang => {
    i18n.changeLanguage(lang);
  };
  return (
    <Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerTitle: t('BottomNav:search'),
          headerRight: () => {
            return <HeaderRight />;
          },
        }}
      />
      {common}
    </Navigator>
  );
};
