// src/context/appointmentsContext.js
import React, { createContext, useState, useContext } from 'react';

const AppointmentsContext = createContext();

// Hook personalizat pentru a utiliza contextul
export const useAppointments = () => {
  return useContext(AppointmentsContext);
};

// Provider pentru a furniza contextul în aplicație
export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  return (
    <AppointmentsContext.Provider value={{ appointments, setAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export { AppointmentsContext };
