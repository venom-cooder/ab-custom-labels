import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Main Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import Career from './pages/Career';

// Info & Support Pages
import About from './pages/About';
import Privacy from './pages/Privacy';
import FAQ from './pages/FAQ';
import Feedback from './pages/Feedback';
import Help from './pages/Help';

// Styles
import './App.css';

function App() {
  return (
    <Router>
      {/* Ensures page starts at top on navigation */}
      <ScrollToTop />

      <div className="app-container">
        
        {/* 1. GLOBAL NAVBAR (Top) */}
        <Navbar />
        
        {/* 2. PAGE CONTENT (Middle - Grows to fill space) */}
        <div style={{ flex: 1 }}> 
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/gallery/:type" element={<Gallery />} />
            <Route path="/career" element={<Career />} />
            <Route path="/secret-admin" element={<Admin />} />
            
            {/* Info Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faq" element={<FAQ />} />
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