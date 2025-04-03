import React from "react";
import styled from "styled-components";

const AboutMe = () => {
  return (
    <AboutMeContainer>
      <AvatarImg src="/avatar.jpg" alt="Avatar" />
      <h1>About Me</h1>
      <p>
        By now, you probably had some formal lessons in schools or special
        courses. Now it's time to practice the theory and start speaking! I am
        here to help you improve your speaking skills through practice.
      </p>
    </AboutMeContainer>
  );
};

export const AboutMeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #b5c8e5;
  text-align: center;
  color: #333;
  padding: 2rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  }

  p {
    font-size: 1.2rem;
    max-width: 500px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  }

  border-radius: 10px;
`;

export const AvatarImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
`;

export default AboutMe;
