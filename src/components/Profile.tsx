import React from 'react';
import styled from 'styled-components';
import useStore from '../store';

const Wrapper = styled.div`
  margin-top: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow: auto;

  h3 {
    text-align: center;
  }
`;

const Share = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 0.5em;
`;

export const Profile = () => {
  const { shareHoldings } = useStore();

  return (
    <Wrapper>
      <h3>Share Holdings</h3>
      <Share>
        <span>Symbol</span>
        <span>Quantity</span>
      </Share>
      {shareHoldings.map((item) => (
        <Share>
          <span>{item.ticker}</span>
          <span>{item.quantity}</span>
        </Share>
      ))}
    </Wrapper>
  );
};
