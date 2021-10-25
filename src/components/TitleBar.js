import React from 'react';
import styled from 'styled-components';
import ThemeToggler from './ThemeToggler';
import { FiX, FiMinus } from 'react-icons/fi';

const TitleBarContainer = styled.div`
  background-color: hsla(216, 18%, 14%, 1);
  color: white;
  padding: 4px 12px;
  font-size: 18px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 14px;
    font-weight: 400;
    margin: 0;
    padding: 8px 0;
    user-select: none;
    &:hover {
      cursor: move;
    }
  }
`;

const TitleContainer = styled.div`
  color: inherit;
  flex: 2;
  text-align: center;
  -webkit-app-region: drag;
  &:hover {
    cursor: move;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex: 0;
`;
const ThemeTogglerContainer = styled.div`
  display: flex;
  flex: 0;
`;

const ActionButton = styled.button`
  background: #181a21;
  border-radius: 4px;
  border: none;
  margin-right: 8px;
  color: inherit;
  cursor: pointer;
  text-align: center;
  padding: 0;
  width: 22px;
  height: 22px;
  svg {
    stroke: white;
    stroke-width: 1;
    width: 100%;
    height: 100%;
  }
`;

export default function TitleBar({
  title,
  handleClose,
  handleMinimize,
  toggleTheme,
  isActive,
}) {
  return (
    <TitleBarContainer>
      <ButtonContainer>
        <ActionButton
          name='close application'
          type='button'
          onClick={handleClose}
        >
          <FiX
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            focusable='false'
          />
        </ActionButton>
        <ActionButton
          name='minimize application'
          type='button'
          onClick={handleMinimize}
        >
          <FiMinus
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            focusable='false'
          />
        </ActionButton>
      </ButtonContainer>
      <TitleContainer>
        <h1>{title}</h1>
      </TitleContainer>
      <ThemeTogglerContainer>
        <ThemeToggler toggleTheme={toggleTheme} isActive={isActive} />
      </ThemeTogglerContainer>
    </TitleBarContainer>
  );
}
