import React, { useContext } from "react"; // Import useContext
import { AppointmentsContext } from "./appointmentsContext"; // Import AppointmentsContext
import styled from "styled-components";

const SchedulePage = () => {
  const { appointments } = useContext(AppointmentsContext); // Use AppointmentsContext

  return (
    <Container>
      <h2>My Appointments</h2>
      {appointments && appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <Appointment key={index}>
            <p>
              <strong>Date:</strong> {appointment.date}
            </p>
            <p>
              <strong>Time:</strong> {appointment.time}
            </p>
            <p>
              <strong>Client:</strong> {appointment.client}
            </p>
          </Appointment>
        ))
      ) : (
        <p>No bookings yet.</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Appointment = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 5px;
  width: 80%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default SchedulePage;
