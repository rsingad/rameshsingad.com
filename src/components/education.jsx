import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, CheckCircle, TrendingUp, BookOpen, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Data Structure for Educational Entries (Unchanged)
const educationData = [
    {
        degree: "Diploma in Computer Science",
        institution: "Government Polytechnic College (GPC), Jodhpur",
        duration: "2021 - 2024",
        details: "Gained a strong foundation in core computer science principles, hardware, networking, and programming fundamentals (C, Java).",
        grade: "8.15 CGPA",
        icon: <BookOpen size={24} className="text-emerald-400" /> 
    },
    {
        degree: "Bachelor of Technology (B.Tech)",
        institution: "Government Engineering College (GEC), Jaipur",
        duration: "2024 - 2027",
        details: "Currently focusing on advanced Data Structures, Algorithms, and modern scalable Full-Stack Architectures.",
        grade: "In Progress",
        icon: <GraduationCap size={24} className="text-orange-400" /> 
    },
];

// Component for a single education timeline entry
const EducationItem = ({ data, index }) => {
    const isLeft = index % 2 === 0; // Determines placement on desktop

    return (
        <motion.div
            // Base class: relative for absolute positioning of the dot/line in the wrapper
            className="relative mb-12 lg:mb-16 last:mb-0" 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            {/* Timeline Dot (Absolute Positioned for Desktop) */}
            <div className="hidden lg:flex absolute w-10 h-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10">
                <div className={`
                    p-3 rounded-full 
                    ${data.grade === "In Progress" ? "bg-indigo-600 animate-pulse-slow" : "bg-cyan-600/30"} 
                    border border-cyan-500/50 
                `}>
                    {data.icon}
                </div>
            </div>

            {/* Content Card */}
            <div className={`
                // Mobile Layout
                p-6 rounded-xl border border-slate-700 bg-slate-800/50 shadow-lg 
                hover:shadow-cyan-500/10 transition-all duration-300 transform hover:-translate-y-1
                
                // Desktop Layout (Split 50/50 with margin from center)
                lg:w-[calc(50%-2rem)] // Takes up half the width minus the margin
                ${isLeft 
                    ? 'lg:mr-auto lg:pr-10 lg:text-right' // Left side content
                    : 'lg:ml-auto lg:pl-10 lg:text-left' // Right side content
                }
                ${data.grade === "In Progress" ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-indigo-500/20" : ""} 
            `}>
                
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                    {data.degree}
                    {data.grade === "In Progress" && (
                        <span className="ml-3 lg:ml-0 lg:block lg:mt-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm font-medium rounded-full inline-flex items-center">
                            <Clock size={16} className="mr-1" /> Current
                        </span>
                    )}
                </h3>
                <p className="text-xl text-cyan-400 mb-3">{data.institution}</p>
                
                <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 ${isLeft ? 'lg:justify-end' : 'lg:justify-start'}`}>
                    <p className="text-md text-slate-400 flex items-center gap-2">
                        <Calendar size={18} className="text-slate-500" /> {data.duration}
                    </p>
                    {data.grade && (
                        <p className={`text-md font-medium flex items-center gap-2 ${data.grade === "In Progress" ? "text-indigo-300" : "text-lime-400"}`}>
                            <CheckCircle size={18} className="text-slate-500" /> {data.grade}
                        </p>
                    )}
                </div>
                
                <p className="text-lg text-slate-300 leading-relaxed">
                    {data.details}
                </p>
            </div>
        </motion.div>
    );
};


function Education() {
    return (
        <>
            <Helmet>
                <title>Education | Ramesh Singad - Foundation</title>
                <meta name="description" content="Ramesh Singad's educational background including B.Tech from GEC Jaipur and diploma from GPC Jodhpur." />
            </Helmet>

            <main className="min-h-screen bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative overflow-hidden">
                {/* Background Gradient Shapes */}
                <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="max-w-5xl mx-auto relative z-10">
                    
                    {/* Header Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 sm:mb-20"
                    >
                        <GraduationCap size={50} className="mx-auto mb-4 text-cyan-400 drop-shadow-lg" />
                        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
                                Educational Journey
                            </span>
                        </h1>
                        <p className="mt-4 text-xl sm:text-2xl text-slate-400 max-w-2xl mx-auto">
                            The academic foundation fueling my passion for engineering and innovative development.
                        </p>
                    </motion.div>

                    {/* Education Timeline Container */}
                    <div className="relative max-w-4xl mx-auto">
                        
                        {/* Central Vertical Line (Desktop Only) */}
                        <div className="hidden lg:block absolute left-1/2 w-1 h-full bg-gradient-to-b from-cyan-500/50 via-slate-700 to-slate-800 transform -translate-x-1/2"></div>
                        
                        {/* Mobile Vertical Line */}
                        <div className="lg:hidden absolute left-0 w-1 h-full bg-gradient-to-b from-cyan-500/50 via-slate-700 to-slate-800"></div>

                        {educationData.map((data, index) => (
                            <EducationItem key={index} data={data} index={index} />
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-20 text-center"
                    >
                        <p className="text-xl text-slate-300 mb-8 max-w-lg mx-auto">
                            This journey is continuously evolving. Explore my practical applications and core skills next!
                        </p>
                        <a 
                            href="/skills" 
                            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold py-3.5 px-10 rounded-full shadow-xl shadow-indigo-500/30 hover:shadow-lg hover:shadow-indigo-400/40 transition-all duration-300 transform hover:scale-105 group"
                        >
                            <TrendingUp size={24} className="group-hover:rotate-6 transition-transform duration-300" /> View Core Skills
                        </a>
                    </motion.div>

                </div>
            </main>
        </>
    );
}

export default Education;