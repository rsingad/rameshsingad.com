import About from "./about";

import Contact from "./contact";
import Education from "./education";
import Experience from "./experience";
import Footer from "./footer";
import Home from "./home";
import Project from "./project/project";
import Skill from "./skill/Skill";

import { Helmet } from "react-helmet-async";

function MainPage() {
  return (
    <>
      <Helmet>
        <title>Ramesh Singad | Portfolio - Full-Stack Software Engineer</title>
        <meta name="description" content="Explore Ramesh Singad's official portfolio. A comprehensive display of projects, skills, education, and professional experience in software engineering and AI." />
        <meta name="keywords" content="Ramesh Singad, Software Engineer, Portfolio, Full-Stack Developer, AI, React, Node.js" />
      </Helmet>

      <Home />
      <About />
      <Education />
      <Skill />
      <Experience />
      <Project />
      <Contact />

    </>
  );
}
export default MainPage;
