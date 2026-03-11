import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Github } from "lucide-react";
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
            <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Copyright Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5 }}
                            className="text-center md:text-left"
                        >
                            <p className="text-sm font-medium">&copy; {currentYear} Ramesh Singad. All Rights Reserved.</p>
                            <p className="text-xs mt-1">Designed & Built with ❤️ in India</p>
                        </motion.div>

                        {/* Social Media Icons */}
                         <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <SocialMediaIcon />
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex items-center gap-4"
                        >
                            <button 
                               onClick={() => setIsAuthModalOpen(true)}
                               className="flex items-center gap-2 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-cyan-600 dark:hover:border-cyan-500 transition-all shadow-sm"
                            >
                               <Github className="w-4 h-4" />
                               Admin Connect
                            </button>
                            <AnimatePresence>
                                {showScroll && (
                                    <motion.button 
                                        onClick={scrollToTop}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="bg-cyan-600 dark:bg-slate-800/50 border border-cyan-500 dark:border-slate-700 rounded-full p-2 hover:bg-cyan-500 dark:hover:bg-slate-700 hover:border-cyan-500 transition-all shadow-lg shadow-cyan-500/20"
                                        aria-label="Scroll back to top"
                                    >
                                        <ArrowUp className="w-5 h-5 text-white dark:text-slate-300" />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </footer>

            {/* Render the modal */}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
}

export default Footer;

