import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { 
  ArrowLeft, 
  ExternalLink,
  Zap,
  ChevronRight
} from 'lucide-react';

const InsightDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiUrl}/api/news/${id}`);
        setArticle(response.data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load the article. It might have been removed or the ID is invalid.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Zap className="text-cyan-500 animate-pulse" size={48} />
          <p className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Loading Insight...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h2 className="text-2xl font-black text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-slate-400 mb-8">{error || "Article not found"}</p>
          <button 
            onClick={() => navigate('/insights')}
            className="px-6 py-3 bg-cyan-500 text-white rounded-full font-bold hover:bg-cyan-600 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} /> Back to Insights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <Helmet>
        <title>{`${article.title} | RS Insights`}</title>
        <meta name="description" content={article.description} />
        <meta name="keywords" content={article.keywords || "Tech News, AI Trends, Ramesh Singad"} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
      </Helmet>

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/insights')} 
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="text-sm font-bold uppercase tracking-widest">Back to Insights</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-500 px-3 py-1 bg-cyan-500/10 rounded-md border border-cyan-500/20">
              {article.source?.name || 'Tech Insight'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {new Date(article.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight">
            {article.title}
          </h1>
          
          <div className="bg-slate-800/20 border border-slate-700/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <div className="prose prose-invert max-w-none">
              {article.content?.split('\n').map((paragraph, index) => (
                <p key={index} className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-700/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="text-xs text-slate-500 italic mb-4">
                    Original AI-Generated Insight • RS Engine 2.0
                  </p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm font-bold flex items-center gap-1 transition-colors">
                    Reference Original Source <ExternalLink size={14} />
                  </a>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-700/30">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-cyan-500/20">RS</div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Ramesh Singad</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Digital Architect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm mb-8">Want more tech insights?</p>
            <button 
              onClick={() => navigate('/insights')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-full font-black uppercase tracking-widest text-sm shadow-xl shadow-cyan-500/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
            >
              Explore Trending Topics <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InsightDetail;
