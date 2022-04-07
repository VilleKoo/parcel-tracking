import React, { useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { translations } from '../utils/constants';

const AppContext = React.createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [language, setLanguage] = useLocalStorage('language', 'FI');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = translations.appTitle[language];
  });

  function setLoadingState(val) {
    return setIsLoading(val);
  }

  function changeLang(lang) {
    return setLanguage(lang);
  }

  return (
    <AppContext.Provider
      value={{
        lang: language,
        isLoading: isLoading,
        changeLang: changeLang,
        setLoadingState: setLoadingState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
