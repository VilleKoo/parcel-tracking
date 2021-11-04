import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  margin-bottom: calc(var(--spacing) * 4);
  padding-bottom: calc(var(--spacing) * 4);
  font-size: 14px;
  display: flex;
  border-bottom: solid 1px ${({ theme }) => theme.listBorder};
  color: ${({ theme }) => theme.text};
  & span {
    padding: 0 calc(var(--spacing) * 2);
    flex: 1;
  }
  & span:first-child {
    padding-left: 0;
  }
  & span:last-child {
    padding-right: 0;
    text-align: right;
  }
  & span:nth-child(2) {
    text-align: center;
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
