import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import ParcelEvents from './components/ParcelEvents';
import styled from 'styled-components';

const { ipcRenderer } = window.require('electron');

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
`

function App() {
  const [appState, setAppState] = useState({
    events: [],
    loading: false,
    error: false,
    title: '',
    parcelId: '',
  });

  /**
   * Handles submitting form and updates the state.
   * 
   * @param {document#event:onSubmit} e 
   * @param {string} parcelId Parcel ID as alphanumeric string
   */

  const getEvents = (e, parcelId) => {
    e.preventDefault();
    
    (async () => {
      setAppState({
        ...appState,
        loading: true,
        parcelId: parcelId,
        title: '',
      })

      const result = await ipcRenderer.invoke('get-events', parcelId);
      const { results, error, title } = result

      setAppState({
        events: results,
        loading: false,
        error: error,
        title: title,
        parcelId: parcelId,
      })
    })();
  }

  return (
    <AppContainer>
      <SearchForm handleSubmit={getEvents} />
      <ParcelEvents
        title={appState.title} 
        events={appState.events}
        isLoading={appState.loading}
      />
    </AppContainer>
  );
}

export default App;
