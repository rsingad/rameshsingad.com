import { motion } from "framer-motion";
import { ArrowUp, Github } from "lucide-react";
import SocialMediaIcon from "./socialmediaicon"; // Reusing your social media icons
import React, { useState } from 'react'; // Import useState
import AuthModal from "./AuthModal"; // Import the new modal component

function Footer() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className="bg-slate-900 border-t border-slate-800 text-slate-400">
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
                            <p className="text-sm">&copy; {currentYear} Ramesh Singad. All Rights Reserved.</p>
                            <p className="text-xs mt-1">Designed & Built with ❤️</p>
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
                               className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-sm hover:bg-slate-700 hover:border-cyan-500 transition-colors"
                            >
                               <Github className="w-4 h-4" />
                               Connect
                            </button>
                            <button 
                                onClick={scrollToTop}
                                className="bg-slate-800/50 border border-slate-700 rounded-full p-2 hover:bg-slate-700 hover:border-cyan-500 transition-colors"
                                aria-label="Scroll back to top"
                            >
                                <ArrowUp className="w-5 h-5 text-slate-300" />
                            </button>
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

