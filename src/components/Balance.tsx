import React, { useState } from 'react';
import styled from 'styled-components';
import useStore from '../store';

/*--------- Styles ---------*/
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const BalanceText = styled.div`
  text-align: center;
  padding: 1em;
  font-size: 14pt;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px;
`;

const Input = styled.input`
  display: block;
  margin: auto;
  height: 1em;
  padding: 10px;
  width: 60%;
`;

export const Balance = () => {
  const [credit, setCredit] = useState<number>(0);
  const { balance, addBalance, removeBalance } = useStore();

  return (
    <Wrapper>
      <BalanceText>Balance: {balance.toFixed(2)}</BalanceText>
      <Input
        placeholder="e.g. 1000"
        onChange={(e: React.SyntheticEvent) =>
          setCredit(parseFloat((e.target as HTMLTextAreaElement).value))
        }
      ></Input>
      <ButtonContainer>
        <Button onClick={() => addBalance(credit)}>Top up</Button>
        <Button onClick={() => removeBalance(credit)}>Withdraw</Button>
      </ButtonContainer>
      {/* <div>{credit}</div> */}
    </Wrapper>
  );
};
