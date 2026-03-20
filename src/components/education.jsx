import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, CheckCircle, TrendingUp, Sparkles, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Data Structure for Educational Entries
const educationData = [
    {
        degree: "Diploma in Computer Science",
        institution: "Government Polytechnic College (GPC), Jodhpur",
        duration: "2021 - 2024",
        details: "Gained a strong foundation in core computer science principles, hardware, networking, and programming fundamentals (C, Java).",
        grade: "8.15 CGPA",
        icon: <TrendingUp size={24} /> 
    },
    {
        degree: "Bachelor of Technology (B.Tech)",
        institution: "Government Engineering College (GEC), Jaipur",
        duration: "2024 - 2027",
        details: "Currently focusing on advanced Data Structures, Algorithms, and modern scalable Full-Stack Architectures.",
        grade: "In Progress",
        icon: <GraduationCap size={24} /> 
    },
];

// Component for a single education timeline entry
const EducationItem = ({ data, index }) => {
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            className="relative mb-16 lg:mb-24 last:mb-0" 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
        >
            {/* Timeline Indicator (Center Dot) */}
            <div className="hidden lg:flex absolute w-12 h-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20">
                <div className={`
                    p-2.5 rounded-xl border-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]
                    ${data.grade === "In Progress" 
                        ? "bg-indigo-600 border-indigo-400 animate-pulse" 
                        : "bg-cyan-600 border-cyan-400"} 
                    text-white
                `}>
                    {data.icon}
                </div>
            </div>

            {/* Content Card */}
            <div className={`
                glass p-8 rounded-[2rem] relative group transition-all duration-500 hover:-translate-y-2
                lg:w-[calc(50%-3rem)]
                ${isLeft 
                    ? 'lg:mr-auto lg:text-right' 
                    : 'lg:ml-auto lg:text-left'
                }
                ${data.grade === "In Progress" ? "border-indigo-500/30 dark:border-indigo-500/20" : ""}
            `}>
                {/* Visual Accent */}
                <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-24 h-24 bg-gradient-to-br ${data.grade === "In Progress" ? "from-indigo-500/10" : "from-cyan-500/10"} to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'lg:justify-end' : 'lg:justify-start'}`}>
                   {data.grade === "In Progress" && (
                        <span className="px-4 py-1.5 bg-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2 border border-indigo-500/20 animate-pulse">
                            <Clock size={14} /> Current
                        </span>
                    )}
                </div>

                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight leading-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {data.degree}
                </h2>
                
                <p className="text-xl font-bold text-cyan-700 dark:text-cyan-400 mb-4">{data.institution}</p>
                
                <div className={`flex flex-wrap items-center gap-6 mb-6 ${isLeft ? 'lg:justify-end' : 'lg:justify-start'}`}>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Calendar size={18} className="text-cyan-500" />
                        <span className="font-bold">{data.duration}</span>
                    </div>
                    {data.grade && (
                        <div className={`flex items-center gap-2 ${data.grade === "In Progress" ? "text-indigo-500 dark:text-indigo-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                            <CheckCircle size={18} />
                            <span className="font-black">{data.grade}</span>
                        </div>
                    )}
                </div>
                
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
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
                <title>Academic Credentials & Engineering Foundation | Ramesh Singad</title>
                <meta name="description" content="Review the academic history of Ramesh Singad, featuring a B.Tech from GEC Jaipur and a Diploma from GPC Jodhpur. A solid foundation in computer science and engineering principles." />
                <meta name="keywords" content="Ramesh Singad Education, B.Tech Computer Science Jaipur, Engineering Student Portfolio, GEC Jaipur Alumni, Academic Excellence in CS" />
            </Helmet>

            <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-20 overflow-hidden">
                {/* Consistent Background Decorations */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[5%] left-[5%] h-[40%] w-[40%] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px] animate-blob"></div>
                    <div className="absolute bottom-[5%] right-[5%] h-[40%] w-[40%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
                    <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    
                    {/* Header Label */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100/50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-black uppercase tracking-widest">
                            <Sparkles size={14} />
                            <span>Academic History</span>
                        </div>
                    </motion.div>

                    {/* Main Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-24"
                    >
                        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-500">
                                Educational Journey
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                            The academic milestones and deep-dives into computer science that paved my path into engineering.
                        </p>
                    </motion.div>

                    {/* Timeline Container */}
                    <div className="relative max-w-6xl mx-auto px-4">
                        
                        {/* Central Glowing Line (Desktop Only) */}
                        <div className="hidden lg:block absolute left-1/2 w-0.5 h-full bg-slate-200 dark:bg-slate-800 transform -translate-x-1/2 overflow-hidden">
                            <motion.div 
                                className="w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
                                animate={{ y: ['-100%', '200%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                        
                        {/* Mobile Vertical Line */}
                        <div className="lg:hidden absolute left-4 w-0.5 h-full bg-slate-200 dark:bg-slate-800"></div>

                        {educationData.map((data, index) => (
                            <EducationItem key={index} data={data} index={index} />
                        ))}
                    </div>

                    {/* Future Focus */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-32 p-10 glass rounded-[3rem] text-center max-w-3xl mx-auto relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">The Journey Continues...</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 font-medium">
                            Currently mastering advanced full-stack systems and exploring the depths of artificial intelligence at GEC Jaipur.
                        </p>
                        <NavLink 
                            to="/skill" 
                            className="inline-flex items-center justify-center gap-3 bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-900 font-black py-4 px-10 rounded-2xl hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-all duration-300 shadow-xl shadow-cyan-600/20 dark:shadow-cyan-400/20"
                        >
                            <TrendingUp size={22} /> Explore Skills
                        </NavLink>
                    </motion.div>

                </div>
            </main>
        </>
    );
}

export default Education;