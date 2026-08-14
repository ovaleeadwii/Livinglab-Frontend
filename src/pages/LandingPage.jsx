/* eslint-disable no-unused-vars */
import React from "react";
import Hero from "../components/LandingPage/Hero";
import Divider from "../components/LandingPage/Divider";
import About from "../components/LandingPage/About";
import Team from "../components/LandingPage/Team";
import Contact from "../components/LandingPage/Contact";
import Navbar from "../components/Navbar";
import NavbarResponsive from "../components/Responsive/NavbarResponsive";
import NavbarBimbingan from "../components/Bimbingan/BimbinganNavbar";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <NavbarResponsive />
      <Hero />
      <Divider />
      <About />
      <Team />
      <Contact />
    </div>
  );
};

export default LandingPage;
