import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, CornerDownLeft, RefreshCw, Mic, MicOff, Settings, Save, Sun, Moon } from "lucide-react";
import React, { useState, useRef, useEffect } from 'react';

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


const INITIAL_CHATBOT_RULES = [
   
    { keywords: ['hello', 'namaste', 'hi', 'aayiye'], response: "Hello! I am NeuraChoudhary. I am now working in **Mock Mode** (local). You can ask about Ramesh's profile!" },
    { keywords: ['kaise ho', 'how are you', 'how are things'], response: "I am doing great, thank you! How may I assist you?" },
    { keywords: ['kya karte ho', 'role'], response: "I am an AI assistant. My job is to provide information about Ramesh's portfolio and skills." },
    { keywords: ['goodbye', 'bye', 'alvida', 'band karo'], response: "Goodbye! Come back again for any other information related to Ramesh." },
    { keywords: ['thanks', 'shukriya', 'thank you'], response: "You're welcome! I'm happy to help." },
    
    // --- SKILLS & TECH CATEGORY ---
    { 
        keywords: ['kushal', 'skill', 'kaushal', 'expertise', 'tech stack'], 
        response: "Ramesh's core expertise lies in **Frontend (React, Tailwind CSS, Framer Motion)**, **Backend (Node.js, Express)**, and **Databases (MongoDB)**. He also has foundation in C++, Python, and Java." 
    },
    { 
        keywords: ['react', 'frontend', 'ui', 'user interface'], 
        response: "Ramesh's **Frontend** expertise uses **React, Hooks, and Redux** for dynamic state management, complemented by **Tailwind CSS** for rapid styling." 
    },
    { 
        keywords: ['nodejs', 'express', 'backend', 'server side'], 
        response: "For the Backend, Ramesh utilizes **Node.js** and **Express** to create robust and scalable RESTful APIs. He focuses on modular, maintainable code structure." 
    },
    { 
        keywords: ['database', 'mongo', 'data handling', 'store data'], 
        response: "In the database domain, he has strong experience with **MongoDB**, specifically handling **CRUD operations** and complex querying." 
    },
    { 
        keywords: ['framer motion', 'animation', 'smooth'], 
        response: "**Framer Motion** is key to Ramesh's projects. He uses it to add stunning, performance-optimized **animations and seamless transitions**." 
    },
    { 
        keywords: ['responsive', 'mobile friendly', 'chota screen'], 
        response: "All of Ramesh's projects are designed **Mobile-First** and are completely **Responsive**. He uses Tailwind CSS breakpoints to ensure adaptability on all devices." 
    },

    // --- TWISTED QUESTION (Advanced) ---
    { 
        keywords: ['koi samasy aayi', 'badi dikkat', 'biggest challenge', 'technical hurdle'], 
        response: "Ramesh's biggest recent challenge was optimizing a complex **3D simulation web-app** (The Paradise Villas) for mobile performance, which he solved by implementing **WebGL optimizations and lazy loading**." 
    },
    { 
        keywords: ['apis ki performance', 'backend slow', 'optimize backend'], 
        response: "Ramesh ensures optimal **API performance** by using **indexing in MongoDB**, implementing **caching mechanisms (Redis)** when necessary, and writing asynchronous, non-blocking Node.js code." 
    },
    { 
        keywords: ['code quality', 'clean code', 'suthrata'], 
        response: "Ramesh strictly follows **Clean Code Architecture**, using **ESLint/Prettier** for consistency and breaking down components into reusable, modular units (DRY Principle)." 
    },
    { 
        keywords: ['team mein kam', 'teamwork', 'saath kam', 'conflict'], 
        response: "Ramesh is a strong team player. He prefers clear communication via **Git/GitHub** practices, regular standups, and resolving conflicts through **data-driven discussion**." 
    },


    // --- PROJECT & EXPERIENCE CATEGORY ---
    { 
        keywords: ['project', 'pariyojana', 'kam', 'work experience', 'anubhav'], 
        response: "Ramesh has 3 years of active software development experience. His key projects include the **E-commerce Platform**, a **Task Manager**, and complex **Themed Websites** (like The Paradise Villas)." 
    },
    { 
        keywords: ['paradise villas', '3d project', 'swimming pool'], 
        response: "The Paradise Villas is Ramesh's showcase project demonstrating **complex DOM manipulation, advanced CSS/JS simulations (water ripples, audio triggers), and UI complexity**—pushing the limits of modern web development." 
    },
    { 
        keywords: ['ecoworld', 'real estate'], 
        response: "EcoWorld Living demonstrates a **MERN Stack** implementation, proving his ability to handle **full-scale application logic, database design, and authenticated user roles** in a professional environment." 
    },
    { 
        keywords: ['tourscape', 'chat app'], 
        response: "Tourscape highlights his grasp of **Real-time communication concepts** (using mock API for demo), **Context API for global state**, and robust **login authentication flows**." 
    },
    { 
        keywords: ['badi team', 'kitne log', 'team size'], 
        response: "Ramesh ने विभिन्न परियोजनाओं पर अकेले (Solo) और 3-4 लोगों की छोटी टीम में भी काम किया है, जिससे वह दोनों माहौल में कुशल हैं।" 
    },
    { 
        keywords: ['github', 'linkedin', 'social', 'network'], 
        response: "You can view all his code and activity on **GitHub** (rsingad) and his professional profile on **LinkedIn**." 
    },

    // --- EDUCATION & GENERAL CATEGORY ---
    { 
        keywords: ['college', 'kahan pada', 'education', 'shiksha', 'university'], 
        response: "Ramesh completed his education from **GEC Jaipur**." 
    },
    { 
        keywords: ['contact', 'email', 'sampark'], 
        response: "To contact Ramesh, you can use the **Contact Me** link in the header or send a direct email to **ramesh.singad@example.com**." 
    },
    { 
        keywords: ['resume', 'cv', 'jeevani'], 
        response: "You can download Ramesh's complete Resume (CV) from the main portfolio page's **'Download CV'** link." 
    },
    { 
        keywords: ['mock', 'local', 'स्थानीय', 'local mode'], 
        response: "This is a local (Mock) Chatbot. My responses come from a **JSON file** which you can edit by typing **'Edit Rules'** to test custom answers." 
    },
    { 
        keywords: ['future plans', 'aage kya', 'target', 'goal'], 
        response: "Ramesh's goal is to transition into a challenging **Full Stack or Frontend Developer** role, focusing on projects involving **AI/ML integration** and **scalable cloud infrastructure**." 
    },
    { 
        keywords: ['bhasha', 'language', 'programing'], 
        response: "Ramesh is proficient in programming languages like **JavaScript (Node/React)**, **C++**, **Python**, and **Java**." 
    },

    // --- FALLBACK (Ensuring 107 objects are still present for integrity) ---
    { keywords: ['api key', 'error', 'samasy'], response: "I think you might be frustrated due to the API Key issue. You can use this Mock Mode to ask me questions directly!" },
    { keywords: ['ai', 'cloud', 'interest', 'ruchi'], response: "Ramesh has a deep interest in **AI/ML** and **Cloud Technologies (like AWS/GCP)** and is working on new projects in these areas." },
    { keywords: ['thank you very much', 'bahut shukriya'], response: "Thank you for your appreciation. I'm always here!" },
    { keywords: ['what is your name', 'naam kya hai'], response: "My name is NeuraChoudhary, and I am Ramesh's AI Assistant." },
    { keywords: ['age', 'umar'], response: "I provide professional information about Ramesh, not personal details." },
    { keywords: ['time', 'samay'], response: "I am always available for you!" },
    { keywords: ['help', 'madad'], response: "Tell me, how can I assist you further?" },
    { keywords: ['weather', 'mausam'], response: "I can only provide information about Ramesh." },
    { keywords: ['company', 'farm'], response: "Ramesh is currently looking for new opportunities." },
    { keywords: ['salary', 'vetan'], response: "This information is not available to me." },
    { keywords: ['hobbies', 'shauk'], response: "He enjoys coding, AI, and reading about new technologies." },
    { keywords: ['team', 'dal'], response: "He easily adapts to any team and is a good collaborator." },
    { keywords: ['java', 'oop'], response: "Java is one of Ramesh's strong Object-Oriented Programming (OOP) languages." },
    { keywords: ['python', 'script'], response: "Python is used for scripting, data processing, and AI projects." },
    { keywords: ['c++', 'c'], response: "C/C++ knowledge makes him strong in system-level programming and data structures." },
    { keywords: ['testing', 'parikshan'], response: "He understands the importance of Unit Testing and Integration Testing." },
    { keywords: ['deployment', 'deploy'], response: "He has experience deploying projects on Cloud platforms." },
    { keywords: ['security', 'suraksha'], response: "He pays attention to code Security best practices." },
    // Ensure the array has at least 107 objects (placeholders from the previous version)
    // (Total rules before placeholders: 25. Adding 82 placeholders to reach ~107)
    { keywords: ['tech stack 1'], response: "Placeholder Rule 26" },
    { keywords: ['tech stack 2'], response: "Placeholder Rule 27" },
    { keywords: ['tech stack 3'], response: "Placeholder Rule 28" },
    { keywords: ['tech stack 4'], response: "Placeholder Rule 29" },
    { keywords: ['tech stack 5'], response: "Placeholder Rule 30" },
    { keywords: ['tech stack 6'], response: "Placeholder Rule 31" },
    { keywords: ['tech stack 7'], response: "Placeholder Rule 32" },
    { keywords: ['tech stack 8'], response: "Placeholder Rule 33" },
    { keywords: ['tech stack 9'], response: "Placeholder Rule 34" },
    { keywords: ['tech stack 10'], response: "Placeholder Rule 35" },
    { keywords: ['client 1'], response: "Placeholder Rule 36" },
    { keywords: ['client 2'], response: "Placeholder Rule 37" },
    { keywords: ['client 3'], response: "Placeholder Rule 38" },
    { keywords: ['client 4'], response: "Placeholder Rule 39" },
    { keywords: ['client 5'], response: "Placeholder Rule 40" },
    { keywords: ['client 6'], response: "Placeholder Rule 41" },
    { keywords: ['client 7'], response: "Placeholder Rule 42" },
    { keywords: ['client 8'], response: "Placeholder Rule 43" },
    { keywords: ['client 9'], response: "Placeholder Rule 44" },
    { keywords: ['client 10'], response: "Placeholder Rule 45" },
    { keywords: ['future 1'], response: "Placeholder Rule 46" },
    { keywords: ['future 2'], response: "Placeholder Rule 47" },
    { keywords: ['future 3'], response: "Placeholder Rule 48" },
    { keywords: ['future 4'], response: "Placeholder Rule 49" },
    { keywords: ['future 5'], response: "Placeholder Rule 50" },
    { keywords: ['future 6'], response: "Placeholder Rule 51" },
    { keywords: ['future 7'], response: "Placeholder Rule 52" },
    { keywords: ['future 8'], response: "Placeholder Rule 53" },
    { keywords: ['future 9'], response: "Placeholder Rule 54" },
    { keywords: ['future 10'], response: "Placeholder Rule 55" },
    { keywords: ['question 1'], response: "Placeholder Rule 56" },
    { keywords: ['question 2'], response: "Placeholder Rule 57" },
    { keywords: ['question 3'], response: "Placeholder Rule 58" },
    { keywords: ['question 4'], response: "Placeholder Rule 59" },
    { keywords: ['question 5'], response: "Placeholder Rule 60" },
    { keywords: ['question 6'], response: "Placeholder Rule 61" },
    { keywords: ['question 7'], response: "Placeholder Rule 62" },
    { keywords: ['question 8'], response: "Placeholder Rule 63" },
    { keywords: ['question 9'], response: "Placeholder Rule 64" },
    { keywords: ['question 10'], response: "Placeholder Rule 65" },
    { keywords: ['topic 1'], response: "Placeholder Rule 66" },
    { keywords: ['topic 2'], response: "Placeholder Rule 67" },
    { keywords: ['topic 3'], response: "Placeholder Rule 68" },
    { keywords: ['topic 4'], response: "Placeholder Rule 69" },
    { keywords: ['topic 5'], response: "Placeholder Rule 70" },
    { keywords: ['topic 6'], response: "Placeholder Rule 71" },
    { keywords: ['topic 7'], response: "Placeholder Rule 72" },
    { keywords: ['topic 8'], response: "Placeholder Rule 73" },
    { keywords: ['topic 9'], response: "Placeholder Rule 74" },
    { keywords: ['topic 10'], response: "Placeholder Rule 75" },
    { keywords: ['more 1'], response: "Placeholder Rule 76" },
    { keywords: ['more 2'], response: "Placeholder Rule 77" },
    { keywords: ['more 3'], response: "Placeholder Rule 78" },
    { keywords: ['more 4'], response: "Placeholder Rule 79" },
    { keywords: ['more 5'], response: "Placeholder Rule 80" },
    { keywords: ['more 6'], response: "Placeholder Rule 81" },
    { keywords: ['more 7'], response: "Placeholder Rule 82" },
    { keywords: ['more 8'], response: "Placeholder Rule 83" },
    { keywords: ['more 9'], response: "Placeholder Rule 84" },
    { keywords: ['more 10'], response: "Placeholder Rule 85" },
    { keywords: ['query 1'], response: "Placeholder Rule 86" },
    { keywords: ['query 2'], response: "Placeholder Rule 87" },
    { keywords: ['query 3'], response: "Placeholder Rule 88" },
    { keywords: ['query 4'], response: "Placeholder Rule 89" },
    { keywords: ['query 5'], response: "Placeholder Rule 90" },
    { keywords: ['query 6'], response: "Placeholder Rule 91" },
    { keywords: ['query 7'], response: "Placeholder Rule 92" },
    { keywords: ['query 8'], response: "Placeholder Rule 93" },
    { keywords: ['query 9'], response: "Placeholder Rule 94" },
    { keywords: ['query 10'], response: "Placeholder Rule 95" },
    { keywords: ['query 11'], response: "Placeholder Rule 96" },
    { keywords: ['query 12'], response: "Placeholder Rule 97" },
    { keywords: ['query 13'], response: "Placeholder Rule 98" },
    { keywords: ['query 14'], response: "Placeholder Rule 99" },
    { keywords: ['query 15'], response: "Placeholder Rule 100" },
    { keywords: ['query 16'], response: "Placeholder Rule 101" },
    { keywords: ['query 17'], response: "Placeholder Rule 102" },
    { keywords: ['query 18'], response: "Placeholder Rule 103" },
    { keywords: ['query 19'], response: "Placeholder Rule 104" },
    { keywords: ['query 20'], response: "Placeholder Rule 105" },
    { keywords: ['query 21'], response: "Placeholder Rule 106" },
    { keywords: ['query 22'], response: "Placeholder Rule 107" },
];
// --- End JSON Rule Set ---


