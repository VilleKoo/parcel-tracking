import React, { useContext } from 'react';
import { SpinnerDiamond } from 'spinners-react';
import styled from 'styled-components';
import { useLanguage } from '../hooks/LanguageContext';
import { ThemeContext } from 'styled-components';
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
  const theme = useContext(ThemeContext);
  const language = useLanguage();
  console.log('Current theme: ', theme);
  return (
    <LoadingContainer>
      <p>{translations.loading[language.lang]}</p>
      <SpinnerDiamond
        color={theme.diamondBackground}
        secondaryColor={theme.diamondForeground}
      />
    </LoadingContainer>
  );
}
