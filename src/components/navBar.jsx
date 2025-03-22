import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Container>
      <h2>Easy learning with</h2>

      <ul>
        <li>
          <Link to="/appointments">
            <button>Acasa</button>
          </Link>
        </li>
        <li>
          <button>Despre</button>
        </li>
        <li>
          <button>Servicii</button>
        </li>
        <li>
          <button>Contact</button>
        </li>
      </ul>
    </Container>
  );
};
const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  position: sticky;
  align-items: center;
  flex-direction: row;
  background-color: #b5c8e5;
  z-index: 1000;
  top: 0;

  h2 {
    display: flex;
    align-items: center;
    width: 300px;
    height: 60px;
  }

  ul {
    display: flex;
    background-color: #b5c8e5;
    list-style-type: none;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    padding-right: 40px;
  }

  button {
    background-color: #225fb9;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }
  button:hover {
    background-color: #143fc1;
    cursor: pointer;
    color: red;
  }
`;

export default Navbar;
