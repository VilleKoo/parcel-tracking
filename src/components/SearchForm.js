import React from 'react';
import { useApp } from '../hooks/AppContext';
import useLocalStorage from '../hooks/useLocalStorage';
import styled from 'styled-components';
import { translations } from '../utils/constants';

const SearchFormContainer = styled.div`
  background: ${({ theme }) => theme.searchBackground};
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075);
  font-family: inherit;
  padding: calc(var(--spacing) * 4);
`;

const Form = styled.form`
  display: flex;
  gap: calc(var(--spacing) * 2);
  flex-direction: column;
`;

const FormInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: calc(var(--spacing) * 4);
`;

const Label = styled.label`
  color: ${({ theme }) => theme.text};
  font-size: 12px;
  font-weight: var(--font-weight-bold);
  display: block;
  margin-bottom: var(--spacing);
  text-transform: uppercase;
`;

const FormInputText = styled.input`
  background: transparent;
  border: solid 1px ${({ theme }) => theme.body};
  border-radius: 2px;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  flex: 1;
  padding: calc(var(--spacing) * 4);
  width: 100%;
`;

const FormInputSubmit = styled.button`
  background-color: var(--secondary-accent-color);
  color: var(--white);
  border: 0;
  border-radius: 36px;
  font-size: 12px;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: calc(var(--spacing) * 4);
  cursor: pointer;
  transition: background-color 0.3s;
  &[disabled] {
    cursor: not-allowed;
    background-color: #201f3e;
  }
`;

export default function SearchForm({ handleSubmit }) {
  const [trackingcode, setTrackingcode] = useLocalStorage('trackingcode', '');
  const appData = useApp();

  const onChange = (e) => {
    const trackingcode = e.target.value.replace(/\W/g, '');
    setTrackingcode(trackingcode);
  };

  return (
    <SearchFormContainer>
      <Form
        onSubmit={(e) =>
          handleSubmit(e, trackingcode, appData.lang.toLowerCase())
        }
      >
        <Label htmlFor='search'>{translations.placeholder[appData.lang]}</Label>
        <FormInputContainer>
          <FormInputText
            type='text'
            value={trackingcode}
            onChange={onChange}
            id='search'
            disabled={appData.isLoading}
          />
          <FormInputSubmit
            type='button'
            disabled={!trackingcode.length || appData.isLoading}
            onClick={(e) =>
              handleSubmit(e, trackingcode, appData.lang.toLowerCase())
            }
          >
            {translations.search[appData.lang]}
          </FormInputSubmit>
        </FormInputContainer>
      </Form>
    </SearchFormContainer>
  );
}
