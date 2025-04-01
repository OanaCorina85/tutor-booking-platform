import React, { useState } from "react";
import styled from "styled-components";

const BookingForm = ({ selectedDate, selectedTime, onBook }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isFormVisible] = useState(true); // To toggle form visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingDetails = {
      name: formData.name,
      email: formData.email,
      date: selectedDate,
      time: selectedTime,
      message: formData.message,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/send-booking-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingDetails),
        }
      );

      if (response.ok) {
        onBook(bookingDetails); // Call the onBook function to handle success
        alert("Booking request sent successfully!");
      } else {
        alert("Failed to send booking request.");
      }
    } catch (error) {
      console.error("Error sending booking request:", error);
      alert("An error occurred while sending the booking request.");
    }
  };

  // Check if selectedDate and selectedTime are available
  if (!selectedDate || !selectedTime) {
    return (
      <FormContainer>
        <h3>Please select a date and time to book your lesson.</h3>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <h3>Confirm Your Appointment</h3>
      <p>
        <strong>Date:</strong> {selectedDate}
      </p>
      <p>
        <strong>Time:</strong> {selectedTime}
      </p>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <textarea
            name="message"
            id="message"
            placeholder="Lesson type (e.g., grammar, conversation, specific topics)"
            value={formData.message}
            onChange={handleChange}
            required
            autoComplete="off"
          ></textarea>
          <button
            type="submit"
            disabled={!formData.name || !formData.email || !formData.message}
          >
            Confirm Booking
          </button>
        </form>
      )}
    </FormContainer>
  );
};

const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 700px;
  height: auto;
  overflow: visible;
  padding: 1.5rem;
  margin: 0 auto;

  h3 {
    margin-bottom: 1rem;
    color: #333;
    background-color: #f0f0f0;
    padding: 5px;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #555;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
    height: auto; /* Allow the form to grow dynamically */
    overflow-y: visible; /* Ensure content is not clipped */
    margin: 0 auto;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #ccc;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }

  button {
    padding: 0.8rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  button:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

export default BookingForm;
