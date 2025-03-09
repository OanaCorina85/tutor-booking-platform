import styled from "styled-components";
import React from "react";
import Calendar from "react-calendar";

const HomePage = () => {
  return <Container>Easy learning with</Container>;
};

const Container = styled.main`
  display: flex;
  background-color: rgba(186, 223, 240, 0.9);
  justify-content: top;
  align-items: top;
  height: 100vh;
  font-size: 2rem;
  font-weight: 700;
  padding: 1rem;
  color: rgba(65, 52, 52, 0.9);
`;

export default HomePage;
