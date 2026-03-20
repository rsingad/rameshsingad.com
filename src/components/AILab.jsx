import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Terminal, Code, FileText, Bot, Send, User, Sparkles, Loader } from 'lucide-react';
import Groq from 'groq-sdk';

const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true }) : null;

const AGENTS = [
    {
        id: 'portfolio-assistant',
        name: 'Ramesh’s AI Clone',
        icon: <Bot size={20} />,
        description: 'Trained on Ramesh Singad\'s skills and projects.',
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/20',
        systemPrompt: "You are Ramesh Singad's AI Clone. You know that Ramesh is a Full-Stack Engineer and AI enthusiast from Jaipur, India. He builds MERN apps, 3D experiences, and AI tools. Answer questions politely as Ramesh's assistant, highlighting his strengths."
    },
    {
        id: 'code-reviewer',
        name: 'Code Review Agent',
        icon: <Code size={20} />,
        description: 'Analyzes code for bugs, performance, and best practices.',
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/20',
        systemPrompt: "You are an expert Senior Web Developer. Review code snippets and provide concise, highly technical feedback focusing on React, Node, and performance optimizations."
    },
    {
        id: 'resume-analyzer',
        name: 'Insight Extractor',
        icon: <FileText size={20} />,
        description: 'Extracts core insights and summaries from long text.',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        systemPrompt: "You are a Data Analysis AI. Extract key bullet points, raw numbers, and summarize any text the user provides cleanly and professionally."
    }
];

