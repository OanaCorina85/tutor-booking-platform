import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const BookingForm = ({ selectedDate, selectedTime, onBook }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [localSelectedTime, setLocalSelectedTime] = useState(
    selectedTime || ""
  ); // Default to an empty string
  const [errorMessage, setErrorMessage] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const availableTimes = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"];

  const formRef = useRef(null);

  useEffect(() => {
    if (selectedDate && selectedTime && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/booked-slots?date=${selectedDate}`
        );
        const data = await response.json();
        setBookedSlots(data.bookedSlots);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    if (selectedDate) {
      fetchBookedSlots();
    }
  }, [selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localSelectedTime) {
      setErrorMessage("Please select a time.");
      return;
    }

    const bookingDetails = {
      name: formData.name,
      email: formData.email,
      date: selectedDate || "2025-04-01",
      time: localSelectedTime,
      message: formData.message,
    };

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

      if (response.ok) {
        setSuccessMessage("Booking request sent successfully!");
        setErrorMessage("");
        onBook(bookingDetails);
      } else {
        const errorData = await response.json();
        setErrorMessage(`Failed to send booking request: ${errorData.message}`);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error sending booking request:", error);
      setErrorMessage("An error occurred while sending the booking request.");
      setSuccessMessage("");
    }
  };

  if (!selectedDate) {
    return (
      <FormContainer>
        <h3>Please select a date to book your lesson.</h3>
      </FormContainer>
    );
  }

  return (
    <FormContainer ref={formRef}>
      <h3>Confirm Your Appointment</h3>
      <p>
        <strong>Date:</strong> {selectedDate || "2025-04-01"}
      </p>
      <p>
        <strong>Time:</strong> {localSelectedTime || "Not selected"}
      </p>
      <form onSubmit={handleSubmit}>
        <select
          value={localSelectedTime}
          onChange={(e) => setLocalSelectedTime(e.target.value)}
        >
          <option value="" disabled>
            Select a time
          </option>
          {availableTimes.map((time) => (
            <option
              key={time}
              value={time}
              disabled={bookedSlots.includes(time)}
            >
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
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
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
  textarea,
  select {
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
