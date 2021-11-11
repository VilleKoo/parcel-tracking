import React, { useState } from 'react';
// Components
import SearchForm from './components/SearchForm';
import ParcelEvents from './components/ParcelEvents';
import TitleBar from './components/TitleBar';
// import LastFetched from './components/LastFetched';
// Hooks
import useDarkerMode from './hooks/useDarkerMode';
// Contexts
// import { LastFetchedProvider } from './hooks/LastFetchedContext';
import { useApp } from './hooks/AppContext';
// Styles
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyles';
import { light, dark } from './styles/Themes';
// Misc
import { sampleData } from './utils/sampleData';
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
    itemId: '',
  });

  const [theme, themeToggler] = useDarkerMode();
  const appData = useApp();

  /**
   * Handles submitting form and updates the state.
   *
   * @param {document#event:onSubmit} e
   * @param {string} itemId Parcel ID as an alphanumeric string
   * @param {string} language user selected language abbreviation
   */

  const getEvents = (e, itemId, language) => {
    e.preventDefault();

    /* Only for the demo :) */
    if (itemId === 'TEST') {
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
        appData.setLoadingState(true);

        setAppState({
          ...appState,
          itemId: itemId,
          title: '',
        });

        const result = await ipcRenderer.invoke('get-events', itemId, language);

        const { results, error, title, info } = result;
        appData.setLoadingState(false);

        setAppState({
          events: results,
          info: info,
          error: error,
          title: title,
          itemId: itemId,
        });
      })();
    }
  };

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <GlobalStyle />
      <TitleBar
        toggleTheme={themeToggler}
        isActive={theme === 'light' ? false : true}
      />
      <AppContainer>
        <SearchForm handleSubmit={getEvents} />
        <ParcelEvents
          title={appState.title}
          events={appState.events}
          isLoading={appData.isLoading}
          parcelInfo={appState.info}
        />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
