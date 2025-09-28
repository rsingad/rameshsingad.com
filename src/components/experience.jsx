import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Clock, MapPin, Target, Code, Cpu, Shield, Server, Zap, TrendingUp } from "lucide-react";


// Animation Variants (Smooth entrance)
const timelineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// --- पूर्ण अनुभव डेटा ---
const experienceData = [
    // 1. Research & Development IT Solutions (Current)
    {
        title: "Software Development Intern",
        company: "Research & Development IT Solutions",
        duration: "Apr 2025 - Sep 2025",
        location: "Jaipur, India (On-site)",
        experience: "6 months",
        type: "R&D",
        isCurrent: false,
        icon: <Server size={16} className="text-pink-400" />,
        responsibilities: [
            "Contributed to **research and development** projects within a professional IT environment.",
            "Worked on server-side logic and web application architecture.",
            "Gained experience in internal software workflow and deployment.",
        ],
    },
    // 2. Hyperrcompute
    {
        title: "Full Stack Development Intern",
        company: "Hyperrcompute",
        duration: "May 2025 - Aug 2025",
        location: "Jaipur, India (Remote)",
        experience: "4 months",
        type: "Cloud",
        isCurrent: false,
        icon: <Cpu size={16} className="text-cyan-400" />,
        responsibilities: [
            "Developed a decentralized cloud system prototype.",
            "Integrated frontend interfaces with scalable backend services.",
            "Contributed to the core product development.",
        ],
    },
    // 3. Open Innovations Lab Intern
    {
        title: "Web Development Intern",
        company: "Open Innovations Lab",
        duration: "Mar 2024 - May 2024",
        location: "Jodhpur, India (On-site)",
        experience: "3 months",
        type: "Web Project",
        isCurrent: false,
        icon: <Shield size={16} className="text-yellow-400" />,
        responsibilities: [
            "Focused on **responsive design** and modern JavaScript practices.",
            "Improved existing codebase for enhanced performance.",
        ],
    },
    // 4. Open Innovations Lab Trainee
    {
        title: "Web Development Trainee",
        company: "Open Innovations Lab",
        duration: "Jul 2023 - Feb 2024",
        location: "Jodhpur, India (On-site)",
        experience: "8 months",
        type: "Training",
        isCurrent: false,
        icon: <Code size={16} className="text-emerald-400" />,
        responsibilities: [
            "Mastered **Express.js** and **Node.js**.",
            "Built foundational knowledge in database and server-side programming.",
        ],
    },
];

