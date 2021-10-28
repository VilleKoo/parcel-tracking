import React, { useContext } from 'react';
import useLocalStorage from './useLocalStorage';

const LastFetchedContext = React.createContext();

export function useLastFetched() {
  return useContext(LastFetchedContext);
}

export function LastFetchedProvider({ children }) {
  const [fetchedTime, setFetchedTime] = useLocalStorage('lastFetched', '');

  function setTime() {
    const event = new Date().toLocaleTimeString('fi-FI');
    return setFetchedTime(event);
  }

  return (
    <LastFetchedContext.Provider
      value={{ time: fetchedTime, setTime: setTime }}
    >
      {children}
    </LastFetchedContext.Provider>
  );
}
