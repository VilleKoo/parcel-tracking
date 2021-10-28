import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../hooks/LanguageContext';
import { translations } from '../utils/constants';

const OfflineContainer = styled.div`
  text-align: center;
`;

export default function Offline() {
  const language = useLanguage();
  return (
    <OfflineContainer>
      <p>{translations.noNetwork[language.lang]}</p>
    </OfflineContainer>
  );
}
