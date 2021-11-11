import React from 'react';
// Components
import SearchForm from './components/SearchForm';
import ItemEvents from './components/ItemEvents';
import TitleBar from './components/TitleBar';
// import LastFetched from './components/LastFetched';
// Hooks
import useDarkerMode from './hooks/useDarkerMode';
import useItemEvents from './hooks/useItemEvents';
// Contexts
// import { LastFetchedProvider } from './hooks/LastFetchedContext';
// Styles
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyles';
import { light, dark } from './styles/Themes';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  height: calc(100vh - 46px);
  padding: 4vw;
  overflow-y: auto;
`;

function App() {
  const [itemEvents, loading, getEvents] = useItemEvents();
  const [theme, themeToggler] = useDarkerMode();

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <GlobalStyle />
      <TitleBar
        toggleTheme={themeToggler}
        isActive={theme === 'light' ? false : true}
      />
      <AppContainer>
        <SearchForm handleSubmit={getEvents} />
        <ItemEvents
          title={itemEvents.title}
          events={itemEvents.events}
          isLoading={loading}
          itemInfo={itemEvents.info}
        />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
