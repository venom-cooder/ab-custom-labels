import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar'; // <--- IMPORT NAVBAR

// Main Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import Career from './pages/Career';

// Info Pages
import About from './pages/About';
import Privacy from './pages/Privacy';
import FAQ from './pages/FAQ';
import Feedback from './pages/Feedback';
import Help from './pages/Help';

import './App.css';

function App() {
  return (
    <Router>
      {/* NAVBAR IS HERE NOW (GLOBAL) */}
      <Navbar />
      
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
    </Router>
  );
}

export default App;