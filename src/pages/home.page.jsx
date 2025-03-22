import { useState, useEffect, useContext, useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from '../components/navBar';
import Footer from '../components/footer';
import AboutMe from '../components/about-me';
import CustomCalendar from '../components/calendar'; // Calendar component
import BookingForm from './bookingClientForm';
import SchedulePage from './programariClienti';
import TimeSlots from '../components/time-slots'; // TimeSlots component
import { AppointmentsContext } from './appointmentsContext';

const HomePage = () => {
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const [showSchedule, setShowSchedule] = useState(false); // State to toggle between pages
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
  const [selectedTime, setSelectedTime] = useState(null); // State to store selected time

  // Memoizează funcția loadAppointments cu useCallback
  const loadAppointments = useCallback(() => {
    const savedAppointments =
      JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(savedAppointments);
  }, [setAppointments]); // Adaugă setAppointments în array-ul de dependențe

  useEffect(() => {
    loadAppointments(); // Apelează funcția memoizată
  }, [loadAppointments]); // Adaugă loadAppointments în array-ul de dependențe

  // Save a new booking to localStorage
  const handleBooking = (date, time) => {
    const newAppointment = {
      date: date.toLocaleDateString(),
      time,
      client: 'Client Name',
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Navbar />
        <Container>
          <LeftSide>
            <AboutMe />
            <Button onClick={() => setShowSchedule(false)}>Programează Lecția</Button>
            <Button onClick={() => setShowSchedule(true)}>Vezi Programările</Button>
          </LeftSide>
          <RightSide>
            {showSchedule ? (
              <SchedulePage
                appointments={appointments}
                selectedTime={selectedTime}
              />
            ) : (
              <>
                <CustomCalendar onDateSelect={setSelectedDate} />{' '}
                {selectedDate && (
                  <TimeSlots
                    selectedDate={selectedDate}
                    onTimeSelect={setSelectedTime} // Handle selected time
                  />
                )}
                {selectedDate && selectedTime && (
                  <BookingForm
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onBook={handleBooking}
                  />
                )}
              </>
            )}
          </RightSide>
        </Container>
        <Footer />
      </MainContainer>
    </>
  );
};

// Stiluri globale
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
    overflow-x: hidden;
  }

  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

// Stiluri pentru HomePage
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.main`
  display: flex;
  justify-content: space-between;
  background-color: rgba(73, 197, 254, 0.9);
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem;
  color: rgba(65, 52, 52, 0.9);
  min-height: 100vh;
  overflow-y: auto;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
  gap: 10px;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #007bff;
  background-color: transparent;
  border: 2px solid #007bff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-align: center;

  &:hover {
    color: white;
    background-color: #007bff;
    transform: scale(1.05);
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 20px;
  width: 60%;
  padding-left: 20px;
`;

const BookButton = styled.button`
  padding: 14px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

export default HomePage;


