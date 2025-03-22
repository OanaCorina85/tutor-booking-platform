import React from 'react';
import { AppointmentsContext } from './appointmentsContext';
import styled from 'styled-components';

const SchedulePage = () => {
  const { appointments } = useContext(AppointmentsContext);

  return (
    <Container>
      <h2>Programările tale</h2>
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <Appointment key={index}>
            <p>Data: {appointment.date}</p>
            <p>Ora: {appointment.time}</p>
            <p>Client: {appointment.client}</p>
          </Appointment>
        ))
      ) : (
        <p>Noi programări făcute.</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Appointment = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 5px;
  width: 80%;
`;

export default SchedulePage;

