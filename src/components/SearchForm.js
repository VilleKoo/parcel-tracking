import React from 'react';
import { useLanguage } from '../hooks/LanguageContext';
import { useLastFetched } from '../hooks/LastFetchedContext';
import useLocalStorage from '../hooks/useLocalStorage';
import styled from 'styled-components';
import { translations } from '../utils/constants';
import { BiSearch } from 'react-icons/bi';

const SearchFormContainer = styled.div`
  background: var(--white);
  padding: calc(var(--spacing) * 4);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
`;

const FormInputText = styled.input`
  border: 0;
  font-size: var(--fontsize-normal);
  padding: calc(var(--spacing) * 4);
  flex: 1;
  ::placeholder {
    color: var(--medium-gray);
  }
`;

const FormInputSubmit = styled.button`
  background-color: var(--red-solid);
  border: 0;
  border-radius: calc(var(--spacing) * 2);
  color: var(--white);
  cursor: pointer;
  font-size: var(--fontsize-small);
  font-weight: 400;
  text-transform: uppercase;
  padding: calc(var(--spacing) * 4);
  transition: background-color 0.3s;
  &[disabled] {
    cursor: not-allowed;
    background-color: var(--red-50);
  }
`;

export default function SearchForm({ handleSubmit }) {
  const [trackingcode, setTrackingcode] = useLocalStorage('trackingcode', '');
  const fetched = useLastFetched();
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
        onClick={(e) => {
          handleSubmit(e, trackingcode, language.lang.toLowerCase());
          fetched.setTime();
        }}
      >
        {translations.search[language.lang]}
      </FormInputSubmit>
    </SearchFormContainer>
  );
}
