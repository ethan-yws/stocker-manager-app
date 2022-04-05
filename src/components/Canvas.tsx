import React, { useState } from 'react';
import styled from 'styled-components';
import { IQuote } from '../common/interfaces';
import { StockBoard } from './StockBoard';
import { StockQuote } from './StockQuote';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 88%;
`;

interface ICanvas {
  userInput: string;
}

export const Canvas: React.FC<ICanvas> = ({ userInput }) => {
  const [quote, setQuote] = useState<IQuote>({});

  const retrieveQuote = (quoteData: any) => {
    setQuote(quoteData);
  };
  return (
    <Wrapper>
      <StockBoard retrieveQuote={retrieveQuote} userInput={userInput} />
      <StockQuote quoteData={quote} />
    </Wrapper>
  );
};
