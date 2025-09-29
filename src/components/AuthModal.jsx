import { motion, AnimatePresence } from "framer-motion";
import { Github, X, Mail, Lock, Link } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Redirection के लिए

// Google Icon SVG
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.35 11.1H12.18v2.8h4.94c-.2 1.4-1.2 2.6-2.7 2.6-1.6 0-3-1.3-3-3s1.3-3 3-3c.8 0 1.5.3 2 .8l2.2-2.2c-1.3-1.2-3-2-4.9-2-3.9 0-7 3.1-7 7s3.1 7 7 7c3.7 0 6.7-2.8 6.7-6.8 0-.5-.1-.9-.2-1.3z" />
    </svg>
);

function AuthModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Navigation के लिए hook

    if (!isOpen) return null;

    const handleLogin = (e) => {
        e.preventDefault();
        // Dummy credentials check
        if (email === 'admin@ramesh.com' && password === 'password') {
            setError('');
            onClose(); // Modal बंद करें
            navigate('/dashboard'); // Dashboard पर जाएँ
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full max-w-md bg-slate-800/50 border border-slate-700 rounded-2xl shadow-2xl shadow-cyan-500/20"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative p-8">
                            <motion.button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                aria-label="Close authentication modal"
                            >
                                <X className="w-6 h-6" />
                            </motion.button>
                            
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-white mb-2">Join or Log In</h2>
                                <p className="text-slate-400 mb-6">Start by connecting your account or log in as an admin.</p>
                            </div>

                            {/* Social Logins */}
                            <div className="space-y-4">
                                <a href={`${import.meta.env.VITE_API_BASE_URL}/auth/github`}
                                 className="w-full flex items-center justify-center gap-3 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white font-semibold hover:bg-slate-700 hover:border-cyan-500 transition-all duration-300">
                                   <FaGithub className="w-5 h-5" /> Continue with GitHub
                                </a>
                                <a href="#" className="w-full flex items-center justify-center gap-3 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white font-semibold hover:bg-slate-700 hover:border-cyan-500 transition-all duration-300">
                                   <GoogleIcon /> Continue with Google
                                </a>
                            </div>

                            <div className="flex items-center my-6">
                                <hr className="flex-grow border-slate-600" />
                                <span className="mx-4 text-slate-500 text-sm">OR</span>
                                <hr className="flex-grow border-slate-600" />
                            </div>

                            {/* Admin Login Form */}
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1 text-left">Admin Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"/>
                                        <input 
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="admin@ramesh.com"
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1 text-left">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"/>
                                        <input 
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="password"
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                <button
                                    type="submit"
                                    className="w-full bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105"
                                >
                                    Login to Dashboard
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default AuthModal;

