import React from 'react';
import styled from 'styled-components';
import { BiMoon, BiSun } from 'react-icons/bi';

const Button = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  align-items: center;
  position: relative;
  padding: 0;
  overflow: hidden;
  width: 32px;
  height: 32px;
  &:focus {
    outline: 1px dotted #212121;
    outline: 1px auto -webkit-focus-ring-color;
    outline-offset: 2px;
  }
  &:focus,
  &:focus:not(:focus-visible) span {
    outline: 0;
  }
  &[aria-pressed='true'] span {
    //border-color: white;
  }
  &[aria-pressed='true'] span div {
    transform: translate(0, -200%);
  }

  &[aria-pressed='true'] span div svg {
    stroke: white;
  }
`;

const ToggleDisplay = styled.span`
  background-color: transparent;
  border: 1px solid hsla(216, 18%, 10%, 1);
  border-radius: 100vw;
  pointer-events: none;
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  transition: 250ms;
  overflow: hidden;
  // padding: 4px;
`;

const IconContainer = styled.div`
  color: ${({ theme }) => theme.text};
  color: white;
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transform: translate(0, 0);
  transition: all 0.5s;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  svg {
    width: 60%;
    height: 60%;
    fill: currentColor;
  }
`;

export default function ThemeToggler({ toggleTheme, isActive }) {
  const attr = 'aria-pressed';
  const checkifPressed = (event) => {
    if (event.target.getAttribute(attr) === 'true') {
      event.target.removeAttribute(attr);
    } else {
      event.target.setAttribute(attr, 'true');
    }
  };

  function handleClick(e) {
    checkifPressed(e);
    return toggleTheme();
  }

  return (
    <Button
      type='button'
      aria-pressed={isActive}
      onClick={(e) => handleClick(e)}
    >
      <ToggleDisplay className='Toggle__display' hidden>
        <IconContainer>
          <BiSun
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            focusable='false'
            stroke='black'
          ></BiSun>
        </IconContainer>
        <IconContainer>
          <BiMoon
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            focusable='false'
          ></BiMoon>
        </IconContainer>
      </ToggleDisplay>
    </Button>
  );
}