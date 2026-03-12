import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Github, Mail, MapPin, Globe, Layout, Cpu, Code2, Rocket, ExternalLink } from "lucide-react";
import { NavLink } from "react-router-dom";
import SocialMediaIcon from "./socialmediaicon"; // Reusing your social media icons
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import AuthModal from "./AuthModal"; // Import the new modal component

function Footer() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [showScroll, setShowScroll] = useState(false);

    // Visibility logic for scroll button
    useEffect(() => {
        const checkScroll = () => {
            if (!showScroll && window.pageYOffset > 300) {
                setShowScroll(true);
            } else if (showScroll && window.pageYOffset <= 300) {
                setShowScroll(false);
            }
        };
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [showScroll]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className="relative bg-slate-50 dark:bg-slate-950 pt-24 pb-12 overflow-hidden border-t border-slate-200 dark:border-slate-800">
                {/* Background Decorations */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-20 transition-opacity duration-1000">
                    <div className="absolute -bottom-[20%] -left-[10%] h-[60%] w-[60%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute -top-[20%] -right-[10%] h-[60%] w-[60%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Upper Footer: Multi-Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                        
                        {/* Column 1: Brand Identity */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                    <span className="text-white font-black text-xl">RS</span>
                                </div>
                                <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">Singad</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                Senior Software Engineer & AI Architect specializing in high-performance web systems and innovative digital experiences.
                            </p>
                            <div className="flex gap-4">
                                <SocialMediaIcon />
                            </div>
                        </motion.div>

                        {/* Column 2: Navigation Links */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="space-y-6"
                        >
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">Navigation</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Home', path: '/' },
                                    { name: 'About', path: '/about' },
                                    { name: 'Skills', path: '/skill' },
                                    { name: 'Projects', path: '/project' },
                                    { name: 'Experience', path: '/experience' },
                                    { name: 'Insights', path: '/insights' },
                                    { name: 'Traffic', path: '/traffic-dashboard' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <NavLink 
                                            to={item.path} 
                                            className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 font-black text-sm transition-colors flex items-center gap-2 group"
                                        >
                                            <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full group-hover:scale-150 group-hover:bg-cyan-500 transition-all"></div>
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Column 3: Expertise Focus */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">Core Focus</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: 'MERN Development', icon: <Layout className="w-4 h-4" /> },
                                    { name: 'AI Integration', icon: <Cpu className="w-4 h-4" /> },
                                    { name: 'System Architecture', icon: <Code2 className="w-4 h-4" /> },
                                    { name: 'Cloud Solutions', icon: <Globe className="w-4 h-4" /> }
                                ].map((item) => (
                                    <li key={item.name} className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-black text-sm">
                                        <div className="text-cyan-600 dark:text-cyan-500">{item.icon}</div>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Column 4: Quick Contact */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                        >
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">Contact</h4>
                            <div className="space-y-4 font-black">
                                <a href="mailto:r.singerjat@gmail.com" className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors">
                                    <Mail className="w-4 h-4 text-cyan-600" />
                                    r.singerjat@gmail.com
                                </a>
                                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                                    <MapPin className="w-4 h-4 text-cyan-600" />
                                    Jaipur, Rajasthan, India
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsAuthModalOpen(true)}
                                className="group w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-4 px-6 rounded-2xl hover:bg-cyan-600 dark:hover:bg-cyan-500 transition-all duration-300 shadow-xl"
                             >
                                <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                <span>Admin Access</span>
                            </button>
                        </motion.div>

                    </div>

                    {/* Lower Footer: Copyright & Bottom Actions */}
                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
                                &copy; {currentYear} Ramesh Singad. <span className="hidden sm:inline">Engineered for Excellence.</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <NavLink to="/contact" className="text-xs font-black uppercase tracking-widest text-cyan-600 hover:text-cyan-500 transition-colors flex items-center gap-2">
                                Start a Project <Rocket className="w-3 h-3" />
                            </NavLink>
                            <AnimatePresence>
                                {showScroll && (
                                    <motion.button 
                                        onClick={scrollToTop}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="bg-cyan-600 dark:bg-slate-800 rounded-full p-2.5 hover:bg-cyan-500 dark:hover:bg-slate-700 transition-all shadow-xl shadow-cyan-500/20"
                                        aria-label="Scroll back to top"
                                    >
                                        <ArrowUp className="w-4 h-4 text-white" />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Render the modal */}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
}

export default Footer;

