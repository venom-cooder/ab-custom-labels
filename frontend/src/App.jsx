import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ReactGA from "react-ga4"; // Google Analytics
import { FaHome, FaMagic } from 'react-icons/fa';

// Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Main Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import Career from './pages/Career';
import AIDesign from './pages/AIDesign'; 

// Info & Support Pages
import About from './pages/About';
import FAQ from './pages/FAQ';
// Note: Ensure these files exist or create placeholders if they don't
import Privacy from './pages/Privacy';
import Feedback from './pages/Feedback';
import Help from './pages/Help';

// Styles
import './App.css';

// --- GOOGLE ANALYTICS SETUP ---
// Replace "G-XXXXXXXXXX" with your actual Measurement ID
ReactGA.initialize("G-RHE2B3ZH48");

// Internal Component to track page views inside Router
const AnalyticsTracker = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
  return null;
};

// --- INTERNAL COMPONENT: Floating Home Button ---
const BackHomeBtn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show on Home Page
  if (location.pathname === '/') return null;

  return (
    <button
      onClick={() => navigate('/')}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 2000,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#E5C76B', // Brand Gold
        color: '#000',
        border: '2px solid #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      title="Back to Home"
    >
      <FaHome size={22} />
    </button>
  );
};

// --- INTERNAL COMPONENT: Floating AI Studio Button ---
const AiStudioBtn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show if already on AI page
  if (location.pathname === '/ai-design') return null;

  return (
    <button
      onClick={() => navigate('/ai-design')}
      style={{
        position: 'fixed',
        bottom: '80px', // Positioned above Home button
        left: '20px',
        zIndex: 2000,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#000', 
        color: '#E5C76B', // Gold Icon
        border: '2px solid #E5C76B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      title="Go to AI Design Studio"
    >
      <FaMagic size={20} />
    </button>
  );
};

function App() {
  return (
    <Router>
      {/* Ensures page starts at top on navigation */}
      <ScrollToTop />
      
      {/* Tracks Page Views for Google Analytics */}
      <AnalyticsTracker />
      
      {/* Floating Buttons */}
      <BackHomeBtn />
      <AiStudioBtn />

      <div className="app-container">
        
        {/* 1. GLOBAL NAVBAR (Top) */}
        <Navbar />
        
        {/* 2. PAGE CONTENT (Middle - Grows to fill space) */}
        <div style={{ flex: 1 }}> 
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/gallery/:type" element={<Gallery />} />
            <Route path="/ai-design" element={<AIDesign />} />
            <Route path="/career" element={<Career />} />
            <Route path="/secret-admin" element={<Admin />} />
            
            {/* Info Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* Ensure these components exist or route will fail */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>

        {/* 3. GLOBAL FOOTER (Bottom) */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;