import React from 'react';
import WindowControlButton from './WindowControlButton';
import styled from 'styled-components';
import ThemeToggler from './ThemeToggler';
import LanguageSelect from './LanguageSelect';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/constants';
const { ipcRenderer } = window.require('electron');

const TitleBarContainer = styled.div`
  background-color: #111418;
  color: #d7e9ea;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: calc(var(--spacing) * 3);
  padding: calc(var(--spacing) * 3) calc(var(--spacing) * 4);
  width: 100%;
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

const Title = styled.h1`
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  padding: calc(var(--spacing) * 2) 0;
  user-select: none;
  &:hover {
    cursor: move;
  }
`;

const WindowControls = styled.div`
  display: flex;
  flex: 0;
  gap: calc(var(--spacing) * 2);
`;
const ThemeTogglerContainer = styled.div`
  display: flex;
  flex: 0;
`;

export default function TitleBar({ toggleTheme, isActive }) {
  const appData = useApp();
  const handleAppClose = () => ipcRenderer.invoke('app:quit');
  const handleAppMinimize = () => ipcRenderer.invoke('app:minimize');

  return (
    <TitleBarContainer>
      <WindowControls>
        <WindowControlButton
          title={translations.appCloseButton[appData.lang]}
          handleClick={handleAppClose}
          icon={'close'}
        />
        <WindowControlButton
          title={translations.appMinimizeButton[appData.lang]}
          handleClick={handleAppMinimize}
          icon={'minimize'}
        />
      </WindowControls>
      <TitleContainer>
        <Title>{translations.appTitle[appData.lang]}</Title>
      </TitleContainer>
      <LanguageSelect />
      <ThemeTogglerContainer>
        <ThemeToggler toggleTheme={toggleTheme} isActive={isActive} />
      </ThemeTogglerContainer>
    </TitleBarContainer>
  );
}
