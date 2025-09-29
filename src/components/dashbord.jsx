import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom"; // useNavigate added
import { User, ShieldCheck, XCircle, LogOut } from "lucide-react"; // LogOut added

// 1. ENVIRONMENT VARIABLE DEFINITION
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL ; // New: Frontend URL for redirection

const FETCH_USERS_URL = `${API_BASE_URL}/auth/all-users`;
const LOGOUT_URL = `${API_BASE_URL}/auth/logout`;

// --- NEW: LOGOUT COMPONENT ---
const LogoutButton = ({ username, isAdmin, onLogout }) => (
    <div className="flex items-center gap-4 p-3 bg-slate-800/80 rounded-full border border-slate-700 shadow-lg">
        <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-semibold text-white truncate max-w-28">
                {username || (isAdmin ? "Dummy Admin" : "User")}
            </span>
        </div>
        <motion.button
            onClick={onLogout}
            className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Logout"
        >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
        </motion.button>
    </div>
);


function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null); // State to hold the logged-in user info

    const location = useLocation();
    const navigate = useNavigate();

    const isAdmin = location.state?.isAdmin;

    // --- LOGOUT HANDLER ---
    const handleLogout = useCallback(() => {
        // Clear local state immediately for a fast response
        setCurrentUser(null);
        
        // Call the backend endpoint to clear the session and redirect
        axios.get(LOGOUT_URL, { withCredentials: true })
            .then(() => {
                // Redirect to the frontend root after successful backend logout
                navigate("/"); 
            })
            .catch((err) => {
                console.error("Logout failed:", err);
                // Even if the request fails, assume session cleared and redirect
                navigate("/"); 
            });
    }, [navigate]);

    // --- DATA FETCH EFFECT ---
    useEffect(() => {
        // 1. Handle Admin View immediately
        if (isAdmin) {
            setLoading(false);
            setCurrentUser({ name: "Dummy Admin (Local)", isAuthenticated: true });
            return;
        }

        // 2. Fetch all users from the database AND check current user status
        axios.get(FETCH_USERS_URL, {
            withCredentials: true, 
        })
        .then((res) => {
            // Assume the API returns the list of users AND the current authenticated user's details
            // The API response structure needs to be adjusted on the backend to include current user status
            // For now, we assume the server checks authentication and returns data only if logged in.
            
            // To be realistic, let's try to fetch the current user first.
            // Since we can't change the API here, we assume if the fetch succeeds, we are authenticated.
            setUsers(res.data);
            
            // Temporary logic: Use the first user in the list as the 'current user' for display purposes
            if (res.data && res.data.length > 0) {
                 setCurrentUser({ 
                    name: res.data[0].username || res.data[0].name || "Authenticated User", 
                    isAuthenticated: true,
                    githubId: res.data[0].githubId 
                });
            } else {
                 setCurrentUser({ name: "Authenticated User", isAuthenticated: true });
            }
            
            setLoading(false);
        })
        .catch((err) => {
            const errorMessage = err.response?.status === 401 
                ? "Access Denied. Please log in first." 
                : "Could not load user data. Check server connection and CORS settings.";
            
            console.error("Failed to fetch users:", err.message);
            setError(errorMessage);
            setLoading(false);
            setCurrentUser({ isAuthenticated: false });
        });
    }, [isAdmin]);

    // Determine the user to display in the header
    const headerUsername = currentUser?.name || (isAdmin ? "Admin" : "Guest");
    const isAuthenticated = currentUser?.isAuthenticated || isAdmin;


    return (
        <>
            <Helmet>
                <title>Dashboard | Ramesh Singad</title>
            </Helmet>
            
            {/* --- TOP STATUS BAR / LOGOUT --- */}
            <div className="fixed top-0 w-full p-4 bg-slate-900/90 backdrop-blur-md z-50 border-b border-slate-800 flex justify-end">
                 {isAuthenticated && (
                    <LogoutButton 
                        username={headerUsername} 
                        isAdmin={isAdmin}
                        onLogout={handleLogout} 
                    />
                 )}
            </div>

            <main className="min-h-screen bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24 pt-32"> {/* Increased padding-top for fixed header */}
                <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `radial-gradient(#0ea5e9 1px, transparent 1px)`, backgroundSize: '1.5rem 1.5rem', maskImage: 'radial-gradient(ellipse at center, white, transparent 60%)' }}></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
                                User Database Access
                            </span>
                        </h1>
                         <p className="text-slate-400 mt-2 text-lg">Displaying users authenticated through the GitHub OAuth system.</p>
                    </motion.div>
                    
                    <div className="mt-12">
                        {loading && <p className="text-center text-slate-400">Loading Dashboard...</p>}
                        
                        {/* Admin View (Dummy) */}
                        {isAdmin && (
                            <motion.div 
                                className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-8 text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <ShieldCheck className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                                <h2 className="text-3xl font-bold text-white">Welcome, {headerUsername}!</h2>
                                <p className="text-slate-400 mt-2">You are viewing the database as the local **Admin**. Real user data is shown below.</p>
                                <NavLink to="/" className="inline-block mt-6 bg-cyan-500 text-slate-900 font-bold py-2 px-6 rounded-lg hover:bg-cyan-400 transition-colors">
                                    Go to Homepage
                                </NavLink>
                            </motion.div>
                        )}

                        {/* Real Users View */}
                        {!loading && (
                            <div>
                                {error && (
                                    <div className="bg-red-900/50 border border-red-500/30 rounded-lg p-8 text-center">
                                        <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                                        <h2 className="text-3xl font-bold text-white">Access Denied</h2>
                                        <p className="text-slate-400 mt-2">
                                            {error}
                                        </p>
                                        <NavLink to="/" className="inline-block mt-6 bg-cyan-500 text-slate-900 font-bold py-2 px-6 rounded-lg hover:bg-cyan-400 transition-colors">
                                            Go to Homepage
                                        </NavLink>
                                    </div>
                                )}
                                {users.length > 0 && !error ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                                        {users.map((user) => (
                                            <div key={user._id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col items-center text-center">
                                                <User className="w-16 h-16 text-indigo-400 mx-auto mb-4" /> 
                                                <h3 className="text-xl font-semibold text-white">{user.username || user.name || "GitHub User"}</h3>
                                                <p className="text-sm text-slate-400">ID: {user.githubId}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    !error && <p className="text-center text-slate-400 mt-8">No users found in the database.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

export default Dashboard;