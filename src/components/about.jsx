import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import { Download, Send, Star, Zap, Briefcase, Award, Cpu, GraduationCap, Calendar, Code, Database, Server } from "lucide-react";

// --- Sub-Components ---

// Reusable StatCard with framer-motion (Optimized)
const StatCard = ({ icon, value, label }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center shadow-lg hover:shadow-cyan-500/10 transition duration-300"
    >
        <div className="flex justify-center mb-3">
            {icon}
        </div>
        <p className="text-3xl font-bold text-cyan-400">{value}</p>
        <p className="text-sm text-slate-400 mt-1">{label}</p>
    </motion.div>
);

// --- Main Component ---
function About() {
    return (
        <>
            <Helmet>
                <title>About Me | Ramesh Singad - Software Engineer</title>
                <meta name="description" content="Meet Ramesh Singad, a passionate Full-Stack Software Engineer with interests in AI and cloud technologies. Discover my journey in building modern software solutions using React, Node.js, and more." />
            </Helmet>

            <main className="min-h-screen bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
                                About Me
                            </span>
                        </h1>
                        <h2 className="mt-4 text-2xl text-slate-300 font-semibold tracking-wide">
                            Full-Stack Developer | AI Enthusiast
                        </h2>
                    </motion.div>

                    {/* Main Content Grid (Bio) */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                        
                        {/* Left Image Section */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="md:col-span-2 flex justify-center order-first md:order-first"
                        >
                            <motion.div 
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-64 h-64 sm:w-80 sm:h-80"
                            >
                                <div className="absolute inset-0 bg-slate-800 rounded-full p-2 shadow-2xl shadow-cyan-500/20 animate-pulse-slow border-2 border-cyan-500/30">
                                    {/* Optimized Placeholder image for profile picture */}
                                    <img 
                                        src="avtar2.png" 
                                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/320x320/0f172a/94a3b8?text=Ramesh" }}
                                        alt="Digital avatar of Ramesh Singad" 
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Content Section (Bio & Buttons) */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="md:col-span-3 space-y-6 text-slate-300 text-lg leading-relaxed order-last md:order-last"
                        >
                            <p>
                                As a passionate **Full-Stack Software Engineer**, I'm driven by the power of technology to shape the future. My core interests lie in the exciting intersection of <span className="text-cyan-400 font-semibold">modern web architecture, Artificial Intelligence, and scalable cloud deployment</span>. I thrive on translating complex business requirements into elegant, user-friendly digital solutions.
                            </p>
                            <p>
                                My expertise lies in developing robust web applications using **React, Tailwind CSS, and Node.js/Express**. I am dedicated to writing clean, maintainable, and highly **scalable code**. My journey is defined by a commitment to continuous learning and a genuine enthusiasm for managing projects from the initial concept phase to a successful, production-ready launch.
                            </p>

                            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                <a 
                                    href="/ramesh_singar.pdf" 
                                    download="ramesh_singad_resume.pdf"
                                    className="flex items-center justify-center gap-2 bg-cyan-500 text-slate-900 font-bold py-3 px-6 rounded-full hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-md"
                                >
                                    <Download className="w-5 h-5"/>
                                    Download Resume
                                </a>
                                <NavLink 
                                    to="/contact"
                                    className="flex items-center justify-center gap-2 bg-slate-800/50 border border-slate-700 text-white font-bold py-3 px-6 rounded-full hover:bg-slate-700/70 transition-all duration-300 transform hover:scale-105"
                                >
                                    <Send className="w-5 h-5"/>
                                    Contact Me
                                </NavLink>
                            </div>
                        </motion.div>
                    </div>
                    
                    {/* Stats Section */}
                    <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatCard icon={<Briefcase className="w-8 h-8 text-cyan-500"/>} value="1+" label="Year of Experience" />
                        <StatCard icon={<Zap className="w-8 h-8 text-cyan-500"/>} value="10+" label="Projects Completed" />
                        <StatCard icon={<Star className="w-8 h-8 text-cyan-500"/>} value="5+" label="Technologies Mastered" />
                        <StatCard icon={<Award className="w-8 h-8 text-cyan-500"/>} value="4.0" label="Avg Project Rating" />
                    </div>
                
                </div>
            </main>
        </>
    );
}

export default About;