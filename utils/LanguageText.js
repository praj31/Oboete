import {useTranslation} from 'react-i18next';
export const LanguageText = (screen, word) => {
  const {t} = useTranslation();
  let path = `${screen}:${word}`;
  console.log(path);
  return t(path);
};
