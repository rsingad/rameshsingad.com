import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Github, ExternalLink, Code, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import React, { useState, useCallback } from 'react';

// Project Data
const projects = [
    {
        id: "project-new-7",
        title: "The Paradise Billas (Advanced)",
        description: "A highly interactive, 3D-type experiential website featuring advanced simulations like splashing pool water, stone-dropping ripples, and dynamic audio feedback in the jazz hall. Integrates sub-webs for Pool, Wedding, Coffee Shop, and Spa booking/viewing.",
        imageUrl: "https://placehold.co/600x400/0f172a/475569?text=Private+Repo+3D+Sim",
        tech: ["HTML5", "CSS3", "JS", "react", "Simulation", "Audio APIs"],
        liveUrl: "https://mypriveate-repo.vercel.app/",
        githubUrl: "#",
    },
    {
        id: "project-new-6",
        title: "BuildPro Hotel (Web Hierarchy)",
        description: "A clean, structured hotel website for 'The Paradise Villas,' focusing on clear web hierarchy and professional presentation of rooms, amenities, and booking views.",
        imageUrl: "https://placehold.co/600x400/0f172a/475569?text=BuildPro+Hotel",
        tech: ["HTML", "CSS", "Responsive Design", "Hierarchy"],
        liveUrl: "https://buildpro-hotel.vercel.app/",
        githubUrl: "#",
    },
    {
        id: "project-new-5",
        title: "Portfolio (Personal Site)",
        description: "My personal portfolio website, designed to showcase projects, skills, and experience with a modern, performance-focused frontend architecture.",
        imageUrl: "https://placehold.co/600x400/0f172a/475569?text=Ramesh+Portfolio",
        tech: ["React", "Tailwind CSS", "Framer Motion"],
        liveUrl: "https://rameshpotfoliyo.netlify.app/",
        githubUrl: "#",
    },
    {
        id: "project-new-4",
        title: "EcoWorld Living (Real Estate)",
        description: "A modern real estate platform built with the MERN stack. Showcases 3BHK flats, extensive clubhouse facilities (Yoga, Gym, Pool), and modern living concepts.",
        imageUrl: "https://placehold.co/600x400/0f172a/475569?text=Ecoworld+MERN",
        tech: ["React", "Vite", "Express", "MongoDB", "Netlify"],
        liveUrl: "https://ecoworldiii.netlify.app/",
        githubUrl: "#",
    },
    {
        id: "project-1",
        title: "Tourscape (Real-time Chat App)",
        description: "A real-time chat application for customer support, integrated with a mock API and featuring secure login authentication using Context API.",
        imageUrl: "/tourscape.png",
        tech: ["React", "Context-API", "Real-time Chat", "Hooks"],
        liveUrl: "https://singgad-site.netlify.app",
        githubUrl: "https://github.com/rsingad/singad.git",
    },
    {
        id: "project-6",
        title: "The Lake Mount v0.3 (Hotel Landing)",
        description: "The third, polished iteration of the Lake Mount landing page, focusing on advanced CSS and layout for a stunning presentation.",
        imageUrl: "https://placehold.co/600x400/0f172a/475569?text=Lake+Mount+v3",
        tech: ["HTML", "CSS", "Advanced Styling"],
        liveUrl: "https://the-lake-mount-0-3-lred.vercel.app/",
        githubUrl: "#",
    },
    {
        id: "project-5",
        title: "The Lake Mount v0.2",
        description: "An updated version of the hotel landing page concept, enhancing visual appeal and responsive layout using core web technologies.",
        imageUrl: "https://placehold.co/600x400/0f172a/475569?text=Lake+Mount+v2",
        tech: ["HTML", "CSS", "Layout"],
        liveUrl: "https://thelakemount02.netlify.app/",
        githubUrl: "#",
    },
    {
        id: "project-3",
        title: "Desktop Website (NAMARI)",
        description: "A classic desktop-first website layout, focusing on clean design and structural integrity using fundamental web technologies.",
        imageUrl: "/namari.png",
        tech: ["HTML", "CSS", "Desktop-First"],
        liveUrl: "https://rameshproject4.netlify.app",
        githubUrl: "https://github.com/rsingad/desktop-base-web.git",
    },
    {
        id: "project-2",
        title: "Wedding Web (Mobile-First)",
        description: "A responsive wedding invitation website designed with a crucial mobile-first approach, utilizing modern HTML and CSS media queries.",
        imageUrl: "/image.png",
        tech: ["HTML", "CSS", "Mobile-First"],
        liveUrl: "https://ramesh2ndproject.netlify.app",
        githubUrl: "https://github.com/rsingad/desktop-base-web.git",
    },
];

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 10,
        transition: { duration: 0.4 }
    }
};

