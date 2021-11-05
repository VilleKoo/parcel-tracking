import React from 'react';
import { SpinnerDiamond } from 'spinners-react';
import styled from 'styled-components';
import { useApp } from '../hooks/AppContext';
import { translations } from '../utils/constants';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & p {
    margin-bottom: calc(var(--spacing) * 6);
  }
`;

export default function Loading() {
  const appData = useApp();
  return (
    <LoadingContainer>
      <p>{translations.loading[appData.lang]}</p>
      <SpinnerDiamond color={'#5451ab'} secondaryColor={'#394a58'} />
    </LoadingContainer>
  );
}
