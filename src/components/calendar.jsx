import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import BookingForm from "../pages/bookingForm";

const CustomCalendar = ({ onDateSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availability, setAvailability] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState("");

  const calendarRef = useRef(null); // Create a ref for the calendar container

  const defaultTimeSlots = useMemo(
    () => ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
    []
  );

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
          const date = new Date(
            Date.UTC(currentYear, currentMonth, day)
          ).toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
          newAvailability[date] = [...defaultTimeSlots];
        }
      }

      return newAvailability;
    },
    [defaultTimeSlots]
  );

  useEffect(() => {
    const nextMonthsAvailability = generateAvailabilityForNextMonths(3);
    setAvailability(nextMonthsAvailability);
  }, [defaultTimeSlots, generateAvailabilityForNextMonths]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleOnClickDay = (date) => {
    const dateString = date.toLocaleDateString("en-CA");
    if (availability[dateString]) {
      setSelectedDate(dateString);
      setSelectedTime(null);
      setIsOpen(true);

      // Scroll to the calendar section
      if (calendarRef.current) {
        calendarRef.current.scrollIntoView({ behavior: "smooth" });
      }

      onDateSelect(date);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const isTimeSlotAvailable = (date, time) => {
    const now = currentTime;
    const [hour, minute, period] = time.split(/[: ]/);
    const slotTime = new Date(date);
    slotTime.setHours(period === "PM" ? parseInt(hour) + 12 : parseInt(hour));
    slotTime.setMinutes(parseInt(minute));

    const isPast = slotTime < now;
    const isBooked = !availability[date]?.includes(time); // Check if the time is not in the available slots
    return !isPast && !isBooked;
  };

  const handleBookingComplete = (bookingDetails) => {
    console.log("Booking completed:", bookingDetails);

    setAvailability((prevAvailability) => {
      const updatedAvailability = { ...prevAvailability };
      updatedAvailability[selectedDate] = updatedAvailability[
        selectedDate
      ].filter((time) => time !== selectedTime);
      console.log("Updated availability:", updatedAvailability); // Debugging
      return updatedAvailability;
    });

    setIsOpen(false);
    setSuccessMessage(
      `Lesson successfully booked for ${selectedDate} at ${selectedTime}!`
    );
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <>
      <CalendarContainer ref={calendarRef}>
        {/* Always display this message */}
        <p>Select a date and time for your lesson.</p>

        <Calendar
          onClickDay={handleOnClickDay}
          tileDisabled={({ date }) =>
            !availability[date.toLocaleDateString("en-CA")] ||
            date < new Date().setHours(0, 0, 0, 0)
          }
          tileClassName={({ date }) =>
            date.toDateString() === new Date().toDateString()
              ? "highlight-today"
              : null
          }
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
                      onClick={() => handleTimeSelect(time)}
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
              onBook={handleBookingComplete}
              setSuccessMessage={setSuccessMessage} // Pass the function here
            />
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
  padding: 20px;
  overflow-y: visible;
  background-color: #b5c8e5;

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

export const StyledMessage = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  background-color: #f0f8ff; /* Light background for emphasis */
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export default CustomCalendar;
