import React from 'react';
import { useLanguage } from '../hooks/LanguageContext';
import useLocalStorage from '../hooks/useLocalStorage';
import styled from 'styled-components';
import { translations } from '../utils/constants';
import { BiSearch } from 'react-icons/bi';

const SearchFormContainer = styled.div`
  background: white;
  padding: calc(var(--spacing) * 4);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
`;

const FormInputText = styled.input`
  border: 0;
  font-size: 16px;
  padding: calc(var(--spacing) * 4);
  width: 100%;
  ::placeholder {
    color: #ddd;
  }
`;

const FormInputSubmit = styled.button`
  background-color: hsla(0, 84%, 64%, 1);
  color: white;
  border: 0;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  padding: calc(var(--spacing) * 4);
  cursor: pointer;
  transition: background-color 0.3s;
  &[disabled] {
    cursor: not-allowed;
    background-color: hsla(0, 84%, 64%, 0.5);
  }
`;

export default function SearchForm({ handleSubmit }) {
  const [trackingcode, setTrackingcode] = useLocalStorage('trackingcode', '');
  const language = useLanguage();

  const onChange = (e) => {
    const trackingcode = e.target.value.replace(/\W/g, '');
    setTrackingcode(trackingcode);
  };

  return (
    <SearchFormContainer>
      <span>
        <BiSearch fill='#DDDDDD' />
      </span>
      <FormInputText
        type='text'
        value={trackingcode}
        onChange={onChange}
        id='search'
        placeholder={translations.placeholder[language.lang]}
      />
      <FormInputSubmit
        type='button'
        disabled={!trackingcode.length}
        onClick={(e) =>
          handleSubmit(e, trackingcode, language.lang.toLowerCase())
        }
      >
        {translations.search[language.lang]}
      </FormInputSubmit>
    </SearchFormContainer>
  );
}
