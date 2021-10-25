import React from 'react';
import styled from 'styled-components';

const OfflineContainer = styled.div`
  text-align: center;
`;

export default function Offline() {
  return (
    <OfflineContainer>
      <p>What a bummer, no network :(</p>
    </OfflineContainer>
  );
}
