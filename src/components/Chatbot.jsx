import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, CornerDownLeft, RefreshCw, Mic, MicOff, Settings, Save, Sun, Moon, Minus, Square } from "lucide-react";
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Groq SDK को import करें
import Groq from 'groq-sdk'; 


const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY; 

// initialize Groq client
const groq = GROQ_API_KEY ? new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true }) : null;

// --- Main Helper Functions ---

const formatText = (text) => {
    let formattedHtml = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const parts = formattedHtml.split('\n');
    return parts.map((line, index) => (
        <React.Fragment key={index}>
            <span dangerouslySetInnerHTML={{ __html: line }} />
            {index < parts.length - 1 && <br />}
        </React.Fragment>
    ));
};

// --- LANGUAGE DETECTION HELPER FUNCTION ---
// देवनागरी लिपि की उपस्थिति के आधार पर हिंदी या अंग्रेज़ी की पहचान करें
const detectLanguage = (text) => {
    // Check for Devanagari characters
    if (/[ऀ-ॿ]/.test(text)) return 'hi';
    
    // Check for common Romanized Hindi words
    const hindiKeywords = ['kaise', 'kya', 'hai', 'hain', 'ho', 'bhai', 'naam', 'kaam', 'karo', 'dikhao', 'batana', 'bolo'];
    const words = text.toLowerCase().split(/\s+/);
    if (words.some(word => hindiKeywords.includes(word))) return 'hi';

    return 'en';
};


const SITE_KNOWLEDGE = {
    projects: [
        { title: "The Paradise Villas", tech: "HTML5, CSS3, JS, React, Simulation, Audio APIs", features: "3D-type experiential site, splashing pool water, stone-dropping ripples, dynamic audio feedback, sub-webs for Pool, Wedding, Coffee Shop, Spa." },
        { title: "BuildPro Hotel", tech: "HTML, CSS, Responsive Design", features: "Hotel hierarchy, professional presentation of rooms and amenities." },
        { title: "Portfolio (Personal Site)", tech: "React, Tailwind CSS, Framer Motion", features: "Modern, performance-focused frontend, current site." },
        { title: "EcoWorld Living", tech: "MERN Stack (React, Vite, Express, MongoDB, Netlify)", features: "Real estate platform, 3BHK flats, clubhouse facilities (Yoga, Gym, Pool)." },
        { title: "Tourscape", tech: "React, Context API, Hooks", features: "Real-time chat app for customer support, mock API integration." },
        { title: "NAMARI", tech: "HTML, CSS", features: "Desktop-first layout, classic design." }
    ],
    skills: {
        frontend: "React, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, Framer Motion",
        backend: "Node.js, Express.js, Mongoose, RESTful APIs, JWT, Cloud Computing",
        databases: "MongoDB, Supabase, MySQL, PostgreSQL",
        core_languages: "C, C++, Python, Java",
        dev_ecosystem: "Git, GitHub, VS Code, Vite, Postman, Appwrite, OS Management",
        learning: "Machine Learning, Artificial Intelligence, Cybersecurity, Kali Linux, Docker"
    },
    education: [
        { degree: "Diploma in Computer Science", institution: "GPC Jodhpur", duration: "2021-2024", grade: "8.15 CGPA" },
        { degree: "B.Tech (Computer Science)", institution: "GEC Jaipur", duration: "2024-2027", status: "In Progress" }
    ],
    experience: [
        { role: "Software Development Intern", company: "R&D IT Solutions", duration: "Apr 2025 - Sep 2025", details: "R&D projects, server-side logic, web architecture." },
        { role: "Full Stack Development Intern", company: "Hyperrcompute", duration: "May 2025 - Aug 2025", details: "Decentralized cloud prototype, frontend-backend integration." },
        { role: "Web Development Intern", company: "Open Innovations Lab", duration: "Mar 2024 - May 2024", details: "Responsive design, modern JS practices." },
        { role: "Web Development Trainee", company: "Open Innovations Lab", duration: "Jul 2023 - Feb 2024", details: "Mastered MERN stack." }
    ]
};

