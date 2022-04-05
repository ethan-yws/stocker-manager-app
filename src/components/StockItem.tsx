import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FINNHUB_QUOTE_URL } from '../common/constants';
import { IQuote } from '../common/interfaces';
import useStore from '../store';

/* ---------- Styles ------------ */
const Wrapper = styled.div<{ highLighted: string; stockName: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    props.highLighted === props.stockName ? '#eee' : '#fff'};
  padding: 0.5em;
  border-bottom: 1px dashed #eee;

  &:hover {
    background-color: #eeeeee;
    cursor: pointer;
  }
`;

const StockName = styled.div`
  padding: 0.5em;
  width: 200px;
  min-width: 50px;
  max-width: 50px;
  flex: 1;
`;

const StockPrice = styled.div`
  font-size: 1em;
  width: 200px;
  text-align: center;
`;

const StockChange = styled.div<{ change: number }>`
  padding: 5px;
  margin-right: 0.5em;
  width: 100px;
  text-align: center;
  background-color: ${(props) => (props.change >= 0 ? '#63e6b6' : 'red')};
  border-radius: 5px;
  color: white;
`;

const Operation = styled.div`
  display: flex;
  gap: 0.5em;
  margin-right: 1em;

  input {
    width: 2em;
    text-align: center;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 0.5em;

  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`;

/* ------------ Interfaces ------------ */
interface IStockItem {
  name: string;
  retrieveQuote: (param: any) => void;
  highLighted: string;
  userClick: (param: string) => void;
}

export const StockItem: React.FC<IStockItem> = (props: IStockItem) => {
  const [quote, setQuote] = useState<IQuote>({});
  const { balance, addShareHoldings, removeBalance, removeShareHoldings } =
    useStore();

  const [buyQty, setBuyQty] = useState(1);
  const [sellQty, setSellQty] = useState(1);

  const buyShare = (symbol: string, quantity: number): void => {
    const creditsToDeduce: number = (quote.c as number) * quantity;
    if (creditsToDeduce > balance) {
      alert('Low balance');
    } else {
      addShareHoldings(symbol, quantity);
      removeBalance(creditsToDeduce);
    }
  };

  // Fetch the ticker quote by given ticker symbol
  useEffect(() => {
    const queryUrl = FINNHUB_QUOTE_URL.replace('{Symbol}', props.name);

    const fetchQuote = async () => {
      try {
        const data = await fetch(queryUrl);
        const quoteData: IQuote = await data.json();
        setQuote(quoteData);
      } catch (e) {
        setQuote({ c: 'error', d: 0 });
        console.error(e);
      }
    };

    fetchQuote();
  }, [props.name]);

  const { c: curPrice, d: change = 0 } = quote;

  return (
    <Wrapper
      highLighted={props.highLighted}
      stockName={props.name}
      onClick={() => {
        props.retrieveQuote(quote);
        props.userClick(props.name);
      }}
    >
      <StockName>{props.name}</StockName>
      <StockPrice>{curPrice}</StockPrice>
      <StockChange change={change}>{change.toFixed(2)}</StockChange>
      <Operation>
        <input
          placeholder="1"
          onChange={(e) => setBuyQty(parseInt(e.target.value))}
        />
        <Button color="#000" onClick={() => buyShare(props.name, buyQty)}>
          Buy
        </Button>
      </Operation>
      <Operation>
        <input
          placeholder="1"
          onChange={(e) => setSellQty(parseInt(e.target.value))}
        />
        <Button
          color="salmon"
          onClick={() =>
            removeShareHoldings(props.name, sellQty, quote.c as number)
          }
        >
          Sell
        </Button>
      </Operation>
    </Wrapper>
  );
};
