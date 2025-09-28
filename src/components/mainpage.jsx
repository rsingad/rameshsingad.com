import About from "./about";

import Contact from "./contact";
import Education from "./education";
import Experience from "./experience";
import Footer from "./footer";
import Home from "./home";
import Project from "./project/project";
import Skill from "./skill/Skill";

function MainPage() {
  return (
    <>

      <Home />
      <About />
      <Education/>
      <Skill />
      <Experience/>
      <Project />
      <Contact />
      <Footer />
    </>
  );
}
export default MainPage;
