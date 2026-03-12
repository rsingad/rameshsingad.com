import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { 
  TrendingUp, 
  ChevronRight, 
  Zap,
  Star,
  Quote
} from 'lucide-react';

const TechInsights = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Real expert insights for SEO (based on 2024-2025 trends)
  const expertInsights = [
    {
      topic: "India AI Mission",
      insight: "The ₹10,371 Cr allocation for the India AI Mission is a game-changer. It democratizes compute access for startups, ensuring India doesn't just use AI, but builds it.",
      author: "Ramesh Singad",
      role: "Senior Software Engineer"
    },
    {
      topic: "BharatGen GenAI",
      insight: "BharatGen is the linguistic bridge India needs. Generative AI tailored for our diverse cultures will revolutionize local governance and digital service delivery.",
      author: "Ramesh Singad",
      role: "AI Architect"
    },
    {
      topic: "Hardware Renaissance",
      insight: "With 'Made in India' laptops projected to hit 30% market share by 2025, we're seeing a massive shift from a service-only economy to a high-tech manufacturing hub.",
      author: "Ramesh Singad",
      role: "Full-Stack Specialist"
    }
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${apiUrl}/api/news`);
      setNews(response.data);
    } catch (error) {
      console.error("News fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic SEO Description based on top news
  const dynamicDescription = news.length > 0 
    ? `Expert tech insights on ${news[0].title.substring(0, 60)}... by Ramesh Singad, Senior Software Engineer.`
    : "Stay updated with trending technology news and professional expert insights from Ramesh Singad's Portfolio.";

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <Helmet>
        <title>Tech Insights & Trending Topics | RS Portfolio</title>
        <meta name="description" content={dynamicDescription} />
        <meta name="keywords" content="Tech News India, SEO Strategy, MERN Stack Insights, AI Trends 2026, Ramesh Singad Blog" />
        <meta property="og:title" content="Tech Insights & Trending Topics | Ramesh Singad" />
        <meta property="og:description" content={dynamicDescription} />
      </Helmet>

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Zap size={14} className="animate-pulse" /> Live Tech Pulse
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6"
          >
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Insights</span> & Trends
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed"
          >
            A curated space for the latest technology news combined with professional expert analysis to boost your digital strategy.
          </motion.p>
        </div>

        {/* Expert Insights Carousel/Grid */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Star className="text-yellow-400 fill-yellow-400" /> Expert Perspectives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertInsights.map((insight, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-slate-800/20 border border-slate-700/50 hover:border-cyan-500/30 transition-all group relative overflow-hidden"
              >
                <Quote className="absolute top-4 right-4 text-slate-700/30 group-hover:text-cyan-500/20 transition-colors" size={60} />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-4">{insight.topic}</span>
                <p className="text-slate-200 font-medium leading-relaxed mb-6 italic relative z-10">
                   "{insight.insight}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-sm">RS</div>
                  <div>
                    <h4 className="text-sm font-bold">{insight.author}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-black">{insight.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trending News Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <TrendingUp className="text-indigo-400" /> Trending Now
            </h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Tech Category | India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-64 rounded-3xl bg-slate-800/40 animate-pulse border border-slate-700/50"></div>
              ))
            ) : (
              news.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  onClick={() => navigate(`/insights/${item._id}`)}
                  className="group cursor-pointer bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 rounded-3xl overflow-hidden transition-all flex flex-col"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500 px-2 py-1 bg-cyan-500/10 rounded-md">
                        {item.source?.name || 'Tech Insight'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-4 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {item.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                       <span className="text-xs text-slate-500 font-medium italic">Original AI-Generated Insight</span>
                       <div className="text-cyan-500 group-hover:translate-x-1 transition-transform">
                         <ChevronRight size={20} />
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* SEO Keywords Footer (Hidden for UI, but visible for Search Engines) */}
        <div className="mt-20 py-10 border-t border-slate-800/50 text-center">
            <p className="text-xs text-slate-700 max-w-4xl mx-auto leading-loose">
              Keywords: Ramesh Singad Portfolio, Senior Software Engineer Jaipur, AI Architect India, MERN Stack Developer, React Performance Optimization, Full-Stack Web Architect, Node.js Backend Expert, Scalable System Design, AI Integration Services, Framer Motion Animations, Next.js SEO Best Practices, Professional Tech Consultant.
            </p>
        </div>
      </div>
    </div>
  );
};

export default TechInsights;