// Helper to get consistent tech-themed colors
const getTechColor = (tech) => {
    const t = tech.toLowerCase();
    if (t.includes('react') || t.includes('vite')) return 'text-cyan-500 border-cyan-500/20 bg-cyan-500/5';
    if (t.includes('node') || t.includes('express')) return 'text-green-500 border-green-500/20 bg-green-500/5';
    if (t.includes('mongo') || t.includes('db')) return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5';
    if (t.includes('tail') || t.includes('css')) return 'text-sky-500 border-sky-500/20 bg-sky-500/5';
    if (t.includes('js') || t.includes('script')) return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5';
    if (t.includes('motion') || t.includes('anim')) return 'text-purple-500 border-purple-500/20 bg-purple-500/5';
    if (t.includes('html')) return 'text-orange-500 border-orange-500/20 bg-orange-500/5';
    return 'text-slate-400 border-slate-700/50 bg-slate-800/10';
};

const ProjectCard = React.forwardRef(({ project, i }, ref) => (
    <motion.div
        ref={ref}
        layout
        className="glass rounded-[3rem] overflow-hidden group transition-all duration-700 hover:-translate-y-4 flex flex-col border-white/5 dark:border-slate-800/50"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.2 }}
    >
        {/* Project Image Container */}
        <div className="h-64 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>

            <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            <div className="absolute top-6 left-6 z-20">
                <div className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black tracking-[0.2em] rounded-full shadow-2xl flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    PROJECT EXTRACT #{String(i + 1).padStart(2, '0')}
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-end gap-3">
                {project.liveUrl !== "#" && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white text-slate-950 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all shadow-2xl"
                        title="Live Preview"
                    >
                        <ExternalLink size={18} />
                    </a>
                )}
                {project.githubUrl !== "#" && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-slate-950 text-white border border-slate-800 rounded-2xl hover:bg-white hover:text-slate-950 transition-all shadow-2xl"
                        title="View Source"
                    >
                        <Github size={18} />
                    </a>
                )}
            </div>
        </div>

        {/* Project Details */}
        <div className="p-10 flex flex-col flex-grow relative">
            <div className="absolute top-10 right-10 opacity-[0.03] dark:opacity-[0.07] group-hover:opacity-20 transition-opacity duration-700">
                <Code size={80} strokeWidth={1} />
            </div>

            <h2 className="text-3xl font-black text-slate-950 dark:text-white mb-4 tracking-tighter leading-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {project.title}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow font-medium">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2.5 mb-10">
                {project.tech.map(t => (
                    <span key={t} className={`px-3.5 py-1.5 border text-[9px] font-black uppercase tracking-widest rounded-lg transition-colors duration-500 ${getTechColor(t)}`}>
                        {t}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-4 pt-8 border-t border-slate-100 dark:border-slate-800/50">
                <a
                    href={project.liveUrl !== "#" ? project.liveUrl : "#"}
                    target={project.liveUrl !== "#" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    onClick={(e) => project.liveUrl === "#" && e.preventDefault()}
                    className={`flex-1 flex items-center justify-center gap-2.5 text-[10px] font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-lg ${project.liveUrl !== "#" ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:scale-[1.03] shadow-slate-950/20 dark:shadow-white/10' : 'bg-slate-100 dark:bg-slate-900 text-slate-400 cursor-not-allowed opacity-50'}`}
                >
                    <ExternalLink size={14} />
                    <span>Run Instance</span>
                </a>

                {project.githubUrl !== "#" && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl hover:border-cyan-500 hover:text-cyan-500 transition-all"
                        title="Repository"
                    >
                        <Github size={16} />
                    </a>
                )}
            </div>
        </div>
    </motion.div>
));

function Project() {
    const PROJECTS_PER_LOAD = 3;
    const [visibleProjects, setVisibleProjects] = useState(PROJECTS_PER_LOAD);
    const totalProjects = projects.length;

    const hasMore = visibleProjects < totalProjects;
    const isExpanded = visibleProjects > PROJECTS_PER_LOAD;

    const handleToggleProjects = useCallback(() => {
        if (hasMore) {
            setVisibleProjects(prevCount => Math.min(prevCount + PROJECTS_PER_LOAD, totalProjects));
        } else if (isExpanded) {
            setVisibleProjects(PROJECTS_PER_LOAD);
        }
    }, [hasMore, isExpanded, totalProjects]);

    return (
        <>
            <Helmet>
                <title>Software Engineering Projects & Case Studies | Ramesh Singad</title>
                <meta name="description" content="View the portfolio of Ramesh Singad, featuring advanced 3D simulations, MERN stack applications, and professional web solutions. A showcase of innovation and technical excellence." />
                <meta name="keywords" content="Ramesh Singad Projects, Web Development Portfolio, MERN Stack Case Studies, React Developer Projects, UI/UX Design Portfolio, AI Project Showcase" />
            </Helmet>

            <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-24 overflow-hidden">

                {/* Unified Background Decorations */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[160px] animate-blob"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] h-[60%] w-[60%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[160px] animate-blob animation-delay-4000"></div>
                    <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-slate-50 dark:from-slate-950 to-transparent"></div>
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
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
                            <span>Exhibition Registry</span>
                        </div>
                    </motion.div>

                    {/* Main Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-32"
                    >
                        <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-none mb-8">
                            Selected <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-500">Works</span>
                        </h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            A curated selection of experiments, client solutions, and deep-dives into modern software architecture.
                        </p>
                    </motion.div>

                    {/* Project Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        <AnimatePresence mode="popLayout">
                            {projects.slice(0, visibleProjects).map((project, i) => (
                                <ProjectCard
                                    key={project.id}
                                    i={i}
                                    project={project}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Toggle Button Container */}
                    <div className="text-center mt-24">
                        <button
                            onClick={handleToggleProjects}
                            className={`group relative inline-flex items-center gap-4 font-black text-xs uppercase tracking-[0.2em] py-5 px-12 rounded-[2rem] transition-all duration-500 overflow-hidden shadow-2xl backdrop-blur-xl border
                                ${hasMore
                                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-800 dark:border-white'
                                    : 'bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800'
                                }`
                            }
                        >
                            {/* Inner Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                            <span>{hasMore ? 'Mount More Artifacts' : 'Collapse Gallery'}</span>
                            <div className="p-1 rounded-lg bg-cyan-500/20 text-cyan-500 group-hover:scale-110 transition-transform">
                                {hasMore ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Tech Signature Marquee (Unified with Skills page) */}
                <div className="mt-40 border-t border-slate-200 dark:border-slate-800 py-16 overflow-hidden select-none bg-slate-100/30 dark:bg-slate-900/10">
                    <div className="flex animate-infinite-scroll whitespace-nowrap">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-20 px-10 items-center">
                                <span className="text-6xl font-black text-slate-200 dark:text-slate-800/40 uppercase tracking-[1.5rem]">Web3</span>
                                <span className="text-6xl font-black text-slate-200 dark:text-slate-800/40 uppercase tracking-[1.5rem]">Cloud</span>
                                <span className="text-6xl font-black text-slate-200 dark:text-slate-800/40 uppercase tracking-[1.5rem]">AI/ML</span>
                                <span className="text-6xl font-black text-slate-200 dark:text-slate-800/40 uppercase tracking-[1.5rem]">FullStack</span>
                                <span className="text-6xl font-black text-slate-200 dark:text-slate-800/40 uppercase tracking-[1.5rem]">DevOps</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}

export default Project;