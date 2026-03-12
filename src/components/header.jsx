import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- Helper Components for Icons (Unchanged) ---

const MenuIcon = ({ ...props }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = ({ ...props }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SunIcon = ({ ...props }) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = ({ ...props }) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // --- UPDATED NAVIGATION LINKS ---
  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/about", text: "About" },
    { to: "/education", text: "Education" },
    { to: "/skills", text: "Skills" },
    { to: "/experience", text: "Experience" }, 
    // NEW: Experience and Education added here
    { to: "/project", text: "Projects" },
  ];

  const navLinkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition-colors duration-300 ${
      isActive 
      ? "text-cyan-400" 
      : "text-gray-400 hover:text-cyan-400"
    }`;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.2 }}
        className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-300/10 shadow-sm dark:shadow-none"
        aria-label="Primary Header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            <NavLink to="/" className="text-3xl font-bold text-slate-900 dark:text-white tracking-wider" aria-label="Ramesh Singad - Homepage">
              R<span className="text-cyan-600 dark:text-cyan-400">S</span>
            </NavLink>
            
            <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={navLinkClass}>
                  {link.text}
                </NavLink>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            
              <NavLink 
                to="/contact" 
                className="hidden sm:inline-block text-sm font-bold text-cyan-700 dark:text-white bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 rounded-full px-5 py-2 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 transition-all duration-300"
              >
                Contact Me
              </NavLink>
            
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)} 
                  className="text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 z-40 w-full bg-slate-900/95 backdrop-blur-lg border-b border-slate-300/10 md:hidden"
          >
            <nav className="flex flex-col items-center space-y-4 p-6" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                  {link.text}
                </NavLink>
              ))}
              <NavLink 
                to="/contact" 
                className="w-full text-center text-white bg-cyan-500 rounded-full px-6 py-3 mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Me
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;