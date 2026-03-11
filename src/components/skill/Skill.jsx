import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Code, Server, Database, Wrench, BrainCircuit, Shield, Users, MessageSquare, Sparkles, Terminal, Cpu, Brain } from "lucide-react";
import React from 'react';

// Data for skill categories
const skillCategories = [
    {
        title: "Frontend Engineering",
        icon: <Code className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
        skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Responsive Design", "Framer Motion"],
        color: "from-cyan-500/10 to-blue-500/10"
    },
    {
        title: "Backend Architecture",
        icon: <Server className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
        skills: ["Node.js", "Express.js", "Mongoose", "RESTful APIs", "JWT Authentication", "Cloud Computing", "NPM"],
        color: "from-indigo-500/10 to-purple-500/10"
    },
    {
        title: "Database Systems",
        icon: <Database className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
        skills: ["MongoDB", "supabase", "MySQL", "PostgreSQL", "Data Modeling"],
        color: "from-emerald-500/10 to-teal-500/10"
    },
    {
        title: "Core Languages",
        icon: <Terminal className="w-8 h-8 text-orange-600 dark:text-orange-400" />,
        skills: ["C", "C++", "Python", "Java"],
        color: "from-orange-500/10 to-yellow-500/10"
    },
    {
        title: "Dev Ecosystem",
        icon: <Wrench className="w-8 h-8 text-rose-600 dark:text-rose-400" />,
        skills: ["Git & GitHub", "VS Code", "Vite", "Postman", "Appwrite", "OS Management"],
        color: "from-rose-500/10 to-pink-500/10"
    },
    {
        title: "Data Science & AI",
        icon: <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
        skills: ["Machine Learning", "Artificial Intelligence", "Information Theory"],
        color: "from-purple-500/10 to-violet-500/10",
        isLearning: true
    },
    {
        title: "Security & DevOps",
        icon: <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
        skills: ["DevOps", "Information Security", "Kali Linux", "Docker (Basics)"],
        color: "from-emerald-500/10 to-teal-500/10",
        isLearning: true
    }
];

const professionalSkills = [
    { title: "Advanced Logic", icon: <BrainCircuit className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />, desc: "Algorithmic thinking and complex problem resolution." },
    { title: "Visual Design", icon: <Sparkles className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />, desc: "Creating premium user interfaces and experiences." },
    { title: "Architectural Growth", icon: <Cpu className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />, desc: "Building scalable and performant software systems." },
    { title: "Fluid Collaboration", icon: <Users className="w-10 h-10 text-orange-600 dark:text-orange-400" />, desc: "Effective communication and high-level teamwork." },
];

function Skill() {
    return (
        <>
            <Helmet>
                <title>Technical Skills & Core Competencies | Ramesh Singad - Senior Engineer</title>
                <meta name="description" content="Explore the technical expertise of Ramesh Singad, featuring proficiency in React, Node.js, MERN Stack, AI, and scalable system architecture. A detailed map of engineering capabilities." />
                <meta name="keywords" content="Ramesh Singad Skills, Senior React Developer, Node.js Expert, MERN Stack Architecture, AI implementation, Software Engineering Expertise, Technical Consultant Jaipur" />
            </Helmet>

            <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-24 overflow-hidden">

                {/* Background Decorations */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] right-[-5%] h-[50%] w-[50%] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px] animate-blob"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] h-[50%] w-[50%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
                    <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Header Section */}
                    <div className="text-center mb-28">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100/50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-black uppercase tracking-widest mb-6"
                        >
                            <Cpu size={14} className="animate-pulse" />
                            <span>Engineering Capabilities</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-6xl sm:text-8xl font-black tracking-tighter leading-none mb-8"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-500">
                                Technical Matrix
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed"
                        >
                            A panoramic view of my technical arsenal, organized by engineering domains and proficiency levels.
                        </motion.p>
                    </div>

                    {/* Skills Grid */}
                    <div className="flex flex-wrap justify-center gap-8 mb-32">
                        {skillCategories.map((category, index) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]"
                            >
                                <div className="glass rounded-[2.5rem] p-10 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/5 relative overflow-hidden">

                                    {/* Learning Badge */}
                                    {category.isLearning && (
                                        <div className="absolute top-6 right-6 z-20">
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-tighter animate-pulse">
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                                In Progress
                                            </div>
                                        </div>
                                    )}

                                    {/* Accent Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-5 mb-8">
                                            <div className="w-16 h-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                {category.icon}
                                            </div>
                                            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{category.title}</h2>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            {category.skills.map((skill, sIndex) => (
                                                <motion.span
                                                    key={skill}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: (index * 0.1) + (sIndex * 0.05) }}
                                                    className="px-4 py-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-widest rounded-xl hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shadow-sm"
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Core Competencies (Professional Skills) */}
                    <div className="relative">
                        <div className="text-center mb-16">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-600 dark:text-cyan-400 mb-4 text-center">Software Engineering Essence</h2>
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Core Competencies</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {professionalSkills.map((skill, index) => (
                                <motion.div
                                    key={skill.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    className="glass p-8 rounded-[2rem] flex flex-col items-center text-center group hover:scale-105 transition-all duration-500"
                                >
                                    <div className="mb-6 p-4 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-colors">
                                        {skill.icon}
                                    </div>
                                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                        {skill.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                        {skill.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
            {/* Minimal Tech Signature (Refined conclusion) */}
            <div className="mt-40 relative group">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
                
                <div className="py-12 relative overflow-hidden">
                    <div className="flex gap-20 animate-infinite-scroll whitespace-nowrap items-center select-none">
                        {[
                            "React", "Node.js", "MongoDB", "Python", "JavaScript", "C++", "CyberSecurity", "Machine Learning", "DevOps", "Framer Motion", "TailwindCSS", "PostgreSQL"
                        ].map((name, i) => (
                            <React.Fragment key={`${name}-${i}`}>
                                <span className="text-3xl font-black uppercase tracking-[0.6rem] text-slate-300 dark:text-slate-800 hover:text-cyan-500/50 transition-colors duration-500 cursor-default">
                                    {name}
                                </span>
                                <span className="text-slate-100 dark:text-slate-900 text-2xl font-black">·</span>
                            </React.Fragment>
                        ))}
                        {/* Duplicate for seamless scrolling */}
                        {[
                            "React", "Node.js", "MongoDB", "Python", "JavaScript", "C++", "CyberSecurity", "Machine Learning", "DevOps", "Framer Motion", "TailwindCSS", "PostgreSQL"
                        ].map((name, i) => (
                            <React.Fragment key={`${name}-dup-${i}`}>
                                <span className="text-3xl font-black uppercase tracking-[0.6rem] text-slate-300 dark:text-slate-800 hover:text-cyan-500/50 transition-colors duration-500 cursor-default">
                                    {name}
                                </span>
                                <span className="text-slate-100 dark:text-slate-900 text-2xl font-black">·</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
            </div>
        </div>
      </main>
    </>
  );
}

export default Skill;
