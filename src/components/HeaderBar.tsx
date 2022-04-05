import React from 'react';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';
import useStore from '../store';
import { Link } from 'react-router-dom';

/*----------- Styles ----------- */
const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 1px 2px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 7%;
  min-height: 7%;
  max-height: 7%;
  position: sticky;
  top: 0;
`;

const Logo = styled.div`
  padding: 1em;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const Icons = styled.div`
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 0.75em;
  font-size: 10pt;

  .profile-icon {
    &:hover {
      color: salmon;
    }
  }
`;

const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1em;
  border: 1.5px solid lightgreen;
  border-radius: 0.5em;

  & > span {
    padding: 0 0.5em 0 0.5em;
  }

  &:hover {
    background-color: lightgreen;
    color: white;
    cursor: pointer;
  }
`;

export const HeaderBar: React.FC = () => {
  const { balance } = useStore();

  return (
    <Wrapper>
      <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
        <Logo>Stock Manager App</Logo>
      </Link>
      <Icons>
        <Link to="/profile" style={{ textDecoration: 'none', color: '#000' }}>
          <AccountCircleIcon className="profile-icon" />
        </Link>
        <Link to="/balance" style={{ textDecoration: 'none', color: '#000' }}>
          <Balance>
            <PaidIcon />
            <span>{balance.toFixed(2)}</span>
          </Balance>
        </Link>
      </Icons>
    </Wrapper>
  );
};
