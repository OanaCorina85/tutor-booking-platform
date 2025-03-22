import React from 'react';
import styled from 'styled-components';

const TimeSlots = ({ isOpen, onTimeSelect }) => {
  const [timeSlots, setTimeSlots] = React.useState(
    Array(48)
      .fill(1)
      .map((_, index) => {
        const currentDate = new Date();
        const startHour = index / 2;
        const startMinutes = index % 2 === 0 ? 0 : 30;
        const endHour = (index + 1) / 2;
        const endMinutes = (index + 1) % 2 === 0 ? 0 : 30;
        const startDateTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDay(),
          startHour,
          startMinutes
        );
        const endDateTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDay(),
          endHour,
          endMinutes
        );
        const startLabel = startDateTime.toLocaleTimeString('ro', {
          hour: '2-digit',
          minute: '2-digit',
        });
        const endLabel = endDateTime.toLocaleTimeString('ro', {
          hour: '2-digit',
          minute: '2-digit',
        });
        return {
          startDateTime,
          endDateTime,
          isSelected: false,
          label: `${startLabel}  ${endLabel}`,
        };
      })
  );

  const handleOnTimeSlotClick = (value) => {
    console.log(value.startDateTime, value.endDateTime, value.label);
    setTimeSlots(
      timeSlots.map((timeSlot) => {
        if (
          timeSlot.startDateTime === value.startDateTime &&
          timeSlot.endDateTime === value.endDateTime
        ) {
          return { ...timeSlot, isSelected: !timeSlot.isSelected }; // Toggle the selection state
        }
        return timeSlot;
      })
    );

    // Trimite intervalul de timp selectat către părinte
    if (onTimeSelect) {
      onTimeSelect(value.label);
    }
  };

  return isOpen ? (
    <Container>
      {timeSlots.map((value, index) => (
        <p
          key={index}
          className={value.isSelected ? 'selected' : 'deselected'}
          onClick={() => handleOnTimeSlotClick(value)}
        >
          {value.label}
        </p>
      ))}
    </Container>
  ) : null;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding: 10px;
  background-color: #14b1fa;
  border-radius: 8px;
  max-width: 600px;
  gap: 10px;
  max-height: 600px;
  overflow-y: auto;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #14b1fa;
    cursor: pointer;
    border-radius: 5px;
    font-weight: 500;
  }

  p {
    color: #fff;
  }

  p:hover {
    background-color: #0004f3;
  }

  .selected {
    background-color: #fb0505; 
    font-weight: bold;
  }

  .deselected {
    background-color: #06fa4b;
  }
`;

export default TimeSlots;
