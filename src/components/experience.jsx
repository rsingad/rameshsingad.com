import { motion } from "framer-motion";
import { Briefcase, Calendar, Clock, MapPin, Target, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { NavLink } from "react-router-dom";

// Animation Variants
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Experience Data
const experienceData = [
    {
        title: "Software Development Intern",
        company: "Research & Development IT Solutions",
        duration: "Apr 2025 - Sep 2025",
        location: "Jaipur, India",
        experience: "6 months",
        type: "R&D",
        isCurrent: true,
        icon: <TrendingUp size={22} />,
        responsibilities: [
            "Contributed to **research and development** projects within a professional IT environment.",
            "Worked on server-side logic and web application architecture.",
            "Gained experience in internal software workflow and deployment.",
        ],
    },
    {
        title: "Full Stack Development Intern",
        company: "Hyperrcompute",
        duration: "May 2025 - Aug 2025",
        location: "Jaipur, India (Remote)",
        experience: "4 months",
        type: "Cloud",
        isCurrent: false,
        icon: <Briefcase size={22} />,
        responsibilities: [
            "Developed a decentralized cloud system prototype.",
            "Integrated frontend interfaces with scalable backend services.",
            "Contributed to the core product development.",
        ],
    },
    {
        title: "Web Development Intern",
        company: "Open Innovations Lab",
        duration: "Mar 2024 - May 2024",
        location: "Jodhpur, India",
        experience: "3 months",
        type: "Web Project",
        isCurrent: false,
        icon: <Target size={22} />,
        responsibilities: [
            "Focused on **responsive design** and modern JavaScript practices.",
            "Improved existing codebase for enhanced performance.",
        ],
    },
    {
        title: "Web Development Trainee",
        company: "Open Innovations Lab",
        duration: "Jul 2023 - Feb 2024",
        location: "Jodhpur, India",
        experience: "8 months",
        type: "Training",
        isCurrent: false,
        icon: <Clock size={22} />,
        responsibilities: [
            "Mastered **HTML**, **CSS**, **JavaScript**, **React.js**, **Express.js** and **Node.js**,**MongoDB**,",
            "Built foundational knowledge in database and server-side programming.",
        ],
    },
];

// Component for a single timeline entry
const TimelineItem = ({ data, index }) => {
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            className="relative mb-24 lg:mb-32 last:mb-10"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Timeline Indicator (Center Dot) */}
            <div className="hidden lg:flex absolute w-14 h-14 top-0 left-1/2 transform -translate-x-1/2 items-center justify-center z-20">
                <div className={`
                    p-3 rounded-2xl border-2 transition-all duration-500
                    ${data.isCurrent
                        ? "bg-indigo-600 border-indigo-400 shadow-[0_0_30px_rgba(79,70,229,0.5)] scale-110"
                        : "bg-slate-900 border-slate-700 shadow-xl"} 
                    text-white group-hover:scale-125
                `}>
                    {data.icon}
                </div>
            </div>

            {/* Content Card */}
            <div className={`
                glass p-8 lg:p-10 rounded-[3rem] relative group transition-all duration-700 hover:-translate-y-3
                lg:w-[calc(50%-5rem)]
                ${isLeft ? 'lg:mr-auto' : 'lg:ml-auto'}
                ${data.isCurrent ? "border-indigo-500/40 ring-2 ring-indigo-500/10 shadow-2xl shadow-indigo-500/10" : "hover:border-cyan-500/30"}
            `}>
                {/* Visual Accent */}
                <div className={`absolute -top-10 ${isLeft ? '-right-10' : '-left-10'} w-48 h-48 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>

                {/* Status Bar */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    <span className="px-4 py-1.5 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-cyan-500/20 shadow-sm">
                        {data.type}
                    </span>
                    {data.isCurrent && (
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-500/30 animate-pulse">
                            <Zap size={12} className="fill-current" />
                            <span>Active Node</span>
                        </div>
                    )}
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3 leading-tight tracking-tighter">
                    {data.title}
                </h3>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <Briefcase size={20} className="text-cyan-600" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-slate-800 dark:text-slate-200 tracking-tight leading-none mb-1">
                            {data.company}
                        </h4>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span className="flex items-center gap-1.5"><Calendar size={12} /> {data.duration}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                            <span className="flex items-center gap-1.5"><MapPin size={12} /> {data.location}</span>
                        </div>
                    </div>
                </div>

                <ul className="space-y-4">
                    {data.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-4 text-slate-600 dark:text-slate-400 font-medium leading-relaxed group/li">
                            <div className="mt-1.5 p-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 transition-colors group-hover/li:bg-cyan-500 group-hover/li:text-white">
                                <Target size={12} />
                            </div>
                            <span className="text-sm" dangerouslySetInnerHTML={{ __html: resp.replace(/\*\*(.*?)\*\*/g, '<b class="text-slate-900 dark:text-white font-black">$1</b>') }} />
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

// Main Experience Section
const Experience = () => {
    return (
        <>
            <Helmet>
                <title>Professional Work History & Engineering Internships | Ramesh Singad</title>
                <meta name="description" content="Follow the professional trajectory of Ramesh Singad, including roles at R&D IT Solutions, Hypercompute, and Open Innovations Lab. Specializing in full-stack dev and R&D." />
                <meta name="keywords" content="Ramesh Singad Experience, Senior Software Engineer Intern, Full-Stack Developer Jaipur, Hypercompute Cloud Projects, R&D IT Solutions Experience" />
            </Helmet>

            <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-24 overflow-hidden">

                {/* Consistent Background Decorations */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[160px] animate-blob"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] h-[60%] w-[60%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[160px] animate-blob animation-delay-4000"></div>
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
                    <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-slate-50 dark:from-slate-950 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Header Label */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-8"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 text-cyan-700 dark:text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                            <span>Technical Trajectory</span>
                        </div>
                    </motion.div>

                    {/* Main Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-40"
                    >
                        <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-none mb-8">
                            Professional <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-500">Experience</span>
                        </h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            An immutable log of my journey through software engineering, cloud architectures, and innovative research labs.
                        </p>
                    </motion.div>

                    {/* Timeline Container */}
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-0">

                        {/* Central Glowing Line (Desktop Only) */}
                        <div className="hidden lg:block absolute left-1/2 w-px h-full bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-800 to-transparent transform -translate-x-1/2">
                            <motion.div
                                className="w-[2px] h-1/3 bg-gradient-to-b from-transparent via-cyan-500 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.8)]"
                                animate={{ y: ['-100%', '300%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {/* Mobile Vertical Line */}
                        <div className="lg:hidden absolute left-4 w-px h-full bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

                        {experienceData.map((exp, i) => (
                            <TimelineItem key={i} data={exp} index={i} />
                        ))}
                    </div>

                    {/* Final CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-40 p-12 lg:p-20 glass rounded-[4rem] text-center max-w-4xl mx-auto relative overflow-hidden group border-indigo-500/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                        <div className="relative z-10">
                            <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform duration-500">
                                <Zap size={40} className="text-indigo-600 dark:text-indigo-400 fill-current" />
                            </div>
                            <h4 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">Ready to Build the Future?</h4>
                            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
                                I'm actively seeking opportunities to scale systems, solve complex backend challenges, and innovate in R&D environments.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <NavLink
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-5 px-12 rounded-[2rem] hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-slate-900/20 dark:shadow-white/20"
                                >
                                    <span>Initiate Collaboration</span>
                                    <TrendingUp size={20} />
                                </NavLink>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </main>
        </>
    );
};

export default Experience;