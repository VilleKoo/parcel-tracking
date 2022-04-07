import React from 'react';
import { useApp } from '../context/AppContext';
import styled from 'styled-components';
import { languages } from '../utils/constants';

const Select = styled.select`
  background: #181a21;
  border-radius: 4px;
  border: 0;
  color: var(--primary-text-color-light);
  font-size: 12px;
  padding: var(--spacing);
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
  }
  option {
    color: black;
    background: var(--background-light);
  }
`;

export default function LanguageSelect() {
  const appData = useApp();
  const defaultLanguage = appData.lang;
  function getLanguages(obj) {
    let languages = [];
    for (const [key, value] of Object.entries(obj)) {
      languages.push(
        <option value={key} key={key}>
          {value}
        </option>
      );
    }
    return languages;
  }

  return (
    <div>
      <Select
        defaultValue={defaultLanguage}
        onChange={(e) => appData.changeLang(e.target.value)}
        aria-label='Select language'
      >
        {getLanguages(languages)}
      </Select>
    </div>
  );
}