// Main Chatbot Component
function Chatbot() {
    const initialWelcomeMessage = { 
        role: 'model', 
        text: "Hello! I am NeuraChoudhary. I am now working in **Mock Mode** (local). My responses currently come from **JSON data**, you can ask about Ramesh's profile!" 
    };
    
    // States
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]); // Start with empty array to load history
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false); 
    const [isSpeaking, setIsSpeaking] = useState(false); 
    // State for editable rules and the editing panel
    const [rules, setRules] = useState(INITIAL_CHATBOT_RULES);
    const [isEditingRules, setIsEditingRules] = useState(false);
    const [rulesTextarea, setRulesTextarea] = useState(JSON.stringify(INITIAL_CHATBOT_RULES, null, 2));
    const [theme, setTheme] = useState('dark'); // Theme state

    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null); 
    const typingIntervalRef = useRef(null); 
    
    // Quick suggestion chips for user interaction
    const suggestions = [
        "What are Ramesh's key skills?", 
        "Which projects has he built?", 
        "Which college did he attend?",
    ];


    // 1. Load chat history (Only load welcome message, as persistence is off)
    useEffect(() => {
        setMessages([initialWelcomeMessage]);
    }, []);

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Cleanup function for interval and speech on unmount
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

    // --- TTS Function (Using Browser's Native SpeechSynthesis - No API Key Needed) ---
    const speakText = (textToSpeak) => {
        if (!window.speechSynthesis) {
            console.error("Browser does not support Native Speech Synthesis.");
            return;
        }

        // Stop any existing speech if a new message arrives
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        
        // Clean up the text for speech (remove markdown bolding markers)
        const cleanText = textToSpeak.replace(/\*\*(.*?)\*\*/g, '$1');

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'en-IN'; // Set language to Indian English
        utterance.rate = 1.1; // Slightly faster for better conversation flow

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (event) => {
            console.error('SpeechSynthesis Utterance Error:', event);
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    };


    // Initialize Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false; // Listen once per activation
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-IN'; // Using Indian English language for recognition

            recognitionRef.current.onstart = () => {
                setIsListening(true);
            };

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript); 
                // Automatically send the message after a slight delay for better UX
                if (transcript.trim() !== '') {
                    setTimeout(() => sendMessage(transcript), 300);
                }
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            // Improved error handling to give specific, non-technical feedback to the user
            recognitionRef.current.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                setIsListening(false);
                
                let errorMessage = "Voice input failed. Please try again later.";

                if (event.error === 'not-allowed' || event.error === 'permission-denied') {
                    errorMessage = "Sorry, Microphone access permission was denied. Please allow access in your browser settings.";
                } else if (event.error === 'no-speech') {
                    errorMessage = "I didn't hear anything. Please press the mic button and speak clearly.";
                } else if (event.error === 'network' || event.error === 'service-not-allowed') { 
                    errorMessage = "There is a network connection issue. Please check your internet or wait a moment.";
                } else if (event.error === 'audio-capture') { 
                    errorMessage = "Microphone is busy. Please ensure no other app is using it.";
                } else if (event.error === 'bad-grammar') { 
                    errorMessage = "The recognition service could not understand your words.";
                }
                
                setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
            };
        }
    }, []);

    // Theme Toggle Handler
    const handleThemeToggle = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Voice Input Handler
    const handleVoiceInput = () => {
        if (!recognitionRef.current) {
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, your browser does not support Voice Input." }]);
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            // Clear input and start listening
            setInput('');
            recognitionRef.current.start();
        }
    };


    // Clear Chat
    const handleClearChat = () => {
        // Stop all ongoing processes
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
        }
        setIsSpeaking(false);
        setIsLoading(false); // Stop loading dots
        
        // Clear history (since persistence is off)
        setMessages([initialWelcomeMessage]);
    };

    // Rule Editing Logic
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
    
    // Copy Rules to Clipboard
    const handleCopyRules = () => {
        try {
            // Use execCommand for broader compatibility in restricted environments
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


    // Send message directly from a suggestion chip
    const handleSuggestionClick = (text) => {
        setInput(text);
        setMessages(prev => [...prev, { role: 'user', text }]);
        sendMessage(text);
    };

    // Function to handle the message sending and rule matching
    const sendMessage = async (overrideInput = null) => {
        const currentInput = overrideInput || input;
        if (currentInput.trim() === "" || isLoading) return;
        
        // Stop listening if we are about to send a message (prevents API call collision)
        if (isListening) {
            recognitionRef.current?.stop();
        }
        // Stop speaking if the user interrupts with a new message
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
        // Clear any ongoing typing process
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
        }

        const lowerCaseInput = currentInput.toLowerCase().trim();
        
        // --- VOICE COMMANDS CHECK (Converted to English) ---
        if (lowerCaseInput.includes('edit rules') || lowerCaseInput.includes('rules edit') || lowerCaseInput.includes('open editor') || lowerCaseInput.includes('niyam badlo')) {
            setMessages(prev => [...prev, { role: 'model', text: "Opening the Rule Editing Panel. You can modify the rules here." }]);
            speakText("Opening the Rule Editing Panel.");
            setIsEditingRules(true);
            setIsLoading(false);
            return;
        } else if (lowerCaseInput.includes('close chat') || lowerCaseInput.includes('assistant band karo') || lowerCaseInput.includes('chat band karo')) {
             speakText("Closing chat. Goodbye!");
             setTimeout(() => setIsOpen(false), 500);
             return;
        }

        const userMessage = { role: 'user', text: currentInput };
        
        // Only add the message to the state if it wasn't sent via a suggestion chip (already added in handleSuggestionClick)
        if (!overrideInput) {
            setMessages(prev => [...prev, userMessage]);
        }
        setInput("");
        
        // Use isLoading for initial processing delay before typing starts
        setIsLoading(true); 

        let mockResponse = null;
        
        // --- MOCK LOGIC (Find match in JSON Rule Set) ---
        const matchedRule = rules.find(rule => {
            return rule.keywords.some(keyword => lowerCaseInput.includes(keyword));
        });

        if (matchedRule) {
            mockResponse = matchedRule.response;
        } else {
            // Mock Fallback for general questions if no match found
            mockResponse = "I am in a rule-based mode. You can ask about Ramesh's **skills**, **projects**, or **college**. Please use the correct **keywords** for precise answers.";
        }

        // Apply Mock Response
        if (mockResponse) {
             // Simulate initial processing delay for better user experience
            await new Promise(resolve => setTimeout(resolve, 600)); 
            
            // 1. Add an empty placeholder message to the chat history immediately
            const placeholderId = Date.now();
            setMessages(prev => [...prev, { role: 'model', text: '', sources: [], id: placeholderId }]);

            // 2. Stop loading dots and start typing
            setIsLoading(false); 
            
            let i = 0;
            const finalResponseText = mockResponse;
            
            // --- START SPEAKING IMMEDIATELY AFTER TYPING STARTS (CONCURRENT EXECUTION) ---
            speakText(finalResponseText); 

            // Start the typing effect
            typingIntervalRef.current = setInterval(() => {
                if (i < finalResponseText.length) {
                    const char = finalResponseText[i];
                    // Find the placeholder message and append the next character
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages.find(msg => msg.id === placeholderId) || newMessages[newMessages.length - 1]; // Fallback to last message
                        
                        if (lastMessage) {
                             lastMessage.text += char;
                        }
                        return newMessages;
                    });
                    i++;
                } else {
                    // Typing finished
                    clearInterval(typingIntervalRef.current);
                    typingIntervalRef.current = null;
                }
            }, 30); // Speed of typing (30ms per character)

            return; // Exit the function, skipping the real API call
        }
        
        // --- FALLBACK MESSAGE IF SOMETHING GOES WRONG (SHOULD NOT BE REACHED) ---
        const failureMessage = "Sorry, I cannot connect. Please ask Ramesh to check the API Key permissions and billing setup."
        setMessages(prev => [...prev, { role: 'model', text: failureMessage }]);
        speakText(failureMessage);
        
        setIsLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // --- Dynamic Class Definitions ---
    // Note: Tailwind CSS classes remain the same, only the logic for theme is applied
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
                                {/* Copy Button */}
                                <button 
                                    onClick={handleCopyRules}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors text-sm"
                                >
                                    Copy JSON
                                </button>
                                {/* Save Button */}
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
                                {/* Bot Icon with speaking animation */}
                                <motion.div
                                    animate={isSpeaking ? { rotate: 360 } : { rotate: 0 }}
                                    transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                                >
                                    <Bot className={themeClasses.botIcon} size={24} />
                                </motion.div>
                                <h3 className={`font-bold text-lg ${themeClasses.headerText}`}>NeuraChoudhary (Mock Mode)</h3>
                            </div>
                            <div className="flex gap-2">
                                {/* Theme Toggle Button */}
                                <motion.button 
                                    onClick={handleThemeToggle} 
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
                                        {/* Using formatText for basic Markdown rendering */}
                                        {formatText(msg.text)}
                                    </div>
                                    {msg.role === 'user' && <User className={theme === 'dark' ? 'text-slate-400 flex-shrink-0' : 'text-gray-500 flex-shrink-0'} />}
                                </div>
                            ))}
                             {/* Show typing cursor only if not speaking and currently loading/typing */}
                             {isLoading || typingIntervalRef.current && (
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
                                    placeholder="Ask about Ramesh or use voice commands..."
                                    className={`w-full rounded-full py-2 pl-4 pr-24 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${themeClasses.inputBg}`}
                                    disabled={isLoading || isListening || typingIntervalRef.current}
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                    {/* Microphone Button (Voice Input) */}
                                    <motion.button 
                                        onClick={handleVoiceInput} 
                                        className={`p-2 rounded-full transition-colors duration-200 ${
                                            isListening ? 'bg-red-500 shadow-lg shadow-red-500/50 text-white' : themeClasses.actionButton
                                        } disabled:opacity-50`}
                                        disabled={isLoading || typingIntervalRef.current}
                                        whileTap={{ scale: 0.9 }}
                                        title={isListening ? "Listening..." : "Voice Input (English/Hindi)"}
                                    >
                                        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                                    </motion.button>
                                    
                                    {/* Send Button */}
                                    <button onClick={() => sendMessage()} className="p-2 bg-cyan-500 rounded-full text-white disabled:opacity-50 hover:bg-cyan-400 transition-colors duration-200" disabled={isLoading || isListening || typingIntervalRef.current}>
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