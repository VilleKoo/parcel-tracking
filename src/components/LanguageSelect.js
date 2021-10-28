import React from 'react';
import { useLanguage } from '../hooks/LanguageContext';
import { languages } from '../utils/constants';

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
      <select
        defaultValue={defaultLanguage}
        onChange={(e) => lala.changeLang(e.target.value)}
        aria-label='Select language'
      >
        {getLanguages(languages)}
      </select>
    </div>
  );
}
