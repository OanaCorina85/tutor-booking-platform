import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  memo,
} from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import BookingForm from "../pages/bookingForm";

const CustomCalendar = memo(({ onDateSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availability, setAvailability] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const calendarRef = useRef(null); // Create a ref for the calendar container

  const monthlyBackgrounds = useMemo(
    () => ({
      0: "/images/january.jpg", // January
      1: "/images/february.jpg", // February
      2: "/images/march.jpg", // March
      3: "/images/april.jpg", // April
      4: "/images/may.jpg", // May
      5: "/images/june.jpg", // June
      6: "/images/july.jpg", // July
      7: "/images/august.jpg", // August
      8: "/images/september.jpg", // September
      9: "/images/october.jpg", // October
      10: "/images/november.jpg", // November
      11: "/images/december.jpg", // December
    }),
    []
  );

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

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const backgroundImage = monthlyBackgrounds[currentMonth];
    if (calendarRef.current) {
      calendarRef.current.style.backgroundImage = `url(${backgroundImage})`;
      calendarRef.current.style.backgroundSize = "cover";
      calendarRef.current.style.backgroundPosition = "center";
    }
  }, [currentMonth, monthlyBackgrounds]);

  useEffect(() => {
    const backgroundImage = monthlyBackgrounds[currentMonth];
    if (calendarRef.current) {
      calendarRef.current.style.backgroundImage = `url(${backgroundImage})`;
      calendarRef.current.style.backgroundSize = "cover";
      calendarRef.current.style.backgroundPosition = "center";
    }
  }, [currentMonth, monthlyBackgrounds]);

  useEffect(() => {
    console.log("Current month updated:", currentMonth); // Debugging
  }, [currentMonth]);

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
      ].filter((time) => time !== selectedTime); // Remove the booked slot

      return updatedAvailability;
    });

    setIsOpen(false);
    setIsBookingComplete(true); // Mark the booking as complete
    setSuccessMessage(
      `Lesson successfully booked for ${selectedDate} at ${selectedTime}!`
    );
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const getTextColorBasedOnBackground = (backgroundColor) => {
    const rgb = backgroundColor.match(/\d+/g);
    if (!rgb || rgb.length !== 3) return "#000000";

    const brightness =
      (parseInt(rgb[0]) * 299 +
        parseInt(rgb[1]) * 587 +
        parseInt(rgb[2]) * 114) /
      1000;

    return brightness > 128 ? "#000000" : "#ffffff";
  };

  // Apply the color dynamically
  const backgroundColor = "rgb(214, 98, 98)"; // Replace with your dynamic background color
  const textColor = getTextColorBasedOnBackground(backgroundColor);

  return (
    <>
      <CalendarContainer ref={calendarRef}>
        <CalendarHeading $textcolor={textColor}>
          Select a date and time for your lesson.
        </CalendarHeading>

        <StyledCalendar
          className="custom-calendar"
          onClickDay={handleOnClickDay}
          onActiveStartDateChange={({ activeStartDate }) => {
            const newMonth = activeStartDate.getMonth(); // Get the new month (0-11)
            setCurrentMonth(newMonth); // Update the currentMonth state
          }}
          tileDisabled={({ date }) => {
            const today = new Date().setHours(0, 0, 0, 0);
            const tileDate = new Date(date).setHours(0, 0, 0, 0);
            return tileDate < today; // Disable past dates
          }}
          locale="en-UK"
        />

        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        {isBookingComplete ? (
          <div>
            <StyledPrompt>Would you like to book another lesson?</StyledPrompt>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <YesButton
                onClick={() => {
                  setIsBookingComplete(false); // Reset the booking process
                  setSelectedDate(null); // Clear the selected date
                  setSelectedTime(null); // Clear the selected time
                  setCurrentMonth(new Date().getMonth()); // Reset the current month
                  setAvailability(generateAvailabilityForNextMonths(3)); // Regenerate availability

                  if (calendarRef.current) {
                    calendarRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll back to the calendar
                  }
                }}
              >
                Yes
              </YesButton>
              <NoButton
                onClick={() => {
                  setIsBookingComplete(false); // Reset the booking process
                  if (calendarRef.current) {
                    calendarRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                  window.location.hash = "#home"; // Redirect to the home section
                }}
              >
                No
              </NoButton>
            </div>
          </div>
        ) : (
          <>
            {isOpen && (
              <>
                <TimeSlots>
                  <StyledParagraph $textcolor={textColor}>
                    Available Time Slots for {selectedDate}
                  </StyledParagraph>
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
                  setSuccessMessage={setSuccessMessage}
                />
              </>
            )}
          </>
        )}
      </CalendarContainer>
    </>
  );
});

