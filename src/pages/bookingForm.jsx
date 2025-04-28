import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styled from "styled-components";
import "react-calendar/dist/Calendar.css"; // Import default styles

const BookingForm = ({
  selectedDate,
  selectedTime,
  onBook,
  setSuccessMessage,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const [localSelectedTime, setLocalSelectedTime] = useState(
    selectedTime || ""
  );
  const [bookedSlots, setBookedSlots] = useState([]);
  const availableTimes = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"];

  const formRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    setLocalSelectedTime(selectedTime || "");
  }, [selectedTime]);

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

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setBookedSlots(data.bookedSlots);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
        setErrorMessage(
          "Failed to fetch booked slots. Please try again later."
        );
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

    if (
      !formData.name ||
      !formData.email ||
      !selectedDate ||
      !localSelectedTime
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const bookingDetails = {
      name: formData.name,
      email: formData.email,
      date: selectedDate || "2025-04-01",
      time: localSelectedTime,
      message: formData.message,
    };

    console.log("Booking details being sent:", bookingDetails);

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
        const contentType = response.headers.get("Content-Type");
        let errorMessage = "Failed to send booking request";

        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }

        console.error("Error response from server:", errorMessage);
        setErrorMessage(errorMessage);
        return;
      }

      setSuccessMessage("Booking request sent successfully!");
      setErrorMessage("");
      onBook(bookingDetails);
      setIsBookingComplete(true); // Mark the booking as complete
    } catch (error) {
      console.error("Error sending booking request:", error);
      setErrorMessage(
        "Failed to send booking request. Please try again later."
      );
    }
  };

  if (isBookingComplete) {
    console.log("Rendering booking complete message...");
    return (
      <FormContainer>
        <h3>Booking request sent successfully!</h3>
        <p>Do you want to book another lesson?</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <YesButton
            onClick={() => {
              console.log("Resetting booking state...");
              setIsBookingComplete(false); // Reset the state
            }}
          >
            Yes
          </YesButton>
          <NoButton
            onClick={() => {
              console.log("Redirecting to home...");
              navigate("/"); // Redirect to the home page
            }}
          >
            No
          </NoButton>
        </div>
      </FormContainer>
    );
  }

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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </FormContainer>
  );
};

const YesButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #28a745; /* Green for Yes */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838; /* Darker green on hover */
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const NoButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #dc3545; /* Red for No */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333; /* Darker red on hover */
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const FormContainer = styled.div`
  background-color: transparent;
  border-radius: 10px;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  text-align: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 700px;
  height: auto;
  overflow: visible;
  padding: 1rem;
  margin: 0 auto;
  flex-direction: column;
  z-index: 1;

  h3 {
    margin-bottom: 1rem;
    color: black;
    background-color: rgba(203, 236, 232, 0.8);
    padding: 5px;
    font-size: 1.5rem;
    text-align: center;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* Optional shadow for better readability */
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
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* Optional shadow for better readability */
    font-size: 1.2rem;
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
    background-color: rgba(203, 236, 232, 0.8);
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
