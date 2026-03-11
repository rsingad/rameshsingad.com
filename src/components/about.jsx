import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import { Download, Send, Star, Zap, Briefcase, Award, Rocket, Sparkles } from "lucide-react";

// --- Sub-Components ---

// Reusable StatCard with glassmorphism
const StatCard = ({ icon, value, label }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-6 text-center shadow-lg hover:shadow-cyan-500/20 transition-all duration-500 hover:-translate-y-2 group"
    >
        <div className="flex justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/10">
                {icon}
            </div>
        </div>
        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-700 dark:from-cyan-400 dark:to-indigo-500">
            {value}
        </p>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-widest leading-tight">
            {label}
        </p>
    </motion.div>
);

// --- Main Component ---
function About() {
    return (
        <>
            <Helmet>
                <title>About Ramesh Singad | Senior Software Engineer - Journey & Vision</title>
                <meta name="description" content="Discover the professional journey of Ramesh Singad, a Senior Software Engineer and AI enthusiast. Learn about his commitment to clean code, modular architecture, and innovative digital solutions." />
                <meta name="keywords" content="About Ramesh Singad, Software Engineer Biography, Ramesh Singad Journey, AI Enthusiast India, Senior Web Developer Profile, Tech Visionary" />
            </Helmet>

            <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">

                {/* Background Decorations (Same as Home for consistency) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] right-[5%] h-[40%] w-[40%] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[100px] animate-blob"></div>
                    <div className="absolute bottom-[10%] left-[5%] h-[40%] w-[40%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
                    <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Section Label */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100/50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-black uppercase tracking-widest">
                            <Sparkles size={14} />
                            <span>My Journey</span>
                        </div>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-none">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-500">
                                Who I Am
                            </span>
                        </h1>
                        <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                            A passionate Full-Stack Software Engineer dedicated to crafting high-performance digital solutions and exploring AI horizons.
                        </p>
                    </motion.div>

                    {/* Main Content Grid */}
                    <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                        {/* Avatar Column */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-5 flex justify-center"
                        >
                            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                                {/* Stylized Floating Container (Matches Home Hero) */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-indigo-600/30 rounded-[40px] blur-2xl animate-pulse-slow"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-[40px] p-1.5 shadow-[0_0_50px_rgba(6,182,212,0.2)] dark:shadow-[0_0_80px_rgba(6,182,212,0.1)] animate-float">
                                    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[35px] overflow-hidden p-4 relative group">
                                        <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <img
                                            src="/main.jpg"
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/0f172a/94a3b8?text=Ramesh" }}
                                            alt="Ramesh Singad - Professional Software Engineer specializing in React and AI"
                                            className="w-full h-full object-cover rounded-[25px] transition-all duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-2xl text-sm font-black shadow-2xl border border-white/20 whitespace-nowrap">
                                            🚀 Driven by Innovation
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bio Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-7 space-y-8"
                        >
                            <div className="space-y-6 text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
                                <p>
                                    As a <span className="text-cyan-600 dark:text-cyan-400 font-black">Full-Stack Software Engineer</span>, I focus on the power of technology to solve real-world problems. My interest lies at the intersection of <span className="bg-cyan-100 dark:bg-cyan-900/40 px-2 py-0.5 rounded text-cyan-800 dark:text-cyan-300">modern web frameworks</span>, AI integration, and scalable system architecture.
                                </p>
                                <p>
                                    I thrive in environments that challenge me to write **clean, modular, and optimized code**. My journey is a continuous cycle of building, learning, and refining, with a goal to deliver digital experiences that are as beautiful in their structure as they are in their interface.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5">
                                <a
                                    href="/ramesh_singad_resume.pdf"
                                    className="group flex items-center justify-center gap-3 bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-900 font-black py-4 px-10 rounded-2xl hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-all duration-300 shadow-xl shadow-cyan-600/20 dark:shadow-cyan-400/20"
                                >
                                    <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                                    Download CV
                                </a>
                                <NavLink
                                    to="/contact"
                                    className="flex items-center justify-center gap-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white font-black py-4 px-10 rounded-2xl hover:border-cyan-500 dark:hover:border-cyan-500 transition-all duration-300 glass-hover"
                                >
                                    <Send size={20} />
                                    Hire Me
                                </NavLink>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Highlights */}
                    <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                        <StatCard icon={<Briefcase size={28} />} value="1+" label="Years of Dev" />
                        <StatCard icon={<Zap size={28} />} value="15+" label="Projects Built" />
                        <StatCard icon={<Star size={28} />} value="10+" label="Core Techs" />
                        <StatCard icon={<Rocket size={28} />} value="4.9" label="Avg Rating" />
                    </div>

                </div>
            </main>
        </>
    );
}

export default About;