const StyledCalendar = styled(Calendar)`
  &.react-calendar {
    width: 100%;
    max-width: 600px;
    background-color: #a8c4df;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 0 auto;
    font-size: 1.2rem;
    color: #2062ad;
    text-align: center;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(136, 135, 135, 0.7); /* Optional shadow for better readability */
    font-family: Arial, sans-serif;
  }

  .react-calendar__navigation {
    display: flex;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: #5489d8;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }
  .react-calendar__navigation button {
    background-color: #5489d8;
    color: #2e2b2b;
    font-weight: bold;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 10px;
    transition: background-color 0.3s ease;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .react-calendar__navigation button:hover {
    background-color: #143fc1;
    text-size-adjust: 1.5rem;
    color: #2b2929;
    transform: scale(1.05);
  }

  .react-calendar__tile {
    background-color: #a8c4df;
    color: #292727;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  .react-calendar__tile-- {
    background-color: #d8d654;
    color: #2b2929;
    border-radius: 5px;
    padding: 10px;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .react-calendar__tile--disabled {
    color: #8d8b8b;
    opacity: 0.5;
    text-decoration: line-through;
    border: 1px dashed #ccc;
    cursor: not-allowed;
  }
  .react-calendar__tile--disabled:hover {
    background-color: #a9afb4;
    color: #d88181;
    cursor: not-allowed;
  }

  .react-calendar__tile:hover:not(:disabled) {
    background-color: #4188cf;
    color: #ebecf1;
  }

  .react-calendar__tile--active {
    background-color: #5489d8;
    color: #f1e5e5;
    border-radius: 5px;
    padding: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .react-calendar__tile--now {
    background-color: #ffcc00; /* Bright yellow background */
    color: #333; /* Dark text color for contrast */
    font-weight: bold; /* Make the text bold */
    border: 2px solid #ff9900; /* Add a border for emphasis */
    transform: scale(1.1); /* Slightly enlarge the tile */
    transition: transform 0.2s ease, background-color 0.3s ease;
  }

  .react-calendar__tile--now:hover {
    background-color: #ff9900; /* Darker yellow on hover */
    color: #fff; /* White text on hover */
    transform: scale(1.15); /* Slightly enlarge on hover */
  }
`;

export const CalendarContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  min-height: 100vh;
  margin: 0 auto;
  gap: 20px;
  overflow-y: auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Fixed background for parallax effect */
  color: #007bff;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1; /* Ensure it appears above the background */
`;

export const TimeSlots = styled.div`
  margin-top: 20px;
  text-align: center;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap; /* Allow wrapping of items */
    justify-content: center;
    gap: 10px;
    font-size: 1.2rem;
  }

  button {
    flex: 1 1 calc(33.33% - 10px); /* Default: 3 buttons per row */
    max-width: 150px;
    min-width: 80px;
    font-size: clamp(0.8rem, 2.5vw, 1.2rem); /* Responsive font size */
    background-color: rgba(0, 123, 255, 0.8);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:disabled {
      background-color: rgba(204, 204, 204, 0.8);
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: rgba(0, 86, 179, 0.9);
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      flex: 1 1 calc(50% - 10px); /* 2 buttons per row for tablets */
    }

    @media (max-width: 480px) {
      flex: 1 1 calc(100% - 10px); /* 1 button per row for small screens */
    }
  }
`;

export const SuccessMessage = styled.p`
  color: #0b1cb8;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: center;
  font-weight: bold;
  background-color: rgba(203, 236, 232, 0.8);
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  transition: all 0.3s ease-in-out;
  opacity: 1;
`;

const BaseText = styled.p`
  color: ${(props) => props.$textcolor || "#913030"};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  background-color: rgba(203, 236, 232, 0.8);
  padding: 10px 15px;
  border-radius: 8px;
  display: inline-block;
  margin: 10px 0;
  font-size: ${(props) => props.$fontsize || "1.2rem"};
  font-weight: bold;
`;

export const StyledParagraph = BaseText;
export const CalendarHeading = styled(BaseText).attrs({ as: "h3" })``;

const StyledPrompt = styled(BaseText).attrs({ as: "p" })``;

const YesButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const NoButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default CustomCalendar;
