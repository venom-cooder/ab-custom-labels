import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <--- IMPORT FOOTER

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
      <div className="app-container">
        
        {/* 1. GLOBAL NAVBAR (Top) */}
        <Navbar />
        
        {/* 2. PAGE CONTENT (Middle) */}
        <div style={{ flex: 1 }}> {/* Pushes footer down if content is short */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery/:type" element={<Gallery />} />
            <Route path="/career" element={<Career />} />
            <Route path="/secret-admin" element={<Admin />} />
            
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