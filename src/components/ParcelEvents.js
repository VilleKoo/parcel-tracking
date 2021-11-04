import React from 'react';
import Loading from './Loading';
import ParcelEvent from './ParcelEvent';
// import ParcelInfo from './ParcelInfo';
import styled from 'styled-components';

const EventsContainer = styled.main`
  color: var(--primary-text-color);
  flex: 1;
  margin-top: calc(var(--spacing) * 4);
`;
const EventsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: calc(var(--spacing) * 4) calc(var(--spacing) * 6);
  margin: 0;
`;

const EventsTitle = styled.h2`
  text-align: center;
  margin: calc(var(--spacing) * 6) 0 calc(var(--spacing) * 4) 0;
`;

export default function ParcelEvents({ events, title, isLoading, parcelInfo }) {
  if (isLoading) return <Loading />;
  const allEvents = events?.map((event) => (
    <ParcelEvent event={event} key={event.timestamp}></ParcelEvent>
  ));
  return (
    <EventsContainer aria-labelledby='mainTitle'>
      <EventsTitle id='mainTitle' tabIndex='0'>
        {title}
      </EventsTitle>
      {/*<ParcelInfo data={parcelInfo} />*/}
      <EventsList>{allEvents}</EventsList>
    </EventsContainer>
  );
}
