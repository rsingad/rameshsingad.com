import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import Home from "./home";

const About = lazy(() => import("./about"));
const Education = lazy(() => import("./education"));
const Skill = lazy(() => import("./skill/Skill"));
const Experience = lazy(() => import("./experience"));
const Project = lazy(() => import("./project/project"));
const Contact = lazy(() => import("./contact"));

const SectionLoader = () => (
  <div className="w-full h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function MainPage() {
  return (
    <>
      <Helmet>
        <title>Ramesh Singad | Portfolio - Full-Stack Software Engineer</title>
        <meta name="description" content="Explore Ramesh Singad's official portfolio. A comprehensive display of projects, skills, education, and professional experience in software engineering and AI." />
        <meta name="keywords" content="Ramesh Singad, Software Engineer, Portfolio, Full-Stack Developer, AI, React, Node.js" />
      </Helmet>

      <Home />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Education />
        <Skill />
        <Experience />
        <Project />
        <Contact />
      </Suspense>
    </>
  );
}
export default MainPage;
