import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

export default function TabNavigation({navigation, screenName}) {
  const {t} = useTranslation();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={screenName === 'today' ? styles.activeButton : styles.button}
        onPress={() => {
          navigation.navigate('Today');
        }}>
        <Text
          style={
            screenName === 'today' ? styles.activeButtonText : styles.buttonText
          }>
          {t('HomeScreen:today')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={screenName === 'upcoming' ? styles.activeButton : styles.button}
        onPress={() => {
          navigation.navigate('UpcomingScreen');
        }}>
        <Text
          style={
            screenName === 'upcoming'
              ? styles.activeButtonText
              : styles.buttonText
          }>
          {t('HomeScreen:upcoming')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginBottom: 15,
  },
  activeButton: {
    flex: 1,
    padding: 8,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  activeButtonText: {
    color: '#f7f7f7',
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
  },

  button: {
    flex: 1,
    padding: 8,
    // backgroundColor: '#f7f7f7',
    borderRadius: 8,
  },
  buttonText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
  },
});
