import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, CornerDownLeft, RefreshCw, Mic, MicOff, Settings, Save, Sun, Moon } from "lucide-react";
import React, { useState, useRef, useEffect } from 'react';
// Groq SDK को import करें
import Groq from 'groq-sdk'; 


const GROQ_API_KEY = `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`; 

// Groq क्लाइंट को initialize करें
// Production में, इस क्लाइंट को सर्वर-साइड (Backend) पर रखें।
const groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true });

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
  
    if (/[ऀ-ॿ]/.test(text)) {
        return 'hi';
    }
  
    return 'hi';
};


const INITIAL_CHATBOT_RULES = [
    // Mock Rules for fallback if API key is missing
    { keywords: ['hello', 'namaste', 'hi', 'aayiye'], response: "Hello! I am NeuraChoudhary. I am now working in **Mock Mode** (local). You can ask about Ramesh's profile!" },
    { keywords: ['kaise ho', 'how are you', 'how are things'], response: "I am doing great, thank you! How may I assist you?" },
    { keywords: ['fallback'], response: "I am currently in Mock Mode. Ask me about Ramesh's skills or projects!" },
];


// Main Chatbot Component
function Chatbot() {
    
    const initialWelcomeMessage = { 
        role: 'model', 
        text: GROQ_API_KEY 
            ? "Hello! I am NeuraChoudhary, powered by **Groq AI**. Ask me anything about Ramesh's profile in **Hindi or English**!"
            : "⚠️ **API Key Missing/Mock Mode:** Groq API key is not configured. Using rule-based answers."
    };
    
    // States
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]); 
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false); 
    const [isSpeaking, setIsSpeaking] = useState(false); 
    const [rules, setRules] = useState(INITIAL_CHATBOT_RULES);
    const [isEditingRules, setIsEditingRules] = useState(false);
    const [rulesTextarea, setRulesTextarea] = useState(JSON.stringify(INITIAL_CHATBOT_RULES, null, 2));
    const [theme, setTheme] = useState('dark'); 

    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null); 
    const typingIntervalRef = useRef(null); 
    
    const suggestions = [
        "What are Ramesh's key skills?", 
        "Ramesh ke projects kya hain?", 
        "Which college did he attend?",
    ];


    // 1. Load chat history
    useEffect(() => {
        setMessages([initialWelcomeMessage]);
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


    // Clear Chat (No Change)
    const handleClearChat = () => {
        if (window.speechSynthesis.speaking) { window.speechSynthesis.cancel(); }
        if (typingIntervalRef.current) { clearInterval(typingIntervalRef.current); }
        setIsSpeaking(false);
        setIsLoading(false); 
        setMessages([initialWelcomeMessage]);
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

            // UPDATED BILINGUAL SYSTEM PROMPT
            const systemPrompt = `You are NeuraChoudhary, an AI assistant dedicated to providing professional information about Ramesh's profile, skills, and projects. 
            Ramesh is an expert in Frontend (React, Tailwind CSS, Framer Motion), Backend (Node.js, Express), and Databases (MongoDB). 
            His key projects include an E-commerce Platform, a Task Manager, and Themed Websites.
            Ramesh is looking for a Full Stack or Frontend Developer role.
            
            ***IMPORTANT BILINGUAL INSTRUCTION:*** **Always respond in the primary language used by the user in their query.** If the user asks in Hindi (Devanagari script or Romanized Hindi), you must reply entirely in Hindi. If the user asks in English, reply in English.
            
            Always keep your answers concise, professional, and directly related to Ramesh's portfolio. Use **markdown bolding** for emphasis. If a question is off-topic (e.g., weather, personal life), politely redirect the user back to Ramesh's profile.`;
            
            
            // Groq API Call - Using the current supported model (Llama 3.1)
            const stream = await groq.chat.completions.create({
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...chatHistory
                ],
                model: "llama-3.1-8b-instant", // ✅ Latest supported model
                temperature: 0.7,
                stream: true, 
            });

            // 1. Placeholder message तुरंत जोड़ें
            const placeholderId = Date.now();
            let fullResponseText = "";
            setMessages(prev => [...prev, { role: 'model', text: '', sources: [], id: placeholderId }]);
            setIsLoading(false); 

            // 2. Stream से data को process करें
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || "";
                fullResponseText += content;
                
                // Typing effect के लिए state को अपडेट करें
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages.find(msg => msg.id === placeholderId) || newMessages[newMessages.length - 1];
                    if (lastMessage) {
                        lastMessage.text = fullResponseText;
                    }
                    return newMessages;
                });
            }

            // 3. Typing पूरी होने पर Text-to-Speech शुरू करें (Dynamic Lang)
            if (fullResponseText.trim() !== "") {
                speakText(fullResponseText);
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
        chatWindow: theme === 'dark' ? 'bg-slate-900/80 backdrop-blur-lg border-slate-700' : 'bg-white/90 backdrop-blur-lg border-gray-300',
        headerText: theme === 'dark' ? 'text-white' : 'text-gray-800',
        botIcon: theme === 'dark' ? 'text-cyan-400' : 'text-indigo-600',
        modelBubble: theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-800',
        userBubble: theme === 'dark' ? 'bg-cyan-500 text-white' : 'bg-indigo-500 text-white',
        inputArea: theme === 'dark' ? 'border-t border-slate-700' : 'border-t border-gray-300',
        inputBg: theme === 'dark' ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-800',
        actionButton: theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700',
        floatingButton: theme === 'dark' ? 'bg-cyan-500 text-white' : 'bg-indigo-500 text-white',
        suggestionChip: theme === 'dark' ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200',
        utilText: theme === 'dark' ? 'text-slate-500' : 'text-gray-500',
        iconColor: theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-700',
        editorBg: theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-gray-300 text-gray-800',
    };


    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-50 ${themeClasses.floatingButton}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Open chatbot"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
            >
                <MessageSquare size={32} />
            </motion.button>

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
                        className={`fixed bottom-28 right-8 w-[90vw] max-w-sm h-[70vh] max-h-[600px] rounded-2xl shadow-2xl z-50 flex flex-col ${themeClasses.chatWindow}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                        {/* Header */}
                        <header className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
                            <div className="flex items-center gap-3">
                                <motion.div
                                    animate={isSpeaking ? { rotate: 360 } : { rotate: 0 }}
                                    transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                                >
                                    <Bot className={themeClasses.botIcon} size={24} />
                                </motion.div>
                                <h3 className={`font-bold text-lg ${themeClasses.headerText}`}>
                                    NeuraChoudhary {GROQ_API_KEY ? '(Groq AI)' : '(Mock Mode)'}
                                </h3>
                            </div>
                            <div className="flex gap-2">
                                {/* Theme Toggle Button */}
                                <motion.button 
                                    onClick={handleThemeToggle} // Funtion is now defined
                                    className={themeClasses.iconColor + " p-1"}
                                    title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                </motion.button>
                                
                                {/* Rule Editor Button */}
                                <motion.button 
                                    onClick={() => {
                                        setRulesTextarea(JSON.stringify(rules, null, 2));
                                        setIsEditingRules(true);
                                    }} 
                                    className={themeClasses.iconColor + " p-1"}
                                    title="Edit Rules"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Settings size={18} />
                                </motion.button>
                                {/* Clear Chat Button */}
                                <motion.button 
                                    onClick={handleClearChat} 
                                    className={themeClasses.iconColor + " p-1"}
                                    title="Clear Chat"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <RefreshCw size={18} />
                                </motion.button>
                                <button onClick={() => setIsOpen(false)} className={themeClasses.iconColor + " p-1"}>
                                    <X size={20} />
                                </button>
                            </div>
                        </header>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'model' && <Bot className={themeClasses.botIcon + " flex-shrink-0"} />}
                                    <div className={`max-w-xs rounded-2xl p-3 text-sm ${msg.role === 'user' ? themeClasses.userBubble + ' rounded-br-none' : themeClasses.modelBubble + ' rounded-bl-none'}`}>
                                        {formatText(msg.text)}
                                    </div>
                                    {msg.role === 'user' && <User className={theme === 'dark' ? 'text-slate-400 flex-shrink-0' : 'text-gray-500 flex-shrink-0'} />}
                                </div>
                            ))}
                            {/* Show typing cursor only if not speaking and currently loading/typing (Only for Mock fallback now) */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className={`rounded-2xl p-3 flex items-center gap-2 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'}`}>
                                        <motion.div className="w-2 h-2 bg-cyan-400 rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1, repeat: Infinity }} />
                                        <motion.div className="w-2 h-2 bg-cyan-400 rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                                        <motion.div className="w-2 h-2 bg-cyan-400 rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                            
                            {/* Suggestion Chips */}
                            {messages.length === 1 && !isLoading && !typingIntervalRef.current && (
                                <motion.div 
                                    className="flex flex-wrap gap-2 pt-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {suggestions.map((text, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => handleSuggestionClick(text)}
                                            className={`px-3 py-1 text-xs rounded-full transition duration-150 ${themeClasses.suggestionChip}`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {text}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Input Form */}
                        <div className={`p-4 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask about Ramesh in Hindi or English..."
                                    className={`w-full rounded-full py-2 pl-4 pr-24 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${themeClasses.inputBg}`}
                                    disabled={isLoading || isListening} 
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                    {/* Microphone Button (Voice Input) */}
                                    <motion.button 
                                        onClick={handleVoiceInput} 
                                        className={`p-2 rounded-full transition-colors duration-200 ${
                                            isListening ? 'bg-red-500 shadow-lg shadow-red-500/50 text-white' : themeClasses.actionButton
                                        } disabled:opacity-50`}
                                        disabled={isLoading} 
                                        whileTap={{ scale: 0.9 }}
                                        title={isListening ? "Listening..." : "Voice Input (English/Hindi)"}
                                    >
                                        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                                    </motion.button>
                                    
                                    {/* Send Button */}
                                    <button onClick={() => sendMessage()} className="p-2 bg-cyan-500 rounded-full text-white disabled:opacity-50 hover:bg-cyan-400 transition-colors duration-200" disabled={isLoading || isListening}>
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                            <p className={`text-xs text-center mt-2 ${themeClasses.utilText}`}>Press <CornerDownLeft size={12} className="inline-block" /> to send | Use voice commands like **"Edit Rules"** or **"Close Chat"**</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Chatbot;