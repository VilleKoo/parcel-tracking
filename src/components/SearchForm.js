import React from 'react';
import { useLanguage } from '../hooks/LanguageContext';
import useLocalStorage from '../hooks/useLocalStorage';
import styled from 'styled-components';
import { translations } from '../utils/constants';
import { BiSearch } from 'react-icons/bi';

const SearchFormContainer = styled.div`
  background: ${({ theme }) => theme.searchBackground};
  padding: calc(var(--spacing) * 4);
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075);
  display: flex;
  align-items: center;
`;

const FormInputText = styled.input`
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  flex: 1;
  padding: calc(var(--spacing) * 4);
  width: 100%;
  ::placeholder {
    color: #ddd;
  }
`;

const FormInputSubmit = styled.button`
  background-color: #5451ab;
  color: white;
  border: 0;
  border-radius: 36px;
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

const Icon = styled.span`
  line-height: 1;
  fill: ${({ theme }) => theme.text};
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
      <Icon>
        <BiSearch />
      </Icon>
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
