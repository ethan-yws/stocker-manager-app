import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StockItem } from './StockItem';
import { DEFAULT_STOCKS } from '../common/constants';

const Wrapper = styled.div`
  /* background-color: salmon; */
  height: calc(88% * 0.618);
  overflow: auto;
`;

interface IStockBoard {
  userInput: string;
  retrieveQuote: (param: any) => void;
}

export const StockBoard: React.FC<IStockBoard> = ({
  retrieveQuote,
  userInput,
}) => {
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const [highlighted, setHighLighted] = useState<string>('');

  const handleUserClick = (ticker: string) => setHighLighted(ticker);

  useEffect(() => {
    const updateUserInputs = () => {
      setUserInputs([...userInputs, userInput]);
    };

    userInput && updateUserInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput]);

  return (
    <Wrapper>
      {/* rendering preset stocks */}
      {DEFAULT_STOCKS.map((stock) => (
        <StockItem
          userClick={handleUserClick}
          highLighted={highlighted}
          key={stock}
          name={stock}
          retrieveQuote={retrieveQuote}
        />
      ))}
      {/* rendering user searched stocks */}
      {userInputs.length > 0 &&
        userInputs.map((input) => (
          <StockItem
            userClick={handleUserClick}
            highLighted={highlighted}
            key={input}
            name={input}
            retrieveQuote={retrieveQuote}
          />
        ))}
    </Wrapper>
  );
};
