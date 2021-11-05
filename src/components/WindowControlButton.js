import React from 'react';
import styled from 'styled-components';
import { FiX, FiMinus } from 'react-icons/fi';

const ControlButton = styled.button`
  background: #3a4555;
  border-radius: 4px;
  border: none;
  color: inherit;
  cursor: pointer;
  text-align: center;
  padding: 0;
  width: 22px;
  height: 22px;
  svg {
    stroke: var(--primary-accent-color);
    stroke-width: 1;
    width: 100%;
    height: 100%;
  }
`;

export default function WindowControlButton({ handleClick, title, icon }) {
  const buttonIcon =
    icon === 'close' ? (
      <FiX
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        focusable='false'
      />
    ) : (
      <FiMinus
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        focusable='false'
      />
    );
  return (
    <ControlButton title={title} type='button' onClick={handleClick}>
      {buttonIcon}
    </ControlButton>
  );
}
