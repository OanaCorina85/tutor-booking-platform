import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = () => {
    const sections = ["home", "about", "bookings", "contact"];
    const offsets = sections.map((id) => {
      const element = document.getElementById(id);
      return element ? element.getBoundingClientRect().top : Infinity;
    });

    const activeIndex = offsets.findIndex(
      (offset) => offset >= 0 && offset < window.innerHeight / 2
    );
    if (activeIndex !== -1) {
      setActiveSection(sections[activeIndex]);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Easy learning with Oana",
          text: "Check out this amazing learning platform!",
          url: window.location.href,
        })
        .then(() => console.log("Content shared successfully!"))
        .catch((error) => console.error("Error sharing content:", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <Container>
      <h2>Easy learning with Oana</h2>

      <ul>
        <li>
          <a href="#home">
            <button className={activeSection === "home" ? "active" : ""}>
              Home
            </button>
          </a>
        </li>
        <li>
          <a href="#about">
            <button className={activeSection === "about" ? "active" : ""}>
              About me
            </button>
          </a>
        </li>
        <li>
          <a href="#bookings">
            <button className={activeSection === "bookings" ? "active" : ""}>
              Book a lesson
            </button>
          </a>
        </li>
        <li>
          <a href="#contact">
            <button className={activeSection === "contact" ? "active" : ""}>
              Contact
            </button>
          </a>
        </li>
        <li>
          <button onClick={handleShare}>Share</button>
        </li>
      </ul>
    </Container>
  );
};

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: sticky;
  top: 0;
  background-color: #b5c8e5;
  z-index: 1000;
  padding: 1rem;

  h2 {
    flex: 1;
    text-align: left;
    color: #333;
    font-size: 1.5rem;
  }

  ul {
    display: flex;
    list-style-type: none;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin: 0;
    padding: 0;
  }

  button {
    background-color: #5489d8;
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }

  button.active {
    background-color: #143fc1;
    color: blanchedalmond;
    font-weight: bold;
    border: 2px solid #fff;
  }

  button:hover {
    background-color: #143fc1;
  }
`;

export default Navbar;
