import React, { useState } from "react";
import styled from "styled-components";

const BookingForm = ({
  selectedDate,
  selectedTime,
  setSelectedTime,
  onBook,
  setSuccessMessage,
  availability,
  formRef, // Use the formRef passed from CustomCalendar
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !selectedDate || !selectedTime) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const bookingDetails = {
      name: formData.name,
      email: formData.email,
      date: selectedDate,
      time: selectedTime,
      message: formData.message,
    };

    console.log("Sending booking request:", bookingDetails);

    try {
      const response = await fetch(
        "http://localhost:5001/api/email/send-booking-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Parse the response as JSON
        setErrorMessage(errorData.message || "An error occurred."); // Extract the message field
        return;
      }

      setSuccessMessage("Booking request sent successfully!");
      onBook(bookingDetails);
    } catch {
      setErrorMessage(
        "Failed to send booking request. Please try again later."
      );
    }
  };

  return (
    <FormContainer ref={formRef}>
      <h3>Confirm Your Appointment</h3>
      <p>
        <strong>Date:</strong> {selectedDate || "Not selected"}
      </p>
      <p>
        <strong>Time:</strong> {selectedTime || "Not selected"}
      </p>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedTime || ""} // Ensure the value is not undefined
          onChange={(e) => {
            // console.log("Time selected:", e.target.value); // Debug log
            setSelectedTime(e.target.value); // Update the selectedTime state
          }}
        >
          <option value="" disabled>
            Select a time
          </option>
          {availability?.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
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
          placeholder="Lesson type (e.g., grammar, conversation, specific topics)"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button
          type="submit"
          disabled={!formData.name || !formData.email || !formData.message}
        >
          Confirm Booking
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  background-color: transparent;
  border-radius: 10px;
  text-align: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 700px;
  height: auto;
  overflow: visible;
  padding: 1.5rem;
  margin: 0 auto;
  flex-direction: column;
  z-index: 1;
  overflow: visible;
  position: relative;
  object-fit: cover;

  h3 {
    margin-bottom: 1rem;
    color: black;
    background-color: rgba(203, 236, 232, 0.8);
    padding: 5px;
    font-size: 1.5rem;
    text-align: center;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    border-radius: 5px;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: black;
    background-color: transparent;
    padding: 5px;
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
    border-radius: 5px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
    font-size: 1.2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
    height: auto;
    overflow-y: visible;
    margin: 0 auto;
    padding: 1rem;
    background-color: rgba(203, 236, 232, 0.8);
    color: black;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #ccc;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
  input:focus,
  textarea:focus,
  select:focus {
    border-color: #007bff;
    outline: none;
  }
  textarea {
    height: 100px;
    resize: none;
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
