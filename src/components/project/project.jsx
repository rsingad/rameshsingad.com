import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Github, ExternalLink, Code, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState, useCallback } from 'react';

// Project Data (Using your existing list)
const projects = [
    {
        id: "project-new-7",
        title: "The Paradise Billas (Advanced)",
        description: "A highly interactive, 3D-type experiential website featuring advanced simulations like splashing pool water, stone-dropping ripples, and dynamic audio feedback in the jazz hall. Integrates sub-webs for Pool, Wedding, Coffee Shop, and Spa booking/viewing.",
        imageUrl: "https://placehold.co/600x400/0f172a/475569?text=Private+Repo+3D+Sim",
        tech: ["HTML5", "CSS3", "JS", "Simulation", "Audio APIs"],
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
    hidden: { opacity: 0, y: 30, scale: 0.95 }, // Added scale for better reveal effect
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
            duration: 0.7, // Slightly slower duration for smoothness
            ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for 'pop' effect
        } 
    }
};

const ProjectCard = ({ project, i }) => (
    <motion.div
        // 1. ADDED LAYOUT PROP FOR SMOOTH GRID TRANSITION
        layout
        className="bg-slate-900/80 border border-sky-700/50 rounded-xl overflow-hidden shadow-2xl shadow-slate-950 hover:shadow-sky-900/50 transition-shadow duration-300 flex flex-col"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        // Stagger the animation based on index
        style={{ transitionDelay: `${i * 0.08}s` }}
    >
        {/* Project Image */}
        <div className="h-48 overflow-hidden relative">
            <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
            />
            <span className="absolute top-3 left-3 bg-sky-600/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">#{i + 1}</span>
        </div>
        
        {/* Project Details */}
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-slate-400 text-sm mb-4 flex-grow">{project.description}</p>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                {project.tech.map(t => (
                    <span key={t} className="bg-cyan-800/30 text-cyan-300 text-xs font-semibold rounded-full px-3 py-1 border border-cyan-700/50">
                        {t}
                    </span>
                ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-700/50">
                <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-sm bg-sky-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-sky-500 transition-colors"
                >
                    <ExternalLink size={16} /><span>Live</span>
                </a>
                <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-sm border border-slate-600 text-slate-300 font-semibold py-2 px-3 rounded-lg hover:border-indigo-400 hover:text-indigo-400 transition-colors"
                >
                    <Github size={16} /><span>GitHub</span>
                </a>
            </div>
        </div>
    </motion.div>
);

function Project() {
    const PROJECTS_PER_LOAD = 4;
    const [visibleProjects, setVisibleProjects] = useState(PROJECTS_PER_LOAD);
    const totalProjects = projects.length;

    const hasMore = visibleProjects < totalProjects;
    const isExpanded = visibleProjects > PROJECTS_PER_LOAD;

    const handleToggleProjects = useCallback(() => {
        if (hasMore) {
            // Load more: Add 4 projects or remaining projects
            setVisibleProjects(prevCount => Math.min(prevCount + PROJECTS_PER_LOAD, totalProjects));
        } else if (isExpanded) {
            // Show less: Reset to initial 4 projects
            setVisibleProjects(PROJECTS_PER_LOAD);
        }
    }, [hasMore, isExpanded, totalProjects]);

    const buttonText = hasMore 
        ? `Show Next ${Math.min(PROJECTS_PER_LOAD, totalProjects - visibleProjects)} Projects`
        : 'Show Less Projects';
    
    const buttonIcon = hasMore ? <ChevronDown size={20} /> : <ChevronUp size={20} />;


    return (
        <>
            <Helmet>
                <title>My Projects | Ramesh Singad</title>
                <meta name="description" content="A simple, responsive gallery of projects by Ramesh Singad." />
            </Helmet>
            
            <main className="min-h-screen bg-slate-900 text-white relative">
                
                {/* --- HEADER --- */}
                <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <h1 className="text-5xl sm:text-6xl font-black tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Project Gallery</span>
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-300 font-light">
                            Explore my technical journey through a simple, yet comprehensive selection of my creative work.
                        </p>
                        <Code size={40} className="mx-auto mt-6 text-cyan-400/80" />
                    </motion.div>
                </div>
                
                {/* --- PROJECT GRID --- */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <motion.div 
                        // 2. ADDED LAYOUT PROP HERE TO ANIMATE GRID CHANGES
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {projects.slice(0, visibleProjects).map((project, i) => (
                            // 3. ADDED layout PROP TO ProjectCard WRAPPER (motion.div)
                            <ProjectCard 
                                key={project.id} 
                                i={i} 
                                project={project} 
                            />
                        ))}
                    </motion.div>
                    
                    {/* --- SINGLE TOGGLE BUTTON --- */}
                    <div className="text-center mt-12">
                        {(hasMore || isExpanded) && (
                            <button
                                onClick={handleToggleProjects}
                                className={`inline-flex items-center gap-2 font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] 
                                    ${hasMore 
                                        ? 'bg-indigo-600 text-white shadow-indigo-500/50 hover:bg-indigo-500'
                                        : 'border border-slate-700 text-slate-300 hover:border-sky-400 hover:text-sky-400 bg-slate-800'
                                    }`
                                }
                            >
                                {buttonText} {buttonIcon}
                            </button>
                        )}
                        {!hasMore && !isExpanded && (
                            <p className="text-sm text-slate-500 py-3">All projects loaded.</p>
                        )}
                    </div>
                </div>
                
                {/* Final CTA/Footer */}
                <div className="py-12 text-center border-t border-slate-800">
                    <p className="text-sm text-slate-500">
                        Built with React and Tailwind CSS.
                    </p>
                </div>
            </main>
        </>
    );
}

export default Project;