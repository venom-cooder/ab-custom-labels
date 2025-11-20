import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import Career from './pages/Career'; // <--- IMPORT THIS

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery/:type" element={<Gallery />} />
        <Route path="/career" element={<Career />} /> {/* <--- ADD ROUTE */}
        <Route path="/secret-admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;