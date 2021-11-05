import React from 'react';
import styled from 'styled-components';
import { useApp } from '../hooks/AppContext';
import { translations } from '../utils/constants';

const OfflineContainer = styled.div`
  text-align: center;
`;

export default function Offline() {
  const appData = useApp();
  return (
    <OfflineContainer>
      <p>{translations.noNetwork[appData.lang]}</p>
    </OfflineContainer>
  );
}
