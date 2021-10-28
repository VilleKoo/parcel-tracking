import React from 'react';
import Loading from './Loading';
import ParcelEvent from './ParcelEvent';
import styled from 'styled-components';

const EventsContainer = styled.div`
  color: var(--primary-text-color);
  flex: 1;
`;
const EventsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: calc(var(--spacing) * 6);
  margin: 0;
`;

const EventsTitle = styled.h4`
  text-align: center;
  margin: calc(var(--spacing) * 6) 0;
`;

export default function ParcelEvents({ events, title, isLoading }) {
  const allEvents = events?.map((event) => (
    <ParcelEvent event={event} key={event.timestamp}></ParcelEvent>
  ));
  return (
    <EventsContainer>
      <EventsTitle>{title}</EventsTitle>
      {isLoading ? <Loading /> : <EventsList>{allEvents}</EventsList>}
    </EventsContainer>
  );
}
