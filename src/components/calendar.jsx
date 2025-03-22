import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker';
import TimeSlots from './time-slots';
import { useState } from 'react';
import styled from 'styled-components';

const CustomCalendar = ({ onDateSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClickDay = (date) => {
    setIsOpen(true);
    onDateSelect(date); // Transmite data selectată către SchedulePage
  };

  return (
    <>
      <Container>
        <Calendar onClickDay={handleOnClickDay} />
        <TimeSlots isOpen={isOpen} />
      </Container>
    </>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column; /* Așează elementele pe verticală */
  align-items: center; /* Centrează elementele */
  gap: 20px; /* Spațiu între calendar și sloturi */

  .react-calendar {
    background-color: rgba(5, 32, 44, 0.9);
    width: 500px;
    height: 350px;
    border-radius: 10px;
  }
`;

export default CustomCalendar;