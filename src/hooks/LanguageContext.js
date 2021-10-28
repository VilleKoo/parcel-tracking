import React, { useContext } from 'react';
import useLocalStorage from './useLocalStorage';

const LanguageContext = React.createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorage('language', 'FI');

  function changeLang(lang) {
    return setLanguage(lang);
  }

  return (
    <LanguageContext.Provider
      value={{ lang: language, changeLang: changeLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
