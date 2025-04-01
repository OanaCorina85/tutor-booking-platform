import React from "react";
import styled from "styled-components";

const Contact = () => {
  return (
    <Container id="contact">
      <h2>Contact me here</h2>
      <p>If you have any questions, feel free to reach out!</p>
      <form>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  margin: 0;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #b5c8e5;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #555;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 500px;
    background-color: #ffffff; /* Add background color here */
    padding: 1.5rem; /* Add padding for spacing inside the form */
    border-radius: 10px; /* Optional: Add rounded corners */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better styling */
  }
  input,
  textarea {
    width: 100%;
    padding: 0.9rem;
    border: 1px solid white;
    border-radius: 5px;
    font-size: 1rem;
  }

  button {
    padding: 0.8rem;
    background-color: #5489d8;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

export default Contact;
