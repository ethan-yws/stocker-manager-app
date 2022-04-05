import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  height: 3%;
  min-height: 3%;
  max-height: 5%;
  margin-bottom: 5px;
`;

const Input = styled.input`
  display: block;
  margin: auto;
  width: 97%;
  position: relative;
  height: 100%;
  border: 1px solid #eee;
  padding-left: 1em;
`;

/* ---------- Interfaces ----------- */
interface ISearchBar {
  retrieveInput: (param: string) => any;
}

export const SearchBar: React.FC<ISearchBar> = ({ retrieveInput }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    retrieveInput(input);
    e.preventDefault();
    setInput('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></Input>
      </Form>
    </>
  );
};
