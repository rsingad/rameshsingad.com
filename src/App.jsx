import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { Suspense, lazy } from 'react';
import Header from './components/header';
import Footer from './components/footer.jsx';
import MainPage from './components/mainpage';
import Chatbot from './components/Chatbot.jsx';

const Home = lazy(() => import('./components/home'));
const Contact = lazy(() => import('./components/contact'));
const About = lazy(() => import('./components/about'));
const Skill = lazy(() => import('./components/skill/Skill'));
const Project = lazy(() => import('./components/project/project'));
const Dashboard = lazy(() => import('./components/dashbord'));
const TrafficDashboard = lazy(() => import('./components/TrafficDashboard'));
const TechInsights = lazy(() => import('./components/TechInsights'));
const InsightDetail = lazy(() => import('./components/InsightDetail'));
const NotFound = lazy(() => import('./components/NotFound.jsx'));
const Education = lazy(() => import('./components/education.jsx'));
const Experience = lazy(() => import('./components/experience.jsx'));
const AILab = lazy(() => import('./components/AILab.jsx'));

const PageLoader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/skills' element={<Skill />} />
            <Route path='/education' element={<Education/>} />
            <Route path='/experience' element={<Experience />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/project' element={<Project />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/traffic-dashboard" element={<TrafficDashboard />} />
            <Route path="/insights" element={<TechInsights />} />
            <Route path="/insights/:id" element={<InsightDetail />} />
            <Route path="/ai-lab" element={<AILab />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Chatbot />
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
