import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Send, Loader, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import SocialMediaIcon from "./socialmediaicon"; // Assuming this component exists

// Helper component for contact info items
const ContactInfoItem = ({ icon, text, href }) => (
    <motion.a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors"
        whileHover={{ x: 5 }}
    >
        <div className="w-10 h-10 bg-slate-800/50 border border-slate-700 rounded-full flex items-center justify-center">
            {icon}
        </div>
        <span>{text}</span>
    </motion.a>
);

// Helper for input fields with validation
const ValidatedInput = ({ type = 'text', name, placeholder, value, onChange, error, onFocus, onBlur }) => (
    <div className="relative">
        <input 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
            onFocus={onFocus}
            onBlur={onBlur}
            required 
            className={`w-full p-4 bg-slate-800/50 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-300 ${error ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700 focus:ring-cyan-500'}`} 
        />
        <AnimatePresence>
            {error && (
                <motion.p 
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-red-500 text-xs"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                >
                    <AlertCircle size={14} /> {error}
                </motion.p>
            )}
        </AnimatePresence>
    </div>
);


function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle, sending, success, error
    const [errors, setErrors] = useState({});
    const [isFormActive, setIsFormActive] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (formData.name.length < 3) newErrors.name = "Too short";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
        if (formData.message.length < 10) newErrors.message = "Too short";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if(isFormActive) validate();
    }, [formData]);


    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus("sending");
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, formData);
            if (response.status === 200) {
                setStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });
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
        <title>Contact Me | Ramesh Singad - Software Engineer</title>
        <meta name="description" content="Get in touch with Ramesh Singad to collaborate on exciting projects. Let's build the future together." />
      </Helmet>
      <main className="min-h-screen bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `radial-gradient(#0ea5e9 1px, transparent 1px)`, backgroundSize: '1.5rem 1.5rem', maskImage: 'radial-gradient(ellipse at center, white, transparent 60%)' }}></div>
        <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 rounded-full animate-spin-slow blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">Get In Touch</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">Have a project in mind or just want to say hello? I'd love to hear from you.</p>
            </motion.div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div className="space-y-8" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                    <h2 className="text-3xl font-bold text-white">Let's Work Together</h2>
                    <p className="text-slate-400">I'm passionate about creating elegant and efficient solutions. If you have an idea you're excited about, I'm ready to help bring it to life.</p>
                    <div className="space-y-4">
                        <ContactInfoItem icon={<Mail className="w-5 h-5 text-cyan-400"/>} text="r.singerjat@gmail.com" href="mailto:r.singerjat@gmail.com" />
                        <ContactInfoItem icon={<Phone className="w-5 h-5 text-cyan-400"/>} text="+91 7877904941" href="tel:+917877904941" />
                        <ContactInfoItem icon={<MapPin className="w-5 h-5 text-cyan-400"/>} text="Jaipur, Rajasthan, India" href="#" />
                    </div>
                    <div className="pt-4"><SocialMediaIcon /></div>
                </motion.div>

                 <motion.form 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className={`p-1 rounded-xl transition-all duration-500 ${isFormActive ? 'bg-gradient-to-br from-cyan-500/50 to-indigo-500/50' : 'bg-transparent'}`}
                 >
                    <div className="space-y-4 p-8 bg-slate-900/80 rounded-lg" onFocus={() => setIsFormActive(true)} onBlur={() => setIsFormActive(false)}>
                        <ValidatedInput name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} error={errors.name} />
                        <ValidatedInput type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} error={errors.email} />
                        <input type="text" name="subject" placeholder="Subject (Optional)" value={formData.subject} onChange={handleChange} className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all" />
                        <div className="relative">
                            <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required className={`w-full p-4 bg-slate-800/50 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-300 resize-none ${errors.message ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700 focus:ring-cyan-500'}`}></textarea>
                            <AnimatePresence>
                                {errors.message && <motion.p className="absolute right-3 bottom-3 flex items-center gap-1 text-red-500 text-xs" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}><AlertCircle size={14} /> {errors.message}</motion.p>}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between px-8 pb-8">
                         <button 
                            type="submit" 
                            disabled={!isFormValid || status === 'sending'}
                            className="w-full flex items-center justify-center gap-2 bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {status === 'sending' ? (<><Loader className="animate-spin w-5 h-5" /> Sending...</>) : (<><Send className="w-5 h-5"/> Send Message</>)}
                        </button>
                    </div>
                     {status === 'success' && <p className="px-8 pb-8 flex items-center gap-2 text-green-400"><CheckCircle className="w-5 h-5" /> Message sent successfully!</p>}
                     {status === 'error' && <p className="px-8 pb-8 flex items-center gap-2 text-red-400"><XCircle className="w-5 h-5" /> Something went wrong. Please try again.</p>}
                </motion.form>
            </div>
        </div>
      </main>
    </>
  );
}

export default Contact;

