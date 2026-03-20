import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Send, Loader, CheckCircle, XCircle, AlertCircle, Sparkles } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import SocialMediaIcon from "./socialmediaicon";

// Helper component for contact info items
const ContactInfoItem = ({ icon, text, label, href }) => (
    <motion.a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="glass p-8 rounded-[2rem] flex items-center gap-8 group transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 border border-white/5 dark:border-slate-800/50 relative overflow-hidden"
        whileHover={{ x: 10 }}
    >
        {/* Subtle Inner Glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        
        <div className="w-16 h-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500">
            <div className="transition-colors">
                {icon}
            </div>
        </div>
        <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-500 mb-2">{label}</span>
            <span className="text-xl font-black text-slate-950 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-none">{text}</span>
        </div>
        
        {/* Decorative Corner Icon */}
        <div className="absolute -bottom-2 -right-2 opacity-[0.03] dark:opacity-[0.07] group-hover:opacity-10 transition-opacity duration-700">
             {icon}
        </div>
    </motion.a>
);

// Helper for input fields with validation
const ValidatedInput = ({ type = 'text', name, placeholder, value, onChange, error, onBlur, touched }) => (
    <div className="relative group">
        <input 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
            onBlur={onBlur}
            required 
            className={`w-full p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-2 rounded-2xl focus:outline-none transition-all duration-500 dark:text-white font-black placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-xl ${touched && error ? 'border-red-500/50 focus:ring-4 focus:ring-red-500/10' : 'border-slate-100 dark:border-slate-800/50 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 focus:shadow-cyan-500/5'}`} 
        />
        
        {/* Glow Effect on Focus */}
        <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500"></div>

        <AnimatePresence>
            {touched && error && (
                <motion.p 
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-red-500 text-[9px] font-black uppercase tracking-wider bg-white dark:bg-slate-900 border border-red-500/20 px-3 py-1.5 rounded-lg shadow-2xl"
                    initial={{ opacity: 0, x: 10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.9 }}
                >
                    <AlertCircle size={10} /> {error}
                </motion.p>
            )}
        </AnimatePresence>
    </div>
);


