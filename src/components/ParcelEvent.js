import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  margin-bottom: 16px;
  padding-bottom: 8px;
  font-size: 14px;
  display: flex;
  border-bottom: solid 1px #272727;
  color: ${({ theme }) => theme.text};
  & span {
    padding: 0 8px;
    flex: 1;
  }
`;

export default function ParcelEvent({ event }) {
  const { description, location, timestamp } = event;
  return (
    <ListItem>
      <span>{description}</span>
      <span>{location}</span>
      <span>{timestamp}</span>
    </ListItem>
  );
}
