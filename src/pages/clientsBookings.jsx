import React, { useContext } from "react";
import { AppointmentsContext } from "./appointmentsContext";

const SchedulePage = () => {
  const { appointments } = useContext(AppointmentsContext); // Access appointments from context

  return (
    <div>
      <h2>My Appointments</h2>
      {/* Render appointments */}
      {appointments.map((appointment, index) => (
        <div key={index}>
          <p>Date: {appointment.date}</p>
          <p>Time: {appointment.time}</p>
        </div>
      ))}
    </div>
  );
};

export default SchedulePage;
