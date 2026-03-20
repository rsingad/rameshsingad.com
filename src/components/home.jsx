import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Code, Cpu, Globe, Database, Layout, Zap, Rocket, Terminal } from "lucide-react";
import SocialMediaIcon from "./socialmediaicon";

// Orbiting Icon Component
const OrbitIcon = ({ Icon, delay, radius, speed }) => (
  <motion.div
    className="absolute text-cyan-500/40 dark:text-cyan-400/30"
    animate={{
      rotate: [0, 360],
    }}
    transition={{
      duration: speed,
      repeat: Infinity,
      ease: "linear",
    }}
    style={{
      width: radius * 2,
      height: radius * 2,
      top: `calc(50% - ${radius}px)`,
      left: `calc(50% - ${radius}px)`,
    }}
  >
    <motion.div
      animate={{ rotate: [0, -360] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <Icon size={24} />
    </motion.div>
  </motion.div>
);

function Home() {
  const [greeting, setGreeting] = useState("");

  const wishMe = () => {
    const hours = new Date().getHours();
    if (hours >= 4 && hours < 12) setGreeting("Good morning Boss");
    else if (hours >= 12 && hours < 16) setGreeting("Good afternoon Sir");
    else if (hours >= 16 && hours < 22) setGreeting("Good evening Sir");
    else setGreeting("Hello Boss");
  };

  useEffect(() => {
    wishMe();
  }, []);

  return (
    <>
      <Helmet>
        <title>Ramesh Singad | Official Portfolio - Senior Software Engineer & AI Architect</title>
        <meta name="description" content="Welcome to the professional portfolio of Ramesh Singad. A Senior Software Engineer specializing in high-performance web applications, AI integration, and scalable MERN stack solutions." />
        <meta name="keywords" content="Ramesh Singad, Senior Software Engineer, React Developer Jaipur, AI Architect, Full-Stack Portfolio, MERN Expert, Web Development, Software Architect" />
        <meta property="og:title" content="Ramesh Singad | Senior Software Engineer & AI Architect" />
        <meta property="og:description" content="Explore the innovative projects and technical expertise of Ramesh Singad, a full-stack engineer building the future of web and AI." />
      </Helmet>

      <main
        id="home"
        className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white px-4 py-12"
      >
        {/* Advanced Background Decorations */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] h-[50%] w-[50%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute -bottom-[10%] -right-[10%] h-[50%] w-[50%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
          <div className="absolute top-[20%] right-[10%] h-[30%] w-[30%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>

          {/* Grid Pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100/50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-sm font-semibold"
              >
                <Zap size={14} className="animate-pulse" />
                <span>Available for new projects</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-none">
                <span className="text-slate-500 dark:text-slate-400 text-3xl sm:text-4xl block mb-2 font-medium">{greeting}, I'm</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-500">
                  Ramesh Singad
                </span>
              </h1>

              <div className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-300">
                A Creative{" "}
                <TypeAnimation
                  sequence={[
                    "React Developer", 2000,
                    "Full Stack Engineer", 2000,
                    "Software Architect", 2000,
                    "Problem Solver", 2000,
                  ]}
                  wrapper="span"
                  className="text-cyan-600 dark:text-cyan-400"
                  repeat={Infinity}
                />
              </div>

              <p className="max-w-xl mx-auto lg:mx-0 text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                I build high-performance, beautiful, and accessible web applications that users love. Turning complex problems into elegant digital solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <NavLink
                to="/project"
                className="group relative flex items-center justify-center gap-2 bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-900 font-black py-4 px-10 rounded-2xl hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-all duration-300 shadow-xl shadow-cyan-600/20 dark:shadow-cyan-400/20"
              >
                <span>View Projects</span>
                <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </NavLink>

              <NavLink
                to="/contact"
                className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white font-black py-4 px-10 rounded-2xl hover:border-cyan-500 dark:hover:border-cyan-500 transition-all duration-300 glass-hover"
              >
                Let's Talk
              </NavLink>
            </div>

            <div className="pt-6">
              <p className="text-sm text-slate-400 dark:text-slate-500 mb-4 font-bold uppercase tracking-widest">Connect with me</p>
              <div className="flex justify-center lg:justify-start">
                <SocialMediaIcon />
              </div>
            </div>
          </motion.div>

          {/* Right Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-80 h-80 sm:w-[450px] sm:h-[450px]">

              {/* Spinning Rings */}
              <div className="absolute inset-0 border-[1px] border-dashed border-cyan-500/20 dark:border-cyan-400/20 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-10 border-[1px] border-dashed border-indigo-500/20 dark:border-indigo-400/20 rounded-full animate-spin-slow animation-delay-2000" style={{ animationDirection: 'reverse' }}></div>
              <div className="absolute inset-20 border-[1px] border-dashed border-purple-500/20 dark:border-purple-400/20 rounded-full animate-spin-slow animation-delay-4000"></div>

              {/* Orbiting Tech Icons */}
              <OrbitIcon Icon={Code} radius={180} speed={15} />
              <OrbitIcon Icon={Cpu} radius={160} speed={20} />
              <OrbitIcon Icon={Globe} radius={140} speed={12} />
              <OrbitIcon Icon={Database} radius={210} speed={25} />
              <OrbitIcon Icon={Layout} radius={225} speed={18} />
              <OrbitIcon Icon={Terminal} radius={195} speed={22} />

              {/* Central Avatar Container */}
              <div className="absolute inset-16 sm:inset-24 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-3xl p-1 shadow-[0_0_50px_rgba(6,182,212,0.3)] dark:shadow-[0_0_80px_rgba(6,182,212,0.15)] animate-float">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[22px] overflow-hidden p-3 relative group">
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src="/main.webp"
                    width="420"
                    height="420"
                    fetchpriority="high"
                    loading="eager"
                    alt="Ramesh Singad - Senior Software Engineer & AI Architect Profile Photo"
                    className="w-full h-full object-cover rounded-[15px] grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />

                  {/* Floating floating label */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-xl text-xs font-black shadow-2xl border border-white/20 whitespace-nowrap">
                    👋 Coding the Future
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </>
  );
}

export default Home;

