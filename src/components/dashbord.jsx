import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { User, ShieldCheck, XCircle } from "lucide-react";

// This component handles the view for both real users (from GitHub) and the dummy admin
function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    
    // Check if we are logged in as the dummy admin
    const isAdmin = location.state?.isAdmin;

    useEffect(() => {
        // If it's the admin, we don't need to fetch data.
        if (isAdmin) {
            setLoading(false);
            return;
        }

        // Fetch real users if not admin
        axios.get("http://localhost:5000/auth/all-users", {
            withCredentials: true, // 👈 This line sends the session cookie to the server
        })
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch users:", err.message);
                setError("Could not load user data. You might not be logged in.");
                setLoading(false);
            });
    }, [isAdmin]);

    return (
        <>
            <Helmet>
                <title>Dashboard | Ramesh Singad</title>
            </Helmet>
            <main className="min-h-screen bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                 <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `radial-gradient(#0ea5e9 1px, transparent 1px)`, backgroundSize: '1.5rem 1.5rem', maskImage: 'radial-gradient(ellipse at center, white, transparent 60%)' }}></div>

                <div className="max-w-7xl mx-auto relative z-10">
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
                                User Dashboard
                            </span>
                        </h1>
                    </motion.div>
                    
                    <div className="mt-12">
                        {loading && <p className="text-center text-slate-400">Loading Dashboard...</p>}
                        
                        {/* Admin View */}
                        {isAdmin && (
                            <motion.div 
                                className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-8 text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <ShieldCheck className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                                <h2 className="text-3xl font-bold text-white">Welcome, Admin!</h2>
                                <p className="text-slate-400 mt-2">You have successfully logged in via the local admin account.</p>
                                <NavLink to="/" className="inline-block mt-6 bg-cyan-500 text-slate-900 font-bold py-2 px-6 rounded-lg hover:bg-cyan-400 transition-colors">
                                    Go to Homepage
                                </NavLink>
                            </motion.div>
                        )}

                        {/* Real Users View */}
                        {!isAdmin && !loading && (
                            <div>
                                {error && (
                                    <div className="bg-red-900/50 border border-red-500/30 rounded-lg p-8 text-center">
                                        <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                                        <h2 className="text-3xl font-bold text-white">Access Denied</h2>
                                        <p className="text-slate-400 mt-2">
                                            {error} Please try logging in with GitHub first.
                                        </p>
                                         <NavLink to="/" className="inline-block mt-6 bg-cyan-500 text-slate-900 font-bold py-2 px-6 rounded-lg hover:bg-cyan-400 transition-colors">
                                            Go to Homepage
                                        </NavLink>
                                    </div>
                                )}
                                {users.length > 0 && !error ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {users.map((user) => (
                                            <div key={user._id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col items-center text-center">
                                                <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full mb-4 border-2 border-slate-600"/>
                                                <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                                                <p className="text-sm text-slate-400">{user.email || "No email provided"}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    !error && <p className="text-center text-slate-400">No users found.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;

