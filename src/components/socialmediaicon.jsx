import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Instagram, Facebook, Share2, X } from "lucide-react";
import React, { useState } from 'react';

// Data for social links with Lucide icons
const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/ramesh-singar-30b013251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", icon: <Linkedin size={20} />, color: "#0A66C2" },
    { name: "GitHub", url: "https://github.com/rsingad", icon: <Github size={20} />, color: "#E0E0E0" },
    { name: "Instagram", url: "https://www.instagram.com/_teja_tiger?igsh=OGQ5ZDc2ODk2ZA==", icon: <Instagram size={20} />, color: "#E4405F" },
    { name: "Facebook", url: "https://www.facebook.com/", icon: <Facebook size={20} />, color: "#1877F2" },
];

const ORBIT_RADIUS = 60; // The distance of icons from the center

function SocialMediaIcon() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative z-20">
            {/* Main "Connect" Button */}
            <motion.button
                className="w-14 h-14 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 z-10 relative"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                aria-label="Toggle social media links"
            >
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={isOpen ? "close" : "share"}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <X size={24} /> : <Share2 size={24} />}
                    </motion.div>
                </AnimatePresence>
            </motion.button>

            {/* Orbiting Icons */}
            <AnimatePresence>
                {isOpen &&
                    socialLinks.map((link, index) => {
                        const angle = (index / socialLinks.length) * 2 * Math.PI - (Math.PI / 2);
                        const x = ORBIT_RADIUS * Math.cos(angle);
                        const y = ORBIT_RADIUS * Math.sin(angle);

                        return (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute w-12 h-12 top-1/2 left-1/2 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center"
                                initial={{ x: 0, y: 0, opacity: 0, scale: 0.5, marginTop: '-24px', marginLeft: '-24px' }}
                                animate={{ x, y, opacity: 1, scale: 1 }}
                                exit={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20, delay: index * 0.05 }}
                                whileHover={{ 
                                    scale: 1.2, 
                                    borderColor: link.color,
                                    color: link.color,
                                    boxShadow: `0 0 12px ${link.color}`
                                }}
                                aria-label={`Link to my ${link.name} profile`}
                            >
                                {link.icon}
                            </motion.a>
                        );
                    })}
            </AnimatePresence>
        </div>
    );
}

export default SocialMediaIcon;

