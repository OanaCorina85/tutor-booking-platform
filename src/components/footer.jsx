import React from "react";
import styled from "styled-components";

const Footer = () => (
  <Container>
    <p>
      © 2025 Tutor Booking Platform. All rights reserved. Contact me at
      <a href="mailto:oanacorinatrifon@gmail.com">oanacorinatrifon@gmail.com</a>
    </p>
  </Container>
);
const Container = styled.footer`
  display: flex;
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin-top: 10px;
  border-top: 1px solid #ccc;
  position: absolute;
  bottom: 0;
  width: 100%;

  p {
    margin-bottom: 10px;
  }

  a {
    display: block;
    margin-top: 10px;
    color: #143fc1;
  }
`;

export default Footer;