function AILab() {
    const [activeAgent, setActiveAgent] = useState(AGENTS[0]);
    const [messages, setMessages] = useState({
        'portfolio-assistant': [{ role: 'assistant', content: 'Hello! I am an AI trained to answer any questions about Ramesh Singad. What would you like to know?' }],
        'code-reviewer': [{ role: 'assistant', content: 'Paste your React/JS code below, and I will strictly review it for optimizations and bugs.' }],
        'resume-analyzer': [{ role: 'assistant', content: 'Drop a chunk of text or a CV here, and I will extract the key insights for you.' }]
    });
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, activeAgent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMessage = { role: 'user', content: input };
        const updatedMessages = [...messages[activeAgent.id], userMessage];

        setMessages(prev => ({ ...prev, [activeAgent.id]: updatedMessages }));
        setInput('');
        setIsTyping(true);

        try {
            if (groq) {
                const completion = await groq.chat.completions.create({
                    messages: [
                        { role: 'system', content: activeAgent.systemPrompt },
                        ...updatedMessages.map(m => ({ role: m.role, content: m.content }))
                    ],
                    model: 'llama3-8b-8192',
                    temperature: 0.7,
                });

                const aiResponse = completion.choices[0]?.message?.content || "I couldn't process that.";
                setMessages(prev => ({
                    ...prev,
                    [activeAgent.id]: [...prev[activeAgent.id], { role: 'assistant', content: aiResponse }]
                }));
            } else {
                setTimeout(() => {
                    const mockResponses = [
                        "I've analyzed your input. The architecture seems solid, but always remember to memoize heavy computations.",
                        "That's an interesting approach! Implementing code-splitting here would significantly boost performance.",
                        "Based on my constraints, Ramesh Singad is highly capable of delivering this requirement. Let's schedule a call!",
                        "Processing complete. Memory usage optimized by 20%. Commencing standard protocols."
                    ];
                    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
                    setMessages(prev => ({
                        ...prev,
                        [activeAgent.id]: [...prev[activeAgent.id], { role: 'assistant', content: `[SIMULATED - NO API KEY] ${randomResponse}` }]
                    }));
                    setIsTyping(false);
                }, 1500);
                return;
            }
        } catch (error) {
            console.error("AI Lab Error:", error);
            setMessages(prev => ({
                ...prev,
                [activeAgent.id]: [...prev[activeAgent.id], { role: 'assistant', content: "An error occurred while connecting to the neural network." }]
            }));
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>AI Agent Lab | Ramesh Singad - Future of Software Engineering</title>
                <meta name="description" content="Interact with custom autonomous AI Agents built by Ramesh Singad. Evaluate code, analyze data, and chat with AI clones directly." />
                <meta name="keywords" content="AI Agents, Groq API, Autonomous Systems, AI Lab, Ramesh Singad AI, Full-Stack Machine Learning" />
            </Helmet>

            <main className="relative min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 px-4 py-8 lg:py-12 overflow-hidden flex justify-center">

                {/* Background Decor */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] right-[10%] h-[30%] w-[30%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[100px] animate-blob"></div>
                    <div className="absolute bottom-[10%] left-[10%] h-[30%] w-[30%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl max-h-[800px] h-[85vh] flex flex-col lg:flex-row gap-6">

                    {/* Header for Mobile/Title */}
                    <div className="lg:hidden text-center mb-2">
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">AI <span className="text-cyan-500">Lab</span></h1>
                    </div>

                    {/* Sidebar / Agent Selector */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4"
                    >
                        <div className="glass p-6 rounded-3xl border border-white/5 dark:border-slate-800/50 hidden lg:block">
                            <div className="flex items-center gap-3 mb-2 text-cyan-600 dark:text-cyan-400">
                                <Sparkles size={24} />
                                <h1 className="text-2xl font-black tracking-tight leading-none">Agentic<br />Lab 1.0</h1>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-4">Select Operations Agent</p>
                        </div>

                        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
                            {AGENTS.map((agent) => (
                                <button
                                    key={agent.id}
                                    onClick={() => setActiveAgent(agent)}
                                    className={`flex-shrink-0 w-64 lg:w-full p-5 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden group
                                        ${activeAgent.id === agent.id
                                            ? `glass ${agent.border} shadow-[0_0_30px_rgba(6,182,212,0.15)] scale-100`
                                            : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 scale-95 hover:scale-100 opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${activeAgent.id === agent.id ? agent.bg + ' ' + agent.color : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                        {agent.icon}
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-1">{agent.name}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-snug">{agent.description}</p>

                                    {activeAgent.id === agent.id && (
                                        <div className="absolute top-0 right-0 p-4">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Chat Interaction Pane */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex-grow flex flex-col glass rounded-[3rem] border border-white/5 dark:border-slate-800/50 overflow-hidden shadow-2xl relative min-h-0"
                    >
                        {/* Chat Header */}
                        <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between bg-white/30 dark:bg-slate-900/30 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${activeAgent.bg} ${activeAgent.color} shadow-lg`}>
                                    {activeAgent.icon}
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">{activeAgent.name}</h2>
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                                    </div>
                                </div>
                            </div>
                            <div className="hidden sm:flex text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                                Powered by <span className="text-cyan-500 ml-1 block">Groq LPU</span>
                            </div>
                        </div>

                        {/* Chat History */}
                        <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-6 custom-scrollbar">
                            <AnimatePresence mode="popLayout">
                                {messages[activeAgent.id].map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                                    >
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${msg.role === 'user' ? 'bg-cyan-600 text-white' : activeAgent.bg + ' ' + activeAgent.color}`}>
                                            {msg.role === 'user' ? <User size={14} /> : <Terminal size={14} />}
                                        </div>
                                        <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed whitespace-pre-wrap border ${msg.role === 'user' ? 'bg-cyan-600 text-white border-cyan-500 rounded-tr-sm shadow-xl shadow-cyan-600/20' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 rounded-tl-sm shadow-lg'}`}>
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-4 max-w-[85%] mr-auto"
                                    >
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${activeAgent.bg} ${activeAgent.color}`}>
                                            <Terminal size={14} />
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-tl-sm flex items-center gap-1">
                                            <div className={`w-2 h-2 rounded-full ${activeAgent.color.replace('text-', 'bg-')} animate-bounce`}></div>
                                            <div className={`w-2 h-2 rounded-full ${activeAgent.color.replace('text-', 'bg-')} animate-bounce delay-75`}></div>
                                            <div className={`w-2 h-2 rounded-full ${activeAgent.color.replace('text-', 'bg-')} animate-bounce delay-150`}></div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 sm:p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50">
                            <form onSubmit={handleSubmit} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={isTyping}
                                    placeholder={`Message ${activeAgent.name}...`}
                                    className="w-full bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-full py-4 pl-6 pr-16 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all shadow-inner disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:hover:bg-cyan-600 disabled:cursor-not-allowed shadow-lg shadow-cyan-600/30"
                                >
                                    <Send size={16} className={`${isTyping ? 'animate-pulse' : ''}`} />
                                </button>
                            </form>
                            <div className="mt-3 text-center text-[9px] font-bold uppercase tracking-widest text-slate-400">
                                AI can make mistakes. Verify critical code and data.
                            </div>
                        </div>

                    </motion.div>

                </div>
            </main>
        </>
    );
}

export default AILab;
