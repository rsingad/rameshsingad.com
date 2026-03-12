import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header';
import Home from './components/home';
import Contact from './components/contact';
import About from './components/about';
import MainPage from './components/mainpage';
import Skill from './components/skill/Skill';
import Project from './components/project/project';
import Dashboard from './components/dashbord';
import TrafficDashboard from './components/TrafficDashboard';
import TechInsights from './components/TechInsights';
import InsightDetail from './components/InsightDetail';
import NotFound from './components/NotFound.jsx';
import Chatbot from './components/Chatbot.jsx';
import Education from './components/education.jsx';
import Experience from './components/experience.jsx';
import Footer from './components/footer.jsx';
// import Chat from './components/chat/chat';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
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

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
        <Footer/>
      </BrowserRouter>

    </>
  )
}

export default App
