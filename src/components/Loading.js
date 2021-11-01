import React from 'react';
import { SpinnerDiamond } from 'spinners-react';
import styled from 'styled-components';
import { useLanguage } from '../hooks/LanguageContext';
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
  const language = useLanguage();
  return (
    <LoadingContainer>
      <p>{translations.loading[language.lang]}</p>
      <SpinnerDiamond color={'#ff8000'} secondaryColor={'#394a58'} />
    </LoadingContainer>
  );
}