function Contact() {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({ 
        name: searchParams.get('name') || "", 
        email: searchParams.get('email') || "", 
        subject: searchParams.get('subject') || "", 
        message: searchParams.get('message') || "" 
    });
    const [status, setStatus] = useState("idle");
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({
        name: !!searchParams.get('name'),
        email: !!searchParams.get('email'),
        message: !!searchParams.get('message')
    });
    const [focusStage, setFocusStage] = useState(0); // 0: None, 1: Active

    const validate = () => {
        const newErrors = {};
        if (formData.name && formData.name.length < 3) newErrors.name = "Short Name";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid Email";
        if (formData.message && formData.message.length < 10) newErrors.message = "Message too short";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [formData]);


    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
        setFocusStage(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ name: true, email: true, message: true });
        if (!validate()) return;
        setStatus("sending");
        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL || "";
            const response = await axios.post(`${API_URL}/api/contact`, formData);
            if (response.status === 200) {
                setStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });
                setTouched({});
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error:", error);
            setStatus("error");
        }
    };
    
    const isFormValid = Object.keys(errors).length === 0 && formData.name && formData.email && formData.message;

  return (
    <>
      <Helmet>
        <title>Contact Ramesh Singad | Hire Full-Stack & React Developer in Jaipur</title>
        <meta name="description" content="Get in touch with Ramesh Singad, a top Full-Stack Software Engineer. Available for freelance projects, technical consulting, and React/Node.js development." />
        <meta name="keywords" content="Hire React Developer, Freelance Software Engineer Jaipur, Contact Ramesh Singad, Full-Stack Developer India, Node.js Freelancer" />
      </Helmet>

      <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-24 overflow-hidden">
        
        {/* Unified Background Decorations */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] h-[60%] w-[60%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[160px] animate-blob"></div>
            <div className="absolute bottom-[-10%] left-[-10%] h-[60%] w-[60%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[160px] animate-blob animation-delay-4000"></div>
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-slate-50 dark:from-slate-950 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Header Label */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex justify-center mb-8"
            >
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 text-cyan-700 dark:text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                    <span>Initiate Connection</span>
                </div>
            </motion.div>

            {/* Main Header */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-32"
            >
                <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-none mb-8">
                    Get In <br className="hidden sm:block" /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-500">Touch</span>
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                    Have a vision you want to build or just want to synchronize? I'm currently open to new collaborations and engineering challenges.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                
                {/* Contact Information */}
                <motion.div 
                    className="lg:col-span-5 space-y-10"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Let's build the future, <span className="text-cyan-600 dark:text-cyan-400">together.</span></h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">I prioritize high-performance systems and elegant user experiences. Let's discuss how my expertise can accelerate your next project.</p>
                    </div>

                    <div className="grid gap-6">
                        <ContactInfoItem label="Electron Mail" icon={<Mail size={24}/>} text="r.singerjat@gmail.com" href="mailto:r.singerjat@gmail.com" />
                        <ContactInfoItem label="Direct Line" icon={<Phone size={24}/>} text="+91 7877904941" href="tel:+917877904941" />
                        <ContactInfoItem label="Base Location" icon={<MapPin size={24}/>} text="Jaipur, Rajasthan, India" href="#" />
                    </div>

                    <div className="pt-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400 mb-6 text-center lg:text-left">Synchronize Elsewhere</h4>
                        <div className="flex justify-center lg:justify-start">
                            <SocialMediaIcon />
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                 <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-7"
                 >
                    <div className={`glass p-12 rounded-[3.5rem] transition-all duration-700 relative overflow-hidden border border-white/5 dark:border-slate-800/50 ${focusStage === 1 ? 'ring-2 ring-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]' : ''}`}>
                        
                        {/* Transmission Feed Overlay (Visual Only) */}
                        <div className="absolute top-0 right-0 p-8 flex flex-col items-end gap-1 opacity-20 pointer-events-none select-none">
                            <div className="text-[8px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Feed: Secure_Layer_01</div>
                            <div className="w-24 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-cyan-500"
                                    animate={{ width: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8" onFocus={() => setFocusStage(1)} onBlur={() => setFocusStage(0)}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <ValidatedInput name="name" placeholder="Full Identity" value={formData.name} onChange={handleChange} onBlur={handleBlur} touched={touched.name} error={errors.name} />
                                <ValidatedInput type="email" name="email" placeholder="Return Address (Email)" value={formData.email} onChange={handleChange} onBlur={handleBlur} touched={touched.email} error={errors.email} />
                            </div>
                            
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    name="subject" 
                                    placeholder="Purpose of Transmission (Subject)" 
                                    value={formData.subject} 
                                    onChange={handleChange} 
                                    className="w-full p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-2 border-slate-100 dark:border-slate-800/50 rounded-2xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 focus:outline-none transition-all dark:text-white font-black placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-xl" 
                                />
                                <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500"></div>
                            </div>

                            <div className="relative group">
                                <textarea 
                                    name="message" 
                                    placeholder="Brief your message details..." 
                                    rows="6" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    required 
                                    className={`w-full p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-2 rounded-2xl focus:outline-none transition-all duration-500 resize-none dark:text-white font-black placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-xl ${touched.message && errors.message ? 'border-red-500/50 focus:ring-4 focus:ring-red-500/10' : 'border-slate-100 dark:border-slate-800/50 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10'}`}
                                ></textarea>
                                <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500"></div>
                                <AnimatePresence>
                                    {touched.message && errors.message && (
                                        <motion.p 
                                            className="absolute right-4 bottom-4 flex items-center gap-1.5 text-red-500 text-[9px] font-black uppercase tracking-wider bg-white dark:bg-slate-900 border border-red-500/20 px-3 py-1.5 rounded-lg shadow-2xl" 
                                            initial={{ opacity: 0, x: 10, scale: 0.9 }} 
                                            animate={{ opacity: 1, x: 0, scale: 1 }} 
                                            exit={{ opacity: 0, x: 10, scale: 0.9 }}
                                        >
                                            <AlertCircle size={10} /> {errors.message}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                             <button 
                                type="submit" 
                                disabled={!isFormValid || status === 'sending'}
                                className="w-full relative group overflow-hidden bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black py-6 px-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 shadow-[0_20px_40px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_40px_rgba(255,255,255,0.05)] border border-white/10 dark:border-slate-200"
                            >
                                {/* Button Holographic Glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                
                                <div className="flex items-center justify-center gap-4 relative z-10 uppercase tracking-[0.2em] text-[11px]">
                                    {status === 'sending' ? (
                                        <><Loader className="animate-spin w-4 h-4" /> <span>Encrypting Transmission...</span></>
                                    ) : (
                                        <><Send className={`w-4 h-4 transition-transform duration-700 ${isFormValid ? 'group-hover:translate-x-2 group-hover:-translate-y-2' : ''}`}/> <span>Dispatch Protocol</span></>
                                    )}
                                </div>
                            </button>

                             <AnimatePresence>
                                 {status === 'success' && (
                                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center justify-center gap-3 p-5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-500/30 font-black text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
                                         <CheckCircle className="w-5 h-5" /> Transmission Acknowledged!
                                     </motion.div>
                                 )}
                                 {status === 'error' && (
                                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center justify-center gap-3 p-5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl border border-red-500/30 font-black text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
                                         <XCircle className="w-5 h-5" /> Protocol Failure. Retry System.
                                     </motion.div>
                                 )}
                             </AnimatePresence>
                        </form>
                    </div>
                 </motion.div>
            </div>
        </div>
      </main>
    </>
  );
}

export default Contact;

