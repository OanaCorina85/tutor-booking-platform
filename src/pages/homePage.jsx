import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "../components/navBar";
import Footer from "../components/footer";
import CustomCalendar from "../components/calendar"; // Calendar component
import Contact from "../components/contact"; // Contact component
import { AboutMeContainer, AvatarImg } from "../components/aboutMe";
import CalendarContainer from "../components/calendar"; // CalendarContainer component

const HomePage = () => {
  const [showVideo, setShowVideo] = useState(false); // State to control video visibility

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Navbar /> {/* Navbar remains at the top */}
        <HeroSection id="home">
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
        <AboutMeContainer id="about">
          <AvatarImg src="/avatar.jpg" alt="Avatar" />
          <h1>About Me</h1>
          <p>
            By now, you probably had some formal lessons in schools or special
            courses. Now it's time to practice the theory and start speaking! I
            am here to help you improve your speaking skills through practice.
            Conversation practice based on nice and funny topics. I cannot wait
            to teach you this beautiful language!
          </p>
        </AboutMeContainer>
        <CalendarContainer id="bookings">
          <CustomCalendar/>
        </CalendarContainer>
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

export default HomePage;
