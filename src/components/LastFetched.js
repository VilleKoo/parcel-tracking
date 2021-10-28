import React from 'react';
import { useLastFetched } from '../hooks/LastFetchedContext';
import { useLanguage } from '../hooks/LanguageContext';
import styled from 'styled-components';
import { translations } from '../utils/constants';

const Container = styled.div`
  background: var(--toolbar-color);
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 6);
  position: absolute;
  width: 100%;

  span {
    font-size: var(--fontsize-small);
  }
`;

export default function LastFetched() {
  const time = useLastFetched();
  const language = useLanguage();
  console.log(time);
  return (
    <Container>
      <span>{`${translations.lastFetched[language.lang]}: ${time.time}`}</span>
    </Container>
  );
}
