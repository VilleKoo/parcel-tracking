import React, { useContext } from 'react';
import useLocalStorage from './useLocalStorage';
const { ipcRenderer } = window.require('electron');

const EventsContext = React.createContext();

export function useEvents() {
  return useContext(EventsContext);
}

export function EventsProvider({ children }) {
  const [fetchedTime, setFetchedTime] = useLocalStorage('events', '');

  function setTime() {
    const event = new Date().toLocaleTimeString('fi-FI');
    return setFetchedTime(event);
  }

  return (
    <EventsContext.Provider value={{ time: fetchedTime, setTime: setTime }}>
      {children}
    </EventsContext.Provider>
  );
}
