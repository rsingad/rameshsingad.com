import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SocialMediaIcon from "./socialmediaicon"; // Make sure this component exists and is styled

function Home() {
  const [greeting, setGreeting] = useState("");

  // Speech synthesis function - kept from your original logic
  const speak = (textToSpeak) => {
    // Basic check to ensure browser support
    if ('speechSynthesis' in window) {
      let utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.lang = "en-IN";
      window.speechSynthesis.speak(utterance);
    } else {
      console.log("Sorry, your browser does not support text-to-speech.");
    }
  };

  // Function to set greeting based on time of day
  function wishMe() {
    const hours = new Date().getHours();
    let currentGreeting = "Hello Boss";
    if (hours >= 4 && hours < 12) {
      currentGreeting = "Good morning Boss";
    } else if (hours >= 12 && hours < 16) {
      currentGreeting = "Good afternoon Sir";
    } else if (hours >= 16 && hours < 22) {
      currentGreeting = "Good evening Sir";
    }
    setGreeting(currentGreeting);
  }

  useEffect(() => {
    wishMe();
  }, []);

  // You can uncomment this if you want the greeting to be spoken on load
  // useEffect(() => {
  //   if (greeting) {
  //     speak(greeting);
  //   }
  // }, [greeting]);

  return (
    <>
      <Helmet>
        <title>Home | Ramesh Singad - Web Developer</title>
        <meta name="description" content="Welcome to the portfolio of Ramesh Singad, a skilled Engineer and Web Developer specializing in React and modern web technologies." />
      </Helmet>

      <main 
        id="home" 
        className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-slate-900 text-white px-4 sm:px-6 lg:px-8"
      >
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 z-0 opacity-50">
            <div className="absolute top-0 left-0 h-96 w-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute bottom-0 right-0 h-96 w-96 bg-indigo-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block text-gray-300">{greeting}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600 mt-2">
                Ramesh Singad
              </span>
            </h1>
            <h2 className="mt-4 text-2xl sm:text-3xl text-gray-300">
              And I'm a{" "}
              <TypeAnimation
                sequence={[
                  "React Developer", 2000,
                  "Software Engineer", 2000,
                  "UI/UX Enthusiast", 2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-cyan-400"
                repeat={Infinity}
              />
            </h2>
            <p className="mt-6 max-w-lg mx-auto md:mx-0 text-gray-400">
              I specialize in creating exceptional digital experiences. My focus is on building responsive, scalable, and user-friendly web applications.
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <SocialMediaIcon />
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <NavLink 
                to="/project"
                className="bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </NavLink>
              <a 
                href="/ramesh_singad_resume.pdf" // TODO: Add your resume file to the public folder and update this path
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800/50 border border-slate-700 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-700/70 transition-all duration-300"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Right Avatar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center items-center mt-12 md:mt-0"
          >
             <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Orbiting Elements */}
                <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-4 border border-indigo-500/30 rounded-full animate-spin-slow animation-delay-2000"></div>
                
                {/* Avatar Image */}
                <div className="absolute inset-8 bg-slate-800 rounded-full p-2 shadow-2xl shadow-cyan-500/20">
                    <img 
                        src="/main.jpg" 
                        alt="A digital avatar of Ramesh Singad" 
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
             </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}

export default Home;

