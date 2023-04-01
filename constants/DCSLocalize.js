import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import { getLanguages } from 'react-native-i18n';
import LANGUAGES from '../translations';
import moment from 'moment';

const LANG_CODES = Object.keys(LANGUAGES);

let System_language = '';

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('user-language', async (err, language) => {
      await getLanguages().then(languages => {
        System_language =
          (languages && languages[0].substring(0, 2) == 'fr'
            ? 'fr'
            : languages[0].substring(0, 2) == 'en'
              ? 'en'
              : 'en') || 'en';
      });
      if (err || !language) {
        if (err) {
          console.log('Error fetching Languages from asyncstorage ', err);
        } else {
          console.log('No language is set, choosing English as fallback');
        }
        const findBestAvailableLanguage =
          RNLocalize.findBestAvailableLanguage(LANG_CODES);
        // callback(findBestAvailableLanguage.languageTag || 'fr');
        callback(System_language || 'en');
        AsyncStorage.setItem('user-language', System_language || 'en');
        return;
      }
      callback(language);
      AsyncStorage.setItem('user-language', language);
    });
  },
  init: () => { },
  cacheUserLanguage: language => {
    AsyncStorage.setItem('user-language', language);
  },
};
i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: LANGUAGES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });
