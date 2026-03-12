import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function NotFound() {
    return (
        <>
            <Helmet>
                <title>404 - Page Not Found | Ramesh Singad</title>
                <meta name="description" content="The page you are looking for does not exist. Return to Ramesh Singad's home base." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
            {/* Background pattern/glow for aesthetic */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: `radial-gradient(#0ea5e9 1px, transparent 1px)`, backgroundSize: '1.5rem 1.5rem', maskImage: 'radial-gradient(ellipse at center, white, transparent 60%)' }}></div>

            <motion.div
                className="relative z-10 text-center max-w-lg p-8 sm:p-12 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-red-500/30 shadow-2xl shadow-red-900/50"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <XCircle size={64} className="text-red-500 mx-auto mb-6" />

                <h1 className="text-8xl font-extrabold text-red-400 mb-4 tracking-tighter">
                    404
                </h1>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                    Connection Lost
                </h2>
                
                <p className="text-lg text-slate-300 mb-8">
                    The requested page resource could not be found in the system registry. It might have been moved or permanently deleted.
                </p>

                <NavLink
                    to="/"
                    className="inline-flex items-center gap-2 bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-cyan-800/50 hover:bg-cyan-500 transition-all duration-300 transform hover:scale-[1.02]"
                >
                    <ArrowLeft size={20} />
                    Return to Home Base
                </NavLink>
            </motion.div>
        </main>
        </>
    );
}

export default NotFound;