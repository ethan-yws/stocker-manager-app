import React from 'react';
import styled from 'styled-components';
import { IQuote } from '../common/interfaces';

const Wrapper = styled.div`
  /* background-color: salmon; */
  flex-grow: 1;
  border-top: 1px solid #eee;
  box-shadow: rgba(149, 157, 165, 0.2) 0px -5px 30px;
  display: grid;
  grid-template-columns: repeat(2, 50%);
`;

const QuoteEntry = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px 5px 10px;
  border-bottom: 1px dotted grey;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10pt;
  margin: 0.5em;

  span {
    font-weight: 500;
    font-size: 10pt;
    color: grey;
  }
`;

/* ---------- Interfaces ----------- */
interface IStockQuote {
  quoteData: IQuote;
}

export const StockQuote: React.FC<IStockQuote> = ({ quoteData }) => {
  const {
    o: openPrice,
    h: highPrice,
    l: lowPrice,
    c: curPrice,
    d: change,
    dp: percentChange,
    pc: preClosePrice,
  } = quoteData;

  return (
    <Wrapper>
      <QuoteEntry>
        <span>OPEN</span>
        {openPrice}
      </QuoteEntry>
      <QuoteEntry>
        <span>HIGH</span>
        {highPrice}
      </QuoteEntry>
      <QuoteEntry>
        <span>LOW</span>
        {lowPrice}
      </QuoteEntry>
      <QuoteEntry>
        <span>CURRENT</span>
        {curPrice}
      </QuoteEntry>
      <QuoteEntry>
        <span>CHANGE</span>
        {change}
      </QuoteEntry>
      <QuoteEntry>
        <span>% CHANGE</span>
        {percentChange !== undefined ? percentChange.toString() + '%' : ''}
      </QuoteEntry>
      <QuoteEntry>
        <span>LAST PRICE</span>
        {preClosePrice}
      </QuoteEntry>
      <QuoteEntry>
        <span>VOL</span>
        n/a
      </QuoteEntry>
    </Wrapper>
  );
};
