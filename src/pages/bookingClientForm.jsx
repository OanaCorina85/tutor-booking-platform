// BookingForm.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppointmentsContext } from './appointmentsContext'; // Importă contextul
import styled from 'styled-components';

const BookingForm = () => {
  const { state } = useLocation(); // Accesăm datele trimise de HomePage
  const { selectedDate, selectedTime } = state || {}; // Extragem data și ora din state
  const [clientName, setClientName] = useState('');
  const { setAppointments } = useContext(AppointmentsContext); // Folosim contextul pentru a actualiza programările
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!clientName) {
      alert('Te rog completează numele!');
      return;
    }

    const newAppointment = {
      date: selectedDate.toLocaleDateString(),
      time: selectedTime,
      client: clientName,
    };

    // Verificăm dacă există programări salvate în localStorage
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    
    // Actualizăm lista de programări
    const updatedAppointments = [...savedAppointments, newAppointment];
    
    // Salvăm noile programări în context și în localStorage
    setAppointments(updatedAppointments); 
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    // Navigăm către SchedulePage
    navigate('/schedule');
  };

  return (
    <BookingContainer>
      <h3>Confirmă Lecția</h3>
      <p>Data: {selectedDate.toLocaleDateString()}</p>
      <p>Ora: {selectedTime}</p>
      <input
        type="text"
        placeholder="Numele clientului"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />
      <button onClick={handleSubmit}>Programează Lecția</button>
    </BookingContainer>
  );
};

const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default BookingForm;
