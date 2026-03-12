import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { 
  BarChart3, 
  Users, 
  MousePointer2, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  ExternalLink,
  Globe,
  Share2,
  Code2,
  Layout,
  ChevronRight,
  Search,
  TrendingUp,
  Newspaper,
  Tag,
  X,
  Maximize2,
  ArrowLeft,
  PenTool,
  Save,
  CheckCircle2
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const TrafficDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Expert insights for the "Publishing Tool" (Matching Public Trends)
  const [myInsights, setMyInsights] = useState([
    { id: 1, topic: "India AI Mission", content: "The ₹10,371 Cr allocation for the India AI Mission is a game-changer. It democratizes compute access for startups, ensuring India doesn't just use AI, but builds it." },
    { id: 2, topic: "BharatGen GenAI", content: "BharatGen is the linguistic bridge India needs. Generative AI tailored for our diverse cultures will revolutionize local governance and digital service delivery." },
    { id: 3, topic: "Hardware Renaissance", content: "With 'Made in India' laptops projected to hit 30% market share by 2025, we're seeing a massive shift from a service-only economy to a high-tech manufacturing hub." }
  ]);

  // Mock data for traffic stats
  const stats = [
    { label: 'Total Visitors', value: '12,458', change: '+12.5%', isPositive: true, icon: Users, color: 'text-blue-400' },
    { label: 'Page Views', value: '45,892', change: '+8.2%', isPositive: true, icon: BarChart3, color: 'text-emerald-400' },
    { label: 'Avg. Session', value: '2m 45s', change: '-3.1%', isPositive: false, icon: Clock, color: 'text-orange-400' },
    { label: 'Bounce Rate', value: '42.3%', change: '+1.4%', isPositive: false, icon: MousePointer2, color: 'text-rose-400' },
  ];

  const categories = [
    { id: 'All', icon: Layout },
    { id: 'Main Pages', icon: Globe },
    { id: 'Projects', icon: Code2 },
    { id: 'Insights Tool', icon: PenTool }, // New Category for SEO Publishing
    { id: 'Keywords', icon: Search },
    { id: 'Trending', icon: TrendingUp },
  ];

  const links = [
    { name: 'Home Portfolio', url: '/', category: 'Main Pages', description: 'The main landing page of my personal portfolio.' },
    { name: 'About Me', url: '/about', category: 'Main Pages', description: 'Detailed information about my background and journey.' },
    { name: 'Code Blaster Web', url: 'https://codeblaster.in', category: 'Projects', description: 'A platform for developers and tech enthusiasts.' },
    { name: 'E-commerce UI', url: '/project', category: 'Projects', description: 'Modern shopping experience with clean interface.' },
    { name: 'GitHub Profile', url: 'https://github.com/rameshsingad', category: 'Socials', description: 'Check out my latest code repositories and contributions.' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/rameshsingad', category: 'Socials', description: 'Professional network and career updates.' },
  ];

  const keywords = [
    "Ramesh Singad Portfolio", "Senior Software Engineer Jaipur", "AI Architect India", 
    "MERN Stack Developer", "React Performance Optimization", "Full-Stack Web Architect",
    "Node.js Backend Expert", "Scalable System Design", "AI Integration Services",
    "Framer Motion Animations", "Next.js SEO Best Practices", "Professional Tech Consultant"
  ];

  useEffect(() => {
    if (activeCategory === 'Trending' || activeCategory === 'All') {
      fetchNews();
    }
  }, [activeCategory]);

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const response = await axios.get('https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json');
      setNews(response.data.articles.slice(0, 6));
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoadingNews(false);
    }
  };

  const handleInsightChange = (id, newContent) => {
    setMyInsights(prev => prev.map(ins => ins.id === id ? { ...ins, content: newContent } : ins));
  };

  const saveInsights = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
    // In a real app, this would hit an API: axios.post('/api/save-insights', { myInsights });
    console.log("Saving Insights for SEO:", myInsights);
  };

  const filteredLinks = activeCategory === 'All' 
    ? links 
    : links.filter(link => link.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <Helmet>
        <title>Traffic Dashboard | RS Portfolio</title>
        <meta name="description" content="Personal Traffic and Analytics Dashboard for Ramesh Singad's Portfolio." />
      </Helmet>

      {/* Internal News Viewer (Overlay) */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex flex-col"
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={24} />
                </button>
                <div>
                  <h2 className="text-sm font-bold text-white line-clamp-1">{selectedArticle.title}</h2>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">{selectedArticle.source.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 hover:bg-red-500/20 rounded-full text-slate-400 hover:text-red-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full bg-white">
              <iframe src={selectedArticle.url} className="w-full h-full border-none" title="News Article" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Traffic & SEO Controller
              </h1>
              <p className="text-slate-400 mt-2">Manage your search visibility and expert commentary from this central hub.</p>
            </div>
            <div className="flex items-center gap-4">
               <NavLink 
                to="/insights" 
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 ring-1 ring-white/10"
               >
                 <Globe size={16} /> View Public Page
               </NavLink>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl hover:border-slate-600 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-slate-900 group-hover:scale-110 transition-transform ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className={`flex items-center text-sm font-medium ${stat.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stat.change}
                  {stat.isPositive ? <ArrowUpRight size={14} className="ml-1" /> : <ArrowDownRight size={14} className="ml-1" />}
                </div>
              </div>
              <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</h3>
              <p className="text-3xl font-bold mt-1 text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 sticky top-28">
              <h2 className="text-lg font-bold mb-6 px-2 flex items-center gap-2 text-cyan-400">
                <Layout size={20} /> Dashboard
              </h2>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeCategory === cat.id 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_-3px_rgba(6,182,212,0.2)]' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/30 border border-transparent'
                    }`}
                  >
                    <cat.icon size={18} />
                    {cat.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Insights Publishing Tool */}
                {activeCategory === 'Insights Tool' && (
                  <div className="bg-slate-800/20 border border-slate-700/50 rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-3">
                          <PenTool className="text-cyan-400" /> SEO Insights Manager
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">Write original commentary on trending topics to boost your site's SEO.</p>
                      </div>
                      <button 
                        onClick={saveInsights}
                        className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg"
                      >
                        {showSaveSuccess ? <CheckCircle2 size={18} /> : <Save size={18} />}
                        {showSaveSuccess ? 'Published!' : 'Publish All'}
                      </button>
                    </div>

                    <div className="space-y-6">
                      {myInsights.map((insight) => (
                        <div key={insight.id} className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl group focus-within:border-cyan-500/50 transition-all">
                          <div className="flex items-center justify-between mb-4">
                             <span className="text-xs font-black uppercase tracking-widest text-cyan-400 px-3 py-1 bg-cyan-500/5 rounded-lg border border-cyan-500/10">
                               Target: {insight.topic}
                             </span>
                             <span className="text-[10px] text-slate-500 font-bold italic">SEO Status: Optimized</span>
                          </div>
                          <textarea 
                            value={insight.content}
                            onChange={(e) => handleInsightChange(insight.id, e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-slate-200 text-sm leading-relaxed h-24 resize-none"
                            placeholder="Add your expert opinion here..."
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Categories (Links, Keywords, Trending) - Simplified for brevity in this update */}
                {activeCategory !== 'Insights Tool' && (
                  <div className="space-y-8">
                     {/* Rendering Keywords */}
                    {(activeCategory === 'All' || activeCategory === 'Keywords') && (
                      <div className="bg-slate-800/20 border border-slate-700/50 rounded-3xl p-8">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-cyan-400">
                          <Tag size={20} /> Active SEO Keywords
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {keywords.map((kw, i) => (
                            <span key={i} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-sm text-slate-400">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rendering Trending News */}
                    {(activeCategory === 'All' || activeCategory === 'Trending') && (
                      <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-indigo-400">
                          <Newspaper size={20} /> Real-time Tech Trends
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {loadingNews ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="animate-pulse bg-slate-800/30 h-48 rounded-2xl"></div>)
                          ) : (
                            news.map((item, i) => (
                              <div key={i} onClick={() => setSelectedArticle(item)} className="bg-slate-800/40 border border-slate-700/30 hover:border-indigo-500/30 rounded-2xl overflow-hidden group cursor-pointer">
                                <div className="p-4">
                                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{item.source.name}</span>
                                  <h4 className="text-sm font-bold text-white mt-1 line-clamp-3 group-hover:text-indigo-300">
                                    {item.title}
                                  </h4>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {/* Links Rendering */}
                    {(activeCategory === 'All' || ['Main Pages', 'Projects', 'Socials'].includes(activeCategory)) && (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {filteredLinks.map((link, index) => (
                            <div key={link.name} className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5 group hover:border-cyan-500/20">
                              <h3 className="text-lg font-bold text-white mb-2">{link.name}</h3>
                              <p className="text-xs text-slate-500 mb-4">{link.description}</p>
                              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-cyan-400 flex items-center gap-1 uppercase tracking-widest">
                                Visit Link <ChevronRight size={14} />
                              </a>
                            </div>
                         ))}
                       </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficDashboard;
