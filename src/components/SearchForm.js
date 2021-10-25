import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

const SearchFormContainer = styled.div`
  background: white;
  padding: 18px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
`;

const FormInputText = styled.input`
  border: 0;
  font-size: 16px;
  padding: 16px;
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
  padding: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  &[disabled] {
    cursor: not-allowed;
    background-color: hsla(0, 84%, 64%, 0.5);
  }
`;

export default function SearchForm({ handleSubmit }) {
  const [trackingcode, setValue] = useState(() => {
    const saved = localStorage.getItem('trackingcode');
    const initialValue = JSON.parse(saved);
    return initialValue || '';
  });

  useEffect(() => {
    localStorage.setItem('trackingcode', JSON.stringify(trackingcode));
  }, [trackingcode]);

  const onChange = (e) => {
    const trackingcode = e.target.value.replace(/\W/g, '');
    setValue(trackingcode);
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
        placeholder='Enter your tracking code'
      />
      <FormInputSubmit
        type='button'
        disabled={!trackingcode.length}
        onClick={(e) => handleSubmit(e, trackingcode)}
      >
        Search
      </FormInputSubmit>
    </SearchFormContainer>
  );
}
