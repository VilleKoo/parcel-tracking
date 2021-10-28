import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: var(--spacing) calc(var(--spacing) * 8);
`;

export default function ParcelInfo({ data }) {
  if (!data.length) return null;
  const results = data
    // remove nullish items from array
    .filter((n) => n)
    .map((item, idx) => {
      let i = '';
      for (const [key, value] of Object.entries(item)) {
        i = `${key}: ${value}`;
      }
      return <span key={idx}>{i} </span>;
    });

  return <Container>{results}</Container>;
}
