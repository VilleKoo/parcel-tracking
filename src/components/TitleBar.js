import React from 'react';
import styled from 'styled-components';
import ThemeToggler from './ThemeToggler';
import LanguageSelect from './LanguageSelect';
import { FiX, FiMinus } from 'react-icons/fi';
import { useApp } from '../hooks/AppContext';
import { translations } from '../utils/constants';

const TitleBarContainer = styled.div`
  background-color: #101010;
  color: #d7e9ea;
  padding: calc(var(--spacing) * 3);
  font-size: 18px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  color: inherit;
  flex: 2;
  text-align: center;
  -webkit-app-region: drag;
  h1 {
    font-size: 14px;
    font-weight: 400;
    margin: 0;
    padding: calc(var(--spacing) * 2) 0;
    user-select: none;
    &:hover {
      cursor: move;
    }
  }
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
  margin-right: calc(var(--spacing) * 2);
  color: inherit;
  cursor: pointer;
  text-align: center;
  padding: 0;
  width: 22px;
  height: 22px;
  svg {
    stroke: var(--primary-accent-color);
    stroke-width: 2;
    width: 100%;
    height: 100%;
  }
`;

export default function TitleBar({
  handleClose,
  handleMinimize,
  toggleTheme,
  isActive,
}) {
  const appData = useApp();
  return (
    <TitleBarContainer>
      <ButtonContainer>
        <ActionButton
          title='close application'
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
          title='minimize application'
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
        <h1>{translations.appTitle[appData.lang]}</h1>
      </TitleContainer>
      <LanguageSelect />
      <ThemeTogglerContainer>
        <ThemeToggler toggleTheme={toggleTheme} isActive={isActive} />
      </ThemeTogglerContainer>
    </TitleBarContainer>
  );
}