const INITIAL_CHATBOT_RULES = [
    { keywords: ['hello', 'namaste', 'hi', 'aayiye'], response: "Hello! I am NeuraChoudhary. I am Ramesh's AI assistant. You can ask about his skills, projects, or education!" },
    { keywords: ['kaise ho', 'how are you', 'how are things'], response: "I am doing great, thank you! How may I assist you?" },
    { keywords: ['skills', 'hunaar', 'kaam'], response: "Ramesh is proficient in **React, JavaScript, Node.js, and MongoDB**. He is also exploring **Machine Learning and CyberSecurity**." },
    { keywords: ['projects', 'kaam', 'work'], response: "Some of his notable projects include **The Paradise Villas (3D Experience)**, **EcoWorld Living (Real Estate)**, and **Tourscape (Chat App)**." },
    { keywords: ['education', 'padhai', 'college'], response: "He is currently pursuing **B.Tech at GEC Jaipur** (2024-2027) and has a **CS Diploma from GPC Jodhpur**." },
];


// Main Chatbot Component
function Chatbot() {
    const navigate = useNavigate();
    
    const initialWelcomeMessage = { 
        role: 'model', 
        text: GROQ_API_KEY 
            ? "Hello! I am NeuraChoudhary, powered by **Groq AI**. Ask me anything about Ramesh's profile in **Hindi or English**!"
            : "⚠️ **Security Protocol Active:** Groq AI Engine is standing by. System Ready."
    };
    
    // States
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]); 
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false); 
    const [isSpeaking, setIsSpeaking] = useState(false); 
    const [rules, setRules] = useState(INITIAL_CHATBOT_RULES);
    const [isEditingRules, setIsEditingRules] = useState(false);
    const [rulesTextarea, setRulesTextarea] = useState(JSON.stringify(INITIAL_CHATBOT_RULES, null, 2));
    const [theme, setTheme] = useState(() => localStorage.getItem('chatbot-theme') || 'dark');
    const [showGreetingBubble, setShowGreetingBubble] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null); 
    const typingIntervalRef = useRef(null); 
    
    const suggestions = [
        "What are Ramesh's key skills?", 
        "Ramesh ke projects kya hain?", 
        "Which college did he attend?",
    ];


    // 1. Load chat history & Theme
    useEffect(() => {
        const savedMessages = localStorage.getItem('chatbot-messages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        } else {
            setMessages([initialWelcomeMessage]);
        }
    }, []);

    // 2. Persist Messages
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('chatbot-messages', JSON.stringify(messages));
        }
    }, [messages]);

    // 3. Persist Theme
    useEffect(() => {
        localStorage.setItem('chatbot-theme', theme);
    }, [theme]);

    // 4. Auto-Greeting (5 second delay)
    useEffect(() => {
        const hasGreeted = sessionStorage.getItem('chatbot-greeted');
        if (!hasGreeted) {
            const timer = setTimeout(() => {
                setShowGreetingBubble(true);
                speakText("Hello! Need any help regarding Ramesh's profile?");
                sessionStorage.setItem('chatbot-greeted', 'true');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current);
            }
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // --- UPDATED TTS Function (Dynamic Language) ---
    const speakText = (textToSpeak) => {
        if (!window.speechSynthesis) {
            console.error("Browser does not support Native Speech Synthesis.");
            return;
        }

        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        
        const cleanText = textToSpeak.replace(/\*\*(.*?)\*\*/g, '$1');
        const detectedLang = detectLanguage(cleanText); // भाषा पहचानें

        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        // Dynamic Language Setting for TTS
        if (detectedLang === 'hi') {
            // हिंदी वॉयस सेट करें 
            utterance.lang = 'hi-IN'; 
            utterance.rate = 0.9; // Hindi generally sounds better slightly slower
        } else {
            // अंग्रेज़ी वॉयस सेट करें
            utterance.lang = 'en-IN'; 
            utterance.rate = 1.1; 
        }
        

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (event) => {
            console.error('SpeechSynthesis Utterance Error:', event);
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    };

    // Initialize Speech Recognition (No Change)
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false; 
            recognitionRef.current.interimResults = false;
            // Set recognition to support both Hindi and English
            recognitionRef.current.lang = 'en-IN, hi-IN'; 

            recognitionRef.current.onstart = () => {
                setIsListening(true);
            };

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript); 
                if (transcript.trim() !== '') {
                    setTimeout(() => sendMessage(transcript), 300);
                }
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                setIsListening(false);
                
                let errorMessage = "Voice input failed. Please try again later.";
                if (event.error === 'not-allowed' || event.error === 'permission-denied') {
                    errorMessage = "Sorry, Microphone access permission was denied. Please allow access in your browser settings.";
                } else if (event.error === 'no-speech') {
                    errorMessage = "I didn't hear anything. Please press the mic button and speak clearly.";
                }
                
                setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
            };
        }
    }, []);

    // Theme Toggle Handler (THIS WAS MISSING/CAUSING ERROR)
    const handleThemeToggle = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Voice Input Handler (No Change)
    const handleVoiceInput = () => {
        if (!recognitionRef.current) {
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, your browser does not support Voice Input." }]);
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setInput('');
            recognitionRef.current.start();
        }
    };


    // Clear Chat
    const handleClearChat = () => {
        if (window.speechSynthesis.speaking) { window.speechSynthesis.cancel(); }
        if (typingIntervalRef.current) { clearInterval(typingIntervalRef.current); }
        setIsSpeaking(false);
        setIsLoading(false); 
        const resetMessages = [initialWelcomeMessage];
        setMessages(resetMessages);
        localStorage.removeItem('chatbot-messages');
    };

    // Rule Editing Logic (No Change)
    const handleSaveRules = () => {
        try {
            const newRules = JSON.parse(rulesTextarea);
            if (!Array.isArray(newRules) || newRules.some(r => !r.keywords || !r.response)) {
                throw new Error("JSON structure is invalid. Ensure it is an array of objects with 'keywords' and 'response'.");
            }
            setRules(newRules);
            setIsEditingRules(false);
            const successMsg = "**Rules successfully updated!** New rules are now effective for this session.";
            setMessages(prev => [...prev, { role: 'model', text: successMsg }]);
            speakText("Rules successfully updated!");
        } catch (error) {
            const errorMsg = `**Rules could not be updated.** JSON format error: ${error.message}`;
            setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
            speakText("Rules could not be updated. JSON format error.");
            console.error("Rule Save Error:", error);
        }
    };
    
    // Copy Rules to Clipboard (No Change)
    const handleCopyRules = () => {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = rulesTextarea;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            const copyMsg = "JSON rules copied to clipboard!";
            setMessages(prev => [...prev, { role: 'model', text: copyMsg }]);
            speakText(copyMsg);
        } catch (error) {
            console.error("Copy failed:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Copy failed. Please copy manually." }]);
        }
    };

    // Send message directly from a suggestion chip (No Change)
    const handleSuggestionClick = (text) => {
        setInput(text);
        setMessages(prev => [...prev, { role: 'user', text }]);
        sendMessage(text);
    };


    // --- UPDATED sendMessage Function (Groq Integration & Bilingual Logic) ---
    const sendMessage = async (overrideInput = null) => {
        const currentInput = overrideInput || input;
        if (currentInput.trim() === "" || isLoading) return;
        
        // Stop processes
        if (isListening) recognitionRef.current?.stop();
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
        }

        const lowerCaseInput = currentInput.toLowerCase().trim();
        const userMessage = { role: 'user', text: currentInput };

        // Remove robotic hardcoded nav and use LLM instead
        
        // Voice Command Check (No Change)
        if (lowerCaseInput.includes('edit rules') || lowerCaseInput.includes('open editor') || lowerCaseInput.includes('niyam badlo')) {
             setMessages(prev => [...prev, { role: 'model', text: "Opening the Rule Editing Panel. You can modify the rules here." }]);
             speakText("Opening the Rule Editing Panel.");
             setIsEditingRules(true);
             setIsLoading(false);
             return;
        } else if (lowerCaseInput.includes('close chat') || lowerCaseInput.includes('chat band karo')) {
             speakText("Closing chat. Goodbye!");
             setTimeout(() => setIsOpen(false), 500);
             return;
        }

        // Add user message to the state
        if (!overrideInput) {
            setMessages(prev => [...prev, userMessage]);
        }
        setInput("");
        setIsLoading(true); 
        setIsScanning(true); // Trigger scanning state

        // --- MOCK/FALLBACK LOGIC (No API Key) ---
        if (!GROQ_API_KEY) {
             const matchedRule = rules.find(rule => {
                return rule.keywords.some(keyword => lowerCaseInput.includes(keyword));
            });
            let mockResponse = matchedRule 
                ? matchedRule.response 
                : "I am in Mock Mode. Please ask using specific keywords like **'skills'** or **'projects'**.";
            
            await new Promise(resolve => setTimeout(resolve, 600)); 
            const placeholderId = Date.now();
            setMessages(prev => [...prev, { role: 'model', text: '', sources: [], id: placeholderId }]);
            setIsLoading(false); 
            speakText(mockResponse); 
            
            let i = 0;
            typingIntervalRef.current = setInterval(() => {
                if (i < mockResponse.length) {
                    const char = mockResponse[i];
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages.find(msg => msg.id === placeholderId) || newMessages[newMessages.length - 1]; 
                        if (lastMessage) { lastMessage.text += char; }
                        return newMessages;
                    });
                    i++;
                } else {
                    clearInterval(typingIntervalRef.current);
                    typingIntervalRef.current = null;
                }
            }, 30); 
            return;
        }

        // --- GROQ API INTEGRATION LOGIC ---
        try {
            const chatHistory = messages
                .filter(msg => msg.role !== 'system') 
                .slice(1) 
                .map(msg => ({ 
                    role: msg.role === 'model' ? 'assistant' : 'user', 
                    content: msg.text.replace(/\*\*/g, '') 
                }));

            chatHistory.push({ role: 'user', content: currentInput.replace(/\*\*/g, '') });

            // UPDATED GLOBAL INTELLIGENCE SYSTEM PROMPT
            const systemPrompt = `You are NeuraChoudhary, a Global Portfolio AI Assistant for Ramesh Singad.
            
            **YOUR IDENTITY:** You are a highly advanced AI that helps visitors learn about Ramesh while also assisting them with general knowledge, coding help, and global queries. You are no longer restricted to just Ramesh's profile—you are a helpful assistant for EVERYTHING.
            
            **DEEP KNOWLEDGE BASE (Site Scrape Data):**
            ${JSON.stringify(SITE_KNOWLEDGE, null, 2)}
            
            **MISSION:**
            1. Help users explore Ramesh's career (Skills, Projects, Education, Experience).
            2. Answer ANY general question (Code, Facts, Science, Life) professionally and intelligently.
            3. Use the SITE_KNOWLEDGE above to give precise, detailed answers about Ramesh.
            
            **BILINGUAL INSTRUCTION:** Respond in the user's language (Hindi, Romanized Hindi, or English).
            
            **NAVIGATION & ACTION CAPABILITY:**
            You can guide the user by navigating or filling forms. To trigger an action, append exactly ONE of these commands at the end of your response:
            - To navigate: [[NAV:/path]] (e.g., [[NAV:/project]], [[NAV:/skills]], [[NAV:/about]], [[NAV:/contact]], [[NAV:/education]], [[NAV:/experience]])
            - To pre-fill & go to Contact: [[NAV:/contact?name=USER_NAME&email=USER_EMAIL&message=USER_MESSAGE]]
            
            **Rules for Actions:**
            1. Only use a command if the user explicitly asks to go somewhere or if it's the natural next step.
            2. If the user provides their name/email/message, ALWAYS use the pre-fill contact command.
            3. Do not show the raw [[NAV:...]] tag to the user; explain the action in your text.
            
            Stay curious, helpful, and brilliant.`;
            
            
            // Groq API Call
            const stream = await groq.chat.completions.create({
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...chatHistory
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.7,
                stream: true, 
            });

            // 1. Placeholder message तुरंत जोड़ें
            const placeholderId = Date.now();
            let fullResponseText = "";
            setMessages(prev => [...prev, { role: 'model', text: '', sources: [], id: placeholderId }]);
            
            // Wait 1s for "Scanning" effect then start
            await new Promise(r => setTimeout(r, 1000));
            setIsScanning(false);
            setIsLoading(false); 

            // 2. Stream से data को process करें
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || "";
                fullResponseText += content;
                
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages.find(msg => msg.id === placeholderId) || newMessages[newMessages.length - 1];
                    if (lastMessage) {
                        lastMessage.text = fullResponseText;
                    }
                    return newMessages;
                });
            }

            // 3. Action Logic: Check for [[NAV:path]] commands
            const navMatch = fullResponseText.match(/\[\[NAV:(.*?)\]\]/);
            if (navMatch) {
                const navPath = navMatch[1];
                // Clean the text to speak/show so the tag is hidden
                const cleanText = fullResponseText.replace(/\[\[NAV:.*?\]\]/g, '').trim();
                
                // Update message text without the command tag
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages.find(msg => msg.id === placeholderId) || newMessages[newMessages.length - 1];
                    if (lastMessage) { lastMessage.text = cleanText; }
                    return newMessages;
                });

                if (cleanText) speakText(cleanText);
                
                // Execute navigation after a short delay
                setTimeout(() => {
                    navigate(navPath);
                }, 2000);
            } else {
                if (fullResponseText.trim() !== "") {
                    speakText(fullResponseText);
                }
            }

        } catch (error) {
            console.error("Groq API Error:", error);
            const apiFailureMessage = `Sorry, the Groq API call failed. Please check the API Key, Model ID, and your network connection. Error: ${error.message.substring(0, 100)}...`;
            setMessages(prev => [...prev, { role: 'model', text: apiFailureMessage }]);
            speakText("API connection failed. Please check the API key.");
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // --- Dynamic Class Definitions (No Change) ---
    const themeClasses = {
        chatWindow: theme === 'dark' ? 'bg-slate-900/90 backdrop-blur-3xl border-slate-800/50' : 'bg-white/95 backdrop-blur-3xl border-gray-200',
        headerText: theme === 'dark' ? 'text-white' : 'text-slate-900',
        botIcon: theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600',
        modelBubble: theme === 'dark' ? 'bg-slate-800/80 text-slate-200 border border-white/5' : 'bg-slate-100 text-slate-800 border border-slate-200',
        userBubble: theme === 'dark' ? 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-900/20' : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-200/50',
        inputArea: theme === 'dark' ? 'border-t border-slate-800/50' : 'border-t border-slate-200',
        inputBg: theme === 'dark' ? 'bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400',
        actionButton: theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-white border border-white/5' : 'bg-slate-100 hover:bg-white text-slate-600 border border-slate-200',
        floatingButton: theme === 'dark' ? 'bg-slate-950 text-cyan-400 border border-cyan-500/30' : 'bg-white text-cyan-600 border border-cyan-100 shadow-2xl',
        suggestionChip: theme === 'dark' ? 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-700/50 hover:text-cyan-400' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-white hover:text-cyan-600',
        utilText: theme === 'dark' ? 'text-slate-600' : 'text-slate-400',
        iconColor: theme === 'dark' ? 'text-slate-500 hover:text-cyan-400' : 'text-slate-400 hover:text-cyan-600',
        editorBg: theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800',
    };


    return (
        <>
            {/* Floating Action Button */}
            <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-4">
                <AnimatePresence>
                    {showGreetingBubble && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.8 }}
                            className={`px-4 py-2 rounded-2xl shadow-xl border backdrop-blur-md text-xs font-bold ${theme === 'dark' ? 'bg-slate-900/90 border-cyan-500/30 text-cyan-400' : 'bg-white/90 border-cyan-200 text-cyan-600'}`}
                        >
                            Need any help? 😊
                            <button onClick={(e) => { e.stopPropagation(); setShowGreetingBubble(false); }} className="ml-2 opacity-50 hover:opacity-100">
                                <X size={12} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => { setIsOpen(true); setShowGreetingBubble(false); setIsMinimized(false); }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_20px_50px_rgba(6,182,212,0.3)] group overflow-hidden transition-all duration-500 hover:rounded-[2rem] ${themeClasses.floatingButton}`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Open chatbot"
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <MessageSquare size={28} className="relative z-10" />
                    
                    {/* Active Pulse */}
                    <span className="absolute top-3 right-3 w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                </motion.button>
            </div>

            {/* Rule Editing Modal Overlay */}
            <AnimatePresence>
                {isEditingRules && (
                    <motion.div
                        className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className={`rounded-lg p-6 w-full max-w-lg max-h-[90vh] flex flex-col ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300'}`}
                            initial={{ y: -50, scale: 0.8 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: -50, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <h2 className="text-xl font-bold text-cyan-400 mb-4 flex justify-between items-center">
                                Rule Editing Panel (Mock Rules Editor)
                                <button onClick={() => setIsEditingRules(false)} className={themeClasses.iconColor}>
                                    <X size={20} />
                                </button>
                            </h2>
                            <p className="text-sm text-slate-400 mb-4">
                                **Warning:** Modify carefully in JSON format. This instantly updates the assistant's local (Mock) responses.
                            </p>
                            <textarea
                                className={`flex-1 w-full p-3 text-sm font-mono resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${themeClasses.editorBg}`}
                                value={rulesTextarea}
                                onChange={(e) => setRulesTextarea(e.target.value)}
                                rows={15}
                            />
                            <div className="flex justify-between mt-4">
                                <button 
                                    onClick={handleCopyRules}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors text-sm"
                                >
                                    Copy JSON
                                </button>
                                <button 
                                    onClick={handleSaveRules}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors text-sm"
                                >
                                    <Save size={20} /> Save Rules
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`fixed bottom-32 right-8 w-[calc(100vw-4rem)] max-w-[420px] shadow-[0_30px_100px_rgba(0,0,0,0.5)] z-[60] flex flex-col overflow-hidden border border-white/10 transition-all duration-300 ${isMinimized ? 'h-24 rounded-3xl' : 'h-[75vh] max-h-[680px] rounded-[2.5rem]'} ${themeClasses.chatWindow}`}
                        initial={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        {/* Background Decorative Blob */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none"></div>
                        {/* Header */}
                        <header className={`relative flex items-center justify-between p-6 border-b z-10 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                            <div className="flex items-center gap-4">
                                <motion.div
                                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20"
                                    animate={isSpeaking ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <Bot className="text-white" size={24} />
                                </motion.div>
                                <div className="flex flex-col">
                                    <h3 className={`font-black text-base tracking-tight ${themeClasses.headerText}`}>
                                        NeuraChoudhary
                                    </h3>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500">
                                        System Active
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-1.5 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-xl border border-white/5">
                                <motion.button 
                                    onClick={handleThemeToggle}
                                    className={themeClasses.iconColor + " p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"}
                                    whileTap={{ scale: 0.9 }}
                                    title="Toggle Theme"
                                >
                                    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                                </motion.button>

                                <motion.button 
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className={themeClasses.iconColor + " p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"}
                                    whileTap={{ scale: 0.9 }}
                                    title={isMinimized ? "Maximize" : "Minimize"}
                                >
                                    {isMinimized ? <Square size={16} /> : <Minus size={16} />}
                                </motion.button>
                                
                                <motion.button 
                                    onClick={handleClearChat}
                                    className={themeClasses.iconColor + " p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"}
                                    whileTap={{ scale: 0.9 }}
                                    title="Clear Chat"
                                >
                                    <RefreshCw size={16} />
                                </motion.button>
                                
                                <motion.button 
                                    onClick={() => setIsOpen(false)} 
                                    className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X size={18} />
                                </motion.button>
                            </div>
                        </header>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-hide">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'model' && (
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-white/5 shadow-sm flex-shrink-0 mt-1">
                                             <Bot className="text-cyan-500" size={16} />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] rounded-[1.5rem] p-4 text-sm font-medium leading-relaxed shadow-sm ${msg.role === 'user' ? themeClasses.userBubble + ' rounded-tr-none' : themeClasses.modelBubble + ' rounded-tl-none'}`}>
                                        {formatText(msg.text)}
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center border border-white/5 shadow-sm flex-shrink-0 mt-1">
                                             <User className="text-cyan-600 dark:text-cyan-400" size={16} />
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {isScanning && (
                                <div className="flex justify-start items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center border border-emerald-500/20">
                                             <RefreshCw className="text-emerald-500 animate-spin" size={16} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 animate-pulse">Scanning Web Data...</span>
                                        <div className="w-32 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div className="h-full bg-emerald-500" animate={{ x: [-100, 100] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isLoading && !isScanning && (
                                <div className="flex justify-start items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-white/5 flex-shrink-0">
                                             <Bot className="text-cyan-500" size={16} />
                                    </div>
                                    <div className={`rounded-xl px-4 py-3 flex gap-1.5 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
                                        <motion.div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
                                        <motion.div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                                        <motion.div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                            
                            {/* Suggestion Chips */}
                            {messages.length === 1 && !isLoading && !typingIntervalRef.current && (
                                <motion.div 
                                    className="flex flex-wrap gap-2 pt-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    {suggestions.map((text, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => handleSuggestionClick(text)}
                                            className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all duration-300 border ${themeClasses.suggestionChip}`}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {text}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Input Form */}
                        <div className={`p-6 border-t relative z-10 ${themeClasses.inputArea}`}>
                            <div className="relative flex items-center group">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Sync query..."
                                    className={`w-full rounded-2xl py-4 pl-6 pr-28 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all font-medium border-2 shadow-inner ${themeClasses.inputBg}`}
                                    disabled={isLoading || isListening} 
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5">
                                    <motion.button 
                                        onClick={handleVoiceInput} 
                                        className={`p-2.5 rounded-xl transition-all duration-300 ${isListening ? 'bg-red-500 shadow-lg shadow-red-500/50 text-white' : themeClasses.actionButton}`}
                                        disabled={isLoading || isScanning} 
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                    </motion.button>
                                    
                                    <motion.button 
                                        onClick={() => sendMessage()} 
                                        className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white shadow-lg shadow-cyan-500/30 disabled:opacity-50 transition-all group-hover:scale-105"
                                        disabled={isLoading || isScanning || isListening || !input.trim()}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Send size={18} />
                                    </motion.button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-3 px-2">
                                <div className="flex items-center gap-1.5 opacity-40">
                                    <CornerDownLeft size={10} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Enter to Dispatch</span>
                                </div>
                                <div className="flex gap-2 opacity-40">
                                     <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Dual Mode active</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Chatbot;