// filepath: c:\Users\40753\OneDrive\Desktop\Documentatie SDA\14_Final Project\tutor-booking-platform-2\src\context\AppointmentsContext.jsx
import React, { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AppointmentsContext = createContext();

const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([
    { date: "2025-04-02", time: "10:00 AM", client: "John Doe" },
    { date: "2025-04-03", time: "2:00 PM", client: "Jane Smith" },
  ]);

  return (
    <AppointmentsContext.Provider value={{ appointments, setAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export default AppointmentsProvider;
