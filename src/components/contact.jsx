import React, { useState } from "react";
import styled from "styled-components";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5001/api/email/send-contact-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSuccessMessage("Your message was sent successfully!");
        setErrorMessage(""); // Clear any previous error message
        setFormData({ name: "", email: "", message: "" }); // Clear the form
      } else {
        const errorData = await response.json();
        setErrorMessage(`Failed to send message: ${errorData.message}`);
        setSuccessMessage(""); // Clear any previous success message
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage("An error occurred while sending your message.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  return (
    <Container id="contact">
      <h2>Contact me here</h2>
      <p>If you have any questions, feel free to reach out!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button
          type="submit"
          disabled={!formData.name || !formData.email || !formData.message}
        >
          Send Message
        </button>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  button:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

export default Contact;
