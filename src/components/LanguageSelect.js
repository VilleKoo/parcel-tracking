import React from 'react';
import { useLanguage } from '../hooks/LanguageContext';
import styled from 'styled-components';
import { languages } from '../utils/constants';

const Select = styled.select`
  background: transparent;
  border: 0;
  color: white;
  font-size: 12px;
  margin-right: 16px;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
  }
  option {
    color: black;
  }
`;

export default function LanguageSelect() {
  const lala = useLanguage();
  const defaultLanguage = lala.lang;
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
        onChange={(e) => lala.changeLang(e.target.value)}
        aria-label='Select language'
      >
        {getLanguages(languages)}
      </Select>
    </div>
  );
}
