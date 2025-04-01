import React from "react";
import styled from "styled-components";

const AboutMe = () => {
  return (
    <Container>
      <img src="/avatar.jpg" alt="Avatar" />
      <h1>About Me</h1>
      <p>
        By now, you probably had some formal lessons in schools or special
        courses. Now it's time to practice the theory and start speaking! I am
        here to help you improve your speaking skills through practice.
      </p>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px;
    height: 150px;
    margin-top: 1rem;
    border-radius: 50%; /* Makes the image round */
    object-fit: cover; /* Ensures the image fits within the circle */
  }

  h1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-overflow: ellipsis;
    overflow: visible;
    margin: 0 auto;
  }

  p {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

export default AboutMe;
