import { useState, useEffect, useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "../components/navBar";
import Footer from "../components/footer";
import CustomCalendar from "../components/calendar"; // Calendar component
import BookingForm from "../pages/bookingForm"; // BookingForm component
import TimeSlots from "../components/time-slots"; // TimeSlots component
import Contact from "../components/contact"; // Contact component

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
  const [selectedTime, setSelectedTime] = useState(null); // State to store selected time
  const [showVideo, setShowVideo] = useState(false); // State to control video visibility
  const [appointments, setAppointments] = useState([]); // State to store appointments

  // Memoizează funcția loadAppointments cu useCallback
  const loadAppointments = useCallback(() => {
    return JSON.parse(localStorage.getItem("appointments")) || [];
  }, []);

  useEffect(() => {
    loadAppointments(); // Apelează funcția memoizată
  }, [loadAppointments]); // Adaugă loadAppointments în array-ul de dependențe

  // Save a new booking to localStorage
  const handleBooking = (date, time) => {
    const newAppointment = {
      date: date.toLocaleDateString(),
      time,
      client: "Client Name",
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Navbar /> {/* Navbar remains at the top */}
        <HeroSection id="home">
          {" "}
          {/* Add id here */}
          <BackgroundImage src="/backgroundImage.jpeg" alt="Background" />
          <TextContainer>
            <h1>Welcome to my Platform</h1>
            <p>Book your lessons with ease!</p>
          </TextContainer>
          {!showVideo && (
            <PlayButton onClick={() => setShowVideo(true)}>▶</PlayButton>
          )}
          {showVideo && (
            <VideoContainer>
              <CloseButton onClick={() => setShowVideo(false)}>✖</CloseButton>
              <VideoPlayer controls autoPlay>
                <source src="/oana-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </VideoPlayer>
            </VideoContainer>
          )}
        </HeroSection>
        <AboutSection id="about">
          <AvatarImage src="/avatar.jpg" alt="Avatar" />
          <h1>About Me</h1>
          <p>
            By now, you probably had some formal lessons in schools or special
            courses. Now it's time to practice the theory and start speaking! I
            am here to help you improve your speaking skills through practice.
            Conversation practice based on nice and funny topics. I cannot wait
            to teach you this beautiful language!
          </p>
        </AboutSection>
        <CalendarSection id="bookings">
          <CustomCalendar onDateSelect={setSelectedDate} />
          {selectedDate && (
            <TimeSlots
              selectedDate={selectedDate}
              onTimeSelect={setSelectedTime}
            />
          )}
          {selectedDate && selectedTime && (
            <BookingForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onBook={handleBooking}
            />
          )}
        </CalendarSection>
        <Contact id="contact" />
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

  }

  html {
    scroll-behavior: smooth;
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

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh; /* Full viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const TextContainer = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: #ffcc00; /* Change this to the desired color */
  font-family: "Arial", sans-serif;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Optional shadow for better readability */
  }

  p {
    font-size: 1.5rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* Optional shadow for better readability */
  }
`;

const PlayButton = styled.button`
  position: relative;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoContainer = styled.div`
  position: relative;
  z-index: 3;
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;

  &:hover {
    background-color: rgba(19, 18, 18, 0.29);
  }
`;

const AboutSection = styled.section`
  position: relative; /* Ensure the section is the positioning context */
  width: 100%;
  height: 100vh; /* Full viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #b5c8e5;
  text-align: center;
  color: #333;
  padding: 2rem;
  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* Optional shadow for better readability */
  }
  p {
    font-size: 1.2rem;
    max-width: 500px; /* Limit the width of the paragraph */
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* Optional shadow for better readability */
  }
  border-radius: 10px; /* Optional rounded corners */
`;

const AvatarImage = styled.img`
  position: absolute; /* Position it absolutely within the section */
  z-index: 2; /* Ensure it's above the background */
  top: 75px; /* Move it above the AboutSection */
  left: 50%;
  transform: translateX(-50%); /* Center it horizontally */
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #fff; /* Optional border for better visibility */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Optional shadow for better styling */
`;

const CalendarSection = styled.section`
  padding: 2rem;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  flex-direction: column; /* Stack children vertically */
  background-color: #b5c8e5;
  text-align: center;
  color: #333;
  height: auto; /* Full viewport height */
`;

const Button = styled.button`
  /* margin: 1rem; */
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;
const BookingFormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 700px; /* Optional: Limit the width */
  min-height: fit-content; /* Allow the height to adjust dynamically */
  overflow: auto; /* Ensure content is not clipped */
  padding: 1.5rem;
  margin: 0 auto;

  h3 {
    margin-bottom: 1rem;
    color: #333;
    background-color: #f0f0f0;
    padding: 10px;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #555;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }

  button {
    padding: 0.8rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  button:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;
const SuccessMessage = styled.p`
  color: green;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const FormContainer = styled.div`
  position: relative;
  z-index: 1000;
`;

export default HomePage;