// Component for a single timeline entry
const TimelineItem = ({ data }) => {
    const isCurrent = data.isCurrent;

    // Card Styles
    const cardStyles = isCurrent
        ? "border-sky-300/60 bg-slate-800/90 shadow-2xl shadow-sky-500/20 transform hover:scale-[1.01] transition-all"
        : "border-slate-700/50 bg-slate-800/70 shadow-lg hover:shadow-xl hover:bg-slate-800/90 transition-all duration-300";

    // Render responsibilities as bullet points
    const renderResponsibilities = (resps) => {
        return resps.map((resp, i) => {
            // Removes bolding marks and renders simple text.
            const plainText = resp.replace(/\*\*(.*?)\*\*/g, '$1');

            return (
                <li
                    key={i}
                    className="text-slate-400 leading-relaxed flex items-start"
                >
                    {/* ICON BULLET POINT: Using Target icon */}
                    <Target size={14} className="mr-2 mt-1 flex-shrink-0 text-sky-400" />
                    <span dangerouslySetInnerHTML={{ __html: plainText }} />
                </li>
            );
        });
    };

    return (
        <motion.div
            className="relative mb-12 last:mb-0"
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Timeline Marker (Icon) */}
            <div
                className={`absolute w-7 h-7 rounded-full flex items-center justify-center bg-slate-900 ring-4 z-10 top-2 -left-[14px] 
                    ${isCurrent
                        ? "ring-sky-500/30 animate-pulse border border-sky-400"
                        : "ring-slate-900 border border-slate-700"
                    }`}
            >
                {/* Rendering the icon from data.icon */}
                {data.icon}
            </div>

            {/* Current Tag */}
            {isCurrent && (
                <span className="absolute z-20 top-[-25px] left-6 text-xs font-semibold text-white bg-sky-600/90 px-3 py-1 rounded-full shadow-lg shadow-sky-600/50 uppercase tracking-wider">
                    <Zap size={10} className="inline mr-1" /> Current Focus
                </span>
            )}

            {/* Content Card */}
            <div className={`ml-6 p-7 rounded-3xl border ${cardStyles}`}>
                {/* Title & Type */}
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white flex-grow">
                        {data.title}
                    </h3>
                    <span className="text-xs font-bold text-white bg-indigo-700 px-3 py-1 rounded-full flex-shrink-0 ml-4 shadow-md uppercase tracking-wider">
                        {data.type}
                    </span>
                </div>

                {/* Company */}
                <h4 className="text-lg text-sky-400 font-bold mb-3 flex items-center border-b border-slate-700/50 pb-3">
                    <Briefcase size={16} className="text-indigo-400 mr-2" />
                    <span className="ml-2">{data.company}</span>
                    {isCurrent && <span className="ml-4 text-xs font-bold text-lime-400/90">(Primary Node)</span>}
                </h4>

                {/* Duration & Location */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400 mb-4">
                    <span className="flex items-center">
                        <Calendar size={14} className="mr-1 text-indigo-400" />{" "}
                        {data.duration}
                    </span>
                    {data.experience && (
                        <span className="flex items-center">
                            <Clock size={14} className="mr-1 text-indigo-400" />{" "}
                            {data.experience}
                        </span>
                    )}
                    <span className="flex items-center">
                        <MapPin size={14} className="mr-1 text-indigo-400" /> {data.location}
                    </span>
                </div>

                {/* Responsibilities */}
                <p className="text-slate-300 font-semibold mb-2 pt-1 border-t border-slate-700/50">
                    <Target size={14} className="inline mr-2 text-sky-400" /> Key
                    Activities:
                </p>
                <ul className="pl-0 space-y-2 text-base">
                    {renderResponsibilities(data.responsibilities)}
                </ul>
            </div>
        </motion.div>
    );
};

// Main Experience Section
const Experience = () => {

    return (
        <div className="bg-slate-900">


            <section className="relative max-w-4xl mx-auto px-6 py-12 bg-slate-900 min-h-screen text-white">

                {/* Background Gradient Line (Main Vertical Line) */}
                <div className="absolute left-4 top-0 w-[2px] h-full bg-gradient-to-b from-sky-500/60 via-indigo-500/30 to-transparent"></div>

                {/* Section Title */}
                <motion.h2
                    className="text-3xl sm:text-4xl font-extrabold mb-10 text-center"
                    variants={timelineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    Professional <span className="text-sky-400">Experience Registry</span>
                </motion.h2>

                {/* Timeline Items Container */}
                <div className="relative z-10 pl-4">
                    {experienceData.map((exp, i) => (
                        <TimelineItem key={i} data={exp} />
                    ))}

                    {/* CLOSING ICON: TrendingUp icon */}
                    <div className="absolute w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center z-10 bottom-[-14px] left-[-7px] ring-4 ring-slate-900 border border-sky-500 shadow-lg shadow-sky-500/50">
                        <TrendingUp size={16} className="text-sky-400" />
                    </div>
                </div>

                {/* Footer/CTA Placeholder */}
                <div className="text-center mt-12">
                    <a
                        href="/contact"
                        className="inline-flex items-center justify-center gap-3 bg-indigo-600 text-white font-extrabold py-3 px-8 rounded-xl shadow-lg shadow-indigo-500/50 hover:bg-indigo-500 transition-all duration-300"
                    >
                        <Zap size={20} /> INITIATE CONTACT
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Experience;