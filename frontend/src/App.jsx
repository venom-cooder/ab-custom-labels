import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import the Pages we created
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';

// Import the Master CSS
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. The Main Landing Page */}
        <Route path="/" element={<Home />} />

        {/* 2. The Dynamic Gallery Page 
            :type allows it to change between "stickers", "logos", or "labels" 
        */}
        <Route path="/gallery/:type" element={<Gallery />} />

        {/* 3. The Secret Admin Dashboard 
            (Only you know this link exists) 
        */}
        <Route path="/secret-admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;