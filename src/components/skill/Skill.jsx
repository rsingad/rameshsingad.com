import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Code, Server, Database, Wrench, BrainCircuit, Users, MessageSquare, Sparkles, Terminal } from "lucide-react";
import React from 'react';

// Data for skill categories
const skillCategories = [
    {
        title: "Frontend",
        icon: <Code className="w-7 h-7 text-cyan-400" />,
        skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS","Bootstrap","media queary","", "Framer Motion"],
    },
    {
        title: "Backend",
        icon: <Server className="w-7 h-7 text-cyan-400" />,
        skills: ["Node.js", "Express.js", "NPM"],
    },
    {
        title: "Database",
        icon: <Database className="w-7 h-7 text-cyan-400" />,
        skills: ["MongoDB","mysql"],
    },
    {
        title: "Languages",
        icon: <Terminal className="w-7 h-7 text-cyan-400" />,
        skills: ["C", "C++", "Python", "Java"],
    },
    {
        title: "Tools",
        icon: <Wrench className="w-7 h-7 text-cyan-400" />,
        skills: ["Git & GitHub", "VS Code", "Vite", "Postman","appwrite","AI tools and software"],
    },
];

const professionalSkills = [
    { title: "Problem Solving", icon: <BrainCircuit className="w-8 h-8 text-cyan-400" /> },
    { title: "Creativity", icon: <Sparkles className="w-8 h-8 text-cyan-400" /> },
    { title: "Teamwork", icon: <Users className="w-8 h-8 text-cyan-400" /> },
    { title: "Communication", icon: <MessageSquare className="w-8 h-8 text-cyan-400" /> },
];

// SVG component for connecting lines
const ConnectingLine = () => (
    <svg className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 h-full w-8" preserveAspectRatio="none" viewBox="0 0 32 100">
        <motion.path
            d="M 32 50 L 16 50 C 8 50, 8 50, 8 42 L 8 0"
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        />
        <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);


function Skill() {
  return (
    <>
      <Helmet>
        <title>My Skills | Ramesh Singad - Software Engineer</title>
        <meta name="description" content="A showcase of Ramesh Singad's skills through a futuristic circuit board interface, covering Frontend, Backend, and more." />
      </Helmet>

      <main className="min-h-screen bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20" style={{
            backgroundImage: `
                linear-gradient(#0ea5e9 1px, transparent 1px),
                linear-gradient(to right, #0ea5e9 1px, #1e293b 1px)
            `,
            backgroundSize: '2rem 2rem',
            maskImage: 'radial-gradient(ellipse at center, white, transparent 70%)',
        }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
                        My Skills Matrix
                    </span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                    A blueprint of the technologies powering my development process.
                </p>
            </motion.div>

            {/* Skills Circuit Board */}
            <div className="mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            className="relative"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="bg-slate-800/70 border border-cyan-500/30 rounded-lg p-3 backdrop-blur-sm">
                                    {category.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                            </div>
                            <div className="relative mt-6 pl-8 border-l-2 border-cyan-500/30">
                                <div className="absolute -left-px top-0 h-full w-px bg-cyan-500 animate-pulse-slow"></div>
                                <div className="space-y-4">
                                    {category.skills.map(skill => (
                                        <motion.div 
                                            key={skill}
                                            className="relative flex items-center"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.8 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <ConnectingLine />
                                            <motion.div 
                                                className="bg-slate-800/70 border border-slate-700 rounded-md px-4 py-2 text-slate-300 w-full transition-all duration-300"
                                                whileHover={{
                                                    borderColor: 'rgb(14 165 233)',
                                                    boxShadow: '0 0 12px rgba(14, 165, 233, 0.5)',
                                                    scale: 1.03
                                                }}
                                            >
                                                {skill}
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Professional Skills Section */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="mt-24 text-center"
            >
                <h2 className="text-3xl font-bold text-white mb-10">
                    Core Competencies
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {professionalSkills.map((skill, index) => (
                         <motion.div
                            key={skill.title}
                            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-cyan-500 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {skill.icon}
                            <p className="font-semibold text-slate-300 mt-4">{skill.title}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

        </div>
      </main>
    </>
  );
}

export default Skill;

