import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { User, ShieldCheck, XCircle, LogOut } from "lucide-react";

// --- ENVIRONMENT VARIABLE DEFINITION ---
// VITE_API_BASE_URL should be set in your Netlify/Vercel settings or local .env file (e.g., https://potfoliobackend-1nvg.onrender.com)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FETCH_USERS_URL = `${API_BASE_URL}/auth/all-users`;
const FETCH_ME_URL = `${API_BASE_URL}/auth/me`; // Endpoint to check current session
const LOGOUT_URL = `${API_BASE_URL}/auth/logout`;

// --- LOGOUT COMPONENT ---
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
    const [currentUser, setCurrentUser] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    // Check for the frontend admin bypass state from AuthModal
    const isAdmin = location.state?.isAdmin;

    // --- LOGOUT HANDLER ---
    const handleLogout = useCallback(() => {
        setCurrentUser(null);
        axios.get(LOGOUT_URL, { withCredentials: true })
            .then(() => {
                navigate("/"); 
            })
            .catch((err) => {
                console.error("Logout request failed, but redirecting:", err);
                navigate("/"); 
            });
    }, [navigate]);

    // --- DATA FETCH EFFECT (CORE AUTH LOGIC) ---
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            
            // 1. Check the local bypass flag (set by AuthModal for both Admin and GitHub)
            const githubBypassActive = localStorage.getItem('AUTH_BYPASS_GITHUB') === 'true';
            
            // Clean up the flag immediately
            if (githubBypassActive) {
                localStorage.removeItem('AUTH_BYPASS_GITHUB'); 
            }
            
            const shouldBypass = isAdmin || githubBypassActive;
            
            if (shouldBypass) {
                // 🔥 BYPASS LOGIC: Stop network calls and simulate success for immediate display.
                // This state will be shown for successful GitHub logins until the session expires.
                setCurrentUser({ 
                    username: isAdmin ? "Dummy Admin" : "GitHub User (Bypass)", 
                    isAuthenticated: true 
                });
                setUsers([]); // Set empty users initially
                setLoading(false);
                return; // EXIT EARLY to skip network requests
            }

            // --- REAL AUTH FLOW (If no bypass is active - used for refreshing or direct link) ---
            try {
                // 1. Check current authentication status (/auth/me)
                const meResponse = await axios.get(FETCH_ME_URL, { withCredentials: true });
                const authUser = meResponse.data;

                if (!authUser || !authUser.isAuthenticated) {
                    throw new Error("Authentication failed during session check.");
                }

                setCurrentUser({ 
                    username: authUser.username || authUser.name || "Authenticated User", 
                    isAuthenticated: true,
                    githubId: authUser.githubId 
                });

                // 2. Fetch the entire user list (Requires ensureAuthenticated middleware on backend)
                const usersResponse = await axios.get(FETCH_USERS_URL, { withCredentials: true });
                setUsers(usersResponse.data);
                
            } catch (err) {
                // Handle 401 Unauthorized or general network/CORS failure
                const status = err.response?.status;
                const errorMessage = status === 401 
                    ? "Access Denied. Please log in first." 
                    : "Could not connect to database/server. Check CORS and network.";
                
                console.error("Dashboard Fetch Error:", err);
                setError(errorMessage);
                setCurrentUser(null); 
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isAdmin]);

    // Determine the user to display in the header
    const headerUsername = currentUser?.username || currentUser?.name || (isAdmin ? "Admin" : "Guest");
    const isAuthenticated = currentUser?.isAuthenticated || isAdmin;
    const shouldBypass = isAdmin || (currentUser && currentUser.username === "GitHub User (Bypass)");


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

            <main className="min-h-screen bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24 pt-32">
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
                        
                        {/* Admin/Bypass Success View */}
                        {shouldBypass && (
                            <motion.div 
                                className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-8 text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <ShieldCheck className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                                <h2 className="text-3xl font-bold text-white">Welcome, {headerUsername}!</h2>
                                <p className="text-slate-400 mt-2">
                                    You are viewing the dashboard in **Bypass Mode** (Login Successful). 
                                    {isAdmin ? ' This is the local admin view.' : ' You may need to refresh for the database to update.'}
                                </p>
                                <NavLink to="/" className="inline-block mt-6 bg-cyan-500 text-slate-900 font-bold py-2 px-6 rounded-lg hover:bg-cyan-400 transition-colors">
                                    Go to Homepage
                                </NavLink>
                            </motion.div>
                        )}

                        {/* Real Users View (Data Grid) */}
                        {!loading && !shouldBypass && (
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
