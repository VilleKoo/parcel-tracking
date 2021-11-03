import React, { useContext, useState } from 'react';
import useLocalStorage from './useLocalStorage';

const LanguageContext = React.createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorage('language', 'FI');
  const [isLoading, setIsLoading] = useState(false);

  function setLoadingState(val) {
    return setIsLoading(val);
  }

  function changeLang(lang) {
    return setLanguage(lang);
  }

  return (
    <LanguageContext.Provider
      value={{
        lang: language,
        isLoading: isLoading,
        changeLang: changeLang,
        setLoadingState: setLoadingState,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
