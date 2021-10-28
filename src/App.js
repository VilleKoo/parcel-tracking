import React, { useState } from 'react';
// Components
import SearchForm from './components/SearchForm';
import ParcelEvents from './components/ParcelEvents';
import TitleBar from './components/TitleBar';
import Offline from './components/Offline';
import ParcelInfo from './components/ParcelInfo';
// Hooks
import { LanguageProvider } from './hooks/LanguageContext';
import useNetwork from './hooks/useNetwork';
import useDarkerMode from './hooks/useDarkerMode';
// Styles
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyles';
import { light, dark } from './styles/Themes';
// Misc
import { sampleData } from './utils/sampleData';
import { LastFetchedProvider } from './hooks/LastFetchedContext';
import LastFetched from './components/LastFetched';
const { ipcRenderer } = window.require('electron');

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  height: calc(100vh - 46px);
  padding: 4vw;
  overflow-y: auto;
`;

function App() {
  const [appState, setAppState] = useState({
    events: [],
    info: [],
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

  const getEvents = (e, parcelId, language) => {
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

        const result = await ipcRenderer.invoke(
          'get-events',
          parcelId,
          language
        );

        const { results, error, title, info } = result;
        setIsLoading(false);

        setAppState({
          events: results,
          info: info,
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
        <ParcelInfo data={appState.info} />
        <ParcelEvents
          title={appState.title}
          events={appState.events}
          isLoading={isLoading}
        />
        <LastFetched />
      </>
    ) : (
      <Offline />
    );
  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <GlobalStyle />
      <LanguageProvider>
        <TitleBar
          title={'Parcel Tracking'}
          handleClose={handleAppClose}
          handleMinimize={handleAppMinimize}
          toggleTheme={themeToggler}
          isActive={theme === 'light' ? false : true}
        />
        <LastFetchedProvider>
          <AppContainer>{content}</AppContainer>
        </LastFetchedProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
