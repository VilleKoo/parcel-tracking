import React from 'react';
import Loading from './Loading';
import ItemEvent from './ItemEvent';
import ItemInfo from './ItemInfo';
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

export default function ItemEvents({
  events,
  title,
  subtitle,
  isLoading,
  itemInfo,
  errors,
}) {
  if (isLoading) return <Loading />;

  const allEvents = events?.map((event, index) => (
    <ItemEvent event={event} key={`${event.timestamp}${index}`}></ItemEvent>
  ));
  const allErrors =
    errors && errors.map((error, index) => <p key={index}>{error}</p>);

  return (
    <EventsContainer aria-labelledby='mainTitle'>
      <EventsTitle id='mainTitle' tabIndex='0'>
        {title}
      </EventsTitle>
      <h3>{subtitle}</h3>
      {allErrors}
      <ItemInfo data={itemInfo} />
      <EventsList>{allEvents}</EventsList>
    </EventsContainer>
  );
}
