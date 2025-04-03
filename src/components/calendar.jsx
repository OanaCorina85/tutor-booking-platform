import React, { useState, useEffect, useMemo, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import BookingForm from "../pages/bookingForm"; // Import BookingForm component

const CustomCalendar = ({ onDateSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availability, setAvailability] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  // Define default time slots
  const defaultTimeSlots = useMemo(
    () => ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
    []
  );

  // Define booked slots
  const bookedSlots = {
    "2025-03-31": ["10:00 AM", "1:00 PM"],
    "2025-04-01": ["9:00 AM"],
  };

  // Generate availability for the next `n` months
  const generateAvailabilityForNextMonths = useCallback(
    (monthsAhead) => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();

      const newAvailability = {};

      for (let i = 0; i < monthsAhead; i++) {
        const currentMonth = (month + i) % 12;
        const currentYear = year + Math.floor((month + i) / 12);
        const daysInMonth = new Date(
          currentYear,
          currentMonth + 1,
          0
        ).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(currentYear, currentMonth, day)
            .toISOString()
            .split("T")[0];
          newAvailability[date] = [...defaultTimeSlots];
        }
      }

      return newAvailability;
    },
    [defaultTimeSlots]
  );

  // Initialize availability for the next 3 months
  useEffect(() => {
    const nextMonthsAvailability = generateAvailabilityForNextMonths(3);
    setAvailability(nextMonthsAvailability);
  }, [defaultTimeSlots, generateAvailabilityForNextMonths]);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Handle date click
  const handleOnClickDay = (date) => {
    const dateString = date.toISOString().split("T")[0];
    if (availability[dateString]) {
      setSelectedDate(dateString);
      setSelectedTime(null); // Reset selected time when a new date is selected
      setIsOpen(true);
      onDateSelect(date);
    }
  };

  // Handle time slot selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time); // Update selected time
  };

  // Check if a time slot is available
  const isTimeSlotAvailable = (date, time) => {
    const now = currentTime;
    const [hour, minute, period] = time.split(/[: ]/);
    const slotTime = new Date(date);
    slotTime.setHours(period === "PM" ? parseInt(hour) + 12 : parseInt(hour));
    slotTime.setMinutes(parseInt(minute));

    const isPast = slotTime < now;
    const isBooked = bookedSlots[date]?.includes(time);
    return !isPast && !isBooked;
  };

  // Highlight the current day
  const tileClassName = ({ date }) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    return isToday ? "highlight-today" : null;
  };

  // Disable dates (both unavailable and past dates)
  const isTileDisabled = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];
    const today = new Date();
    return !availability[dateString] || date < today.setHours(0, 0, 0, 0);
  };

  // Handle booking completion
  const handleBookingComplete = (bookingDetails) => {
    console.log("Booking completed:", bookingDetails);
    setIsOpen(false); // Close the time slots and form
    setSuccessMessage(
      `Lesson successfully booked for ${selectedDate} at ${selectedTime}!`
    ); // Set the success message
    setTimeout(() => setSuccessMessage(""), 5000); // Clear the message after 5 seconds
  };

  return (
    <>
      <CalendarContainer>
        <Calendar
          onClickDay={handleOnClickDay}
          tileDisabled={isTileDisabled}
          tileClassName={tileClassName}
          locale="en-UK"
        />
        {isOpen && (
          <>
            <TimeSlots>
              <h3>Available Time Slots for {selectedDate}</h3>
              <ul>
                {availability[selectedDate]?.map((time) => (
                  <li key={time}>
                    <button
                      onClick={() => handleTimeSelect(time)} // Set selected time
                      disabled={!isTimeSlotAvailable(selectedDate, time)}
                    >
                      {time}
                    </button>
                  </li>
                ))}
              </ul>
            </TimeSlots>
            <BookingForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onBook={handleBookingComplete} // Pass the function to handle booking completion
            />
            {selectedDate && selectedTime && (
              <p>
                Selected Date: {selectedDate}, Selected Time: {selectedTime}
              </p>
            )}
          </>
        )}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </CalendarContainer>
    </>
  );
};

export const CalendarContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: auto;
  min-height: 100vh;
  margin: 0 auto;
  gap: 20px;
  padding: 1rem;
  overflow-y: visible;
  background-color:#b5c8e5;
  
  .react-calendar {
    background-color: rgba(11, 58, 78, 0.9);
    width: 100vh;
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    margin: 20px 0;
    color: white;
  }
  .highlight-today {
    background-color: #ffcc00 !important; /* Highlight color for today */
    color: #000 !important; /* Text color for today */
    font-weight: bold;
  }
`;

export const TimeSlots = styled.div`
  margin-top: 20px;
  text-align: center;

  h3 {
    margin-bottom: 10px;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
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

export const SuccessMessage = styled.p`
  color: green;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: center;
`;

export default CustomCalendar;
