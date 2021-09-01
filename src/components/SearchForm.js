import React, { useState } from "react";
import styled from "styled-components";

const SearchFormContainer = styled.div`
  background: #494d73;
  padding: 24px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
`
const FormLabel = styled.label`
  color: white;
  font-size: 24px;
  margin-bottom: 16px;
`
const FormInputText = styled.input`
  font-size: 16px;
  padding: 8px;
`

const FormInputSubmit = styled.input`
  background-color: #f2cc8f;
  border: 0;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 8px;
  padding: 8px;
`

export default function SearchForm({ handleSubmit }) {
  const [value, setValue] = useState('');
  
  const onChange = (e) => {
    const value = e.target.value.replace(/\W/g, '')
    setValue(value);
  };

  return (
    <SearchFormContainer>
      <Form onSubmit={(e) => handleSubmit(e, value)}>
        <FormLabel htmlFor="search">
            Enter your parcel id
        </FormLabel>
        <FormInputText 
          type="text"
          value={value}
          onChange={onChange}
          id="search"
        />
        <FormInputSubmit type="submit" value="Submit" disabled={!value.length}/>
      </Form>
    </SearchFormContainer>
  )
}