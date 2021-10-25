import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import ParcelEvents from './components/ParcelEvents';
import TitleBar from './components/TitleBar';
import Offline from './components/Offline';
import useNetwork from './hooks/useNetwork';
import useDarkerMode from './hooks/useDarkerMode';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyles';
import { light, dark } from './styles/Themes';

import { sampleData } from './utils/sampleData';
const { ipcRenderer } = window.require('electron');

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  height: calc(100vh - 46px);
  padding: 4vw;
  overflow-y: scroll;
`;

function App() {
  const [appState, setAppState] = useState({
    events: [],
    error: false,
    title: '',
    parcelId: '',
  });

  const [theme, themeToggler] = useDarkerMode();

  const [isLoading, setIsLoading] = useState(false);
  const network = useNetwork();

  /**
   * Handles submitting form and updates the state.
   *
   * @param {document#event:onSubmit} e
   * @param {string} parcelId Parcel ID as an alphanumeric string
   */

  const getEvents = (e, parcelId) => {
    e.preventDefault();

    /* Only for the demo :) */
    if (parcelId === 'TEST') {
      setAppState({
        ...appState,
      });
      const timeOut = setTimeout(() => {
        setAppState({
          ...sampleData,
        });
      }, 2000);
      return () => clearTimeout(timeOut);
    } else {
      /* the real deal */
      (async () => {
        setIsLoading(true);

        setAppState({
          ...appState,
          parcelId: parcelId,
          title: '',
        });

        const result = await ipcRenderer.invoke('get-events', parcelId);
        const { results, error, title } = result;
        setIsLoading(false);

        setAppState({
          events: results,
          error: error,
          title: title,
          parcelId: parcelId,
        });
      })();
    }
  };

  const handleAppClose = () => ipcRenderer.invoke('app:quit');
  const handleAppMinimize = () => ipcRenderer.invoke('app:minimize');

  const content =
    network === 'online' ? (
      <>
        <SearchForm handleSubmit={getEvents} />
        <ParcelEvents
          title={appState.title}
          events={appState.events}
          isLoading={isLoading}
        />
      </>
    ) : (
      <Offline />
    );
  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <GlobalStyle />
      <TitleBar
        title={'Parcel Tracking'}
        handleClose={handleAppClose}
        handleMinimize={handleAppMinimize}
        toggleTheme={themeToggler}
        isActive={theme === 'light' ? false : true}
      />
      <AppContainer>{content}</AppContainer>
    </ThemeProvider>
  );
}

export default App;
