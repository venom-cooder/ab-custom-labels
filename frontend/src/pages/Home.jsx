import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; 
import { FaArrowRight, FaTimes, FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaShapes, FaTag, FaIdCard, FaPenNib } from 'react-icons/fa';

// Animation Components
import TiltCard from '../components/anim/TiltCard';
import RevealText from '../components/anim/RevealText';
import MagneticBtn from '../components/anim/MagneticBtn';
import AuroraBackground from '../components/anim/AuroraBackground'; // Using Canva Aurora
import ChangingImage from '../components/anim/ChangingImage';

const Home = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [orderStage, setOrderStage] = useState('FORM');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newOrder = {
      name: data.get('name'),
      contact: data.get('contact'),
      details: data.get('details'),
      type: 'Home Request',
      date: new Date().toLocaleString()
    };
    setFormData(newOrder);
    try { await axios.post(`${API_URL}/api/orders`, newOrder); } catch(e){}
    setOrderStage('SUMMARY');
  };

  const connectWhatsApp = () => {
    const msg = `*NEW INQUIRY* 🚀\n👤 Name: ${formData.name}\n📞 Contact: ${formData.contact}\n📝 Request: ${formData.details}`;
    window.open(`https://wa.me/919243858944?text=${encodeURIComponent(msg)}`, '_blank');
    setOrderModalOpen(false); setOrderStage('FORM');
  };

  return (
    <div className="app-container">
      
      {/* NAVBAR is handled globally in App.jsx */}

      {/* 1. HERO SECTION (Canva Style: Aurora BG + Search-like Buttons) */}
      <div className="distortion-wrapper">
        {/* The Aurora Background component provided */}
        <AuroraBackground />
        
        <div className="hero-overlay">
          <h1 className="hero-title">
            What will you <span style={{background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>create</span> today?
          </h1>
          
          <p className="hero-desc" style={{color: 'var(--text-body)'}}>
            AB Custom Labels is your design partner. Waterproof labels, stickers, and premium branding assets delivered to your door.
          </p>

          <div className="hero-buttons-grid">
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/logos')}><FaPenNib color="var(--primary)"/> Logos</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/labels')}><FaTag color="var(--accent)"/> Labels</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/cards')}><FaIdCard color="#E1306C"/> Cards</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/stickers')}><FaShapes color="#25D366"/> Stickers</button>
          </div>
        </div>
      </div>

      {/* 2. WHAT WE MAKE (Clean 2x2 Grid) */}
      <section className="make-section">
        <div className="make-text">
          <h2>Quality you can <span style={{color:'var(--primary)'}}>feel.</span></h2>
          <p>
            We don't just print; we craft experiences. From matte-finish business cards to die-cut vinyl stickers that withstand the elements.
          </p>
          <div style={{marginTop:'30px'}}>
            <button className="primary-btn" onClick={() => setOrderModalOpen(true)}>Start a Project</button>
          </div>
        </div>

        <div className="make-visual">
          <div className="live-grid">
            <ChangingImage folder="Stickers" prefix="stickers" count={5} label="Stickers" />
            <ChangingImage folder="Logos" prefix="logo" count={5} label="Logos" />
            <ChangingImage folder="Labels" prefix="labels" count={5} label="Labels" />
            <ChangingImage folder="Cards" prefix="cards" count={5} label="Cards" />
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID (Updated for Light Theme) */}
      <div className="bento-section">
        <h3 style={{textAlign:'center', fontSize:'2rem', fontWeight:'800', marginBottom:'40px', color:'var(--text-main)'}}>Explore Categories</h3>
        <div className="bento-grid">
          <TiltCard className="card hero-card" onClick={() => setOrderModalOpen(true)}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div style={{zIndex:1}}>
                <h2 style={{fontSize:'1.8rem', margin:0, color:'white'}}>Have a unique idea?</h2>
                <p style={{fontSize:'0.9rem', opacity:0.9, color:'white'}}>Let us design it for you.</p>
              </div>
              <button className="grid-btn" style={{marginTop:'20px'}}>Custom Order <FaArrowRight/></button>
            </div>
          </TiltCard>

          <TiltCard className="card" onClick={() => navigate('/gallery/stickers')}>
            <div><h3>Stickers</h3> <p style={{fontSize:'0.85rem', color:'#666'}}>Die-cut & Vinyl</p></div>
            <button className="grid-btn">Browse</button>
          </TiltCard>
          <TiltCard className="card" onClick={() => navigate('/gallery/labels')}>
            <div><h3>Labels</h3> <p style={{fontSize:'0.85rem', color:'#666'}}>Rolls & Sheets</p></div>
            <button className="grid-btn">Browse</button>
          </TiltCard>
          <TiltCard className="card" onClick={() => navigate('/gallery/cards')}>
            <div><h3>Cards</h3> <p style={{fontSize:'0.85rem', color:'#666'}}>Visiting & Event</p></div>
            <button className="grid-btn">Browse</button>
          </TiltCard>
          <TiltCard className="card" onClick={() => navigate('/gallery/logos')}>
            <div><h3>Logos</h3> <p style={{fontSize:'0.85rem', color:'#666'}}>Brand Identity</p></div>
            <button className="grid-btn">Browse</button>
          </TiltCard>
        </div>
      </div>

      {/* MODAL (Updated Colors) */}
      {isOrderModalOpen && (
        <div className="modal-overlay" onClick={()=>setOrderModalOpen(false)}>
          <div className="order-modal" onClick={e=>e.stopPropagation()}>
             <button onClick={() => setOrderModalOpen(false)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer'}}><FaTimes size={20} color="#888"/></button>
             <h2 style={{color:'var(--text-main)', marginBottom:'20px'}}>Start Project</h2>
             <p style={{color:'var(--text-body)', marginBottom:'30px'}}>Tell us what you need. We'll connect on WhatsApp.</p>
             
             {orderStage === 'FORM' ? (
                <form onSubmit={handleFormSubmit}>
                  <label style={{fontSize:'0.85rem', fontWeight:'600', color:'var(--text-main)', marginBottom:'5px', display:'block'}}>Brand / Name</label>
                  <input name="name" required className="clean-input" placeholder="Ex: Urban Hype" />
                  
                  <label style={{fontSize:'0.85rem', fontWeight:'600', color:'var(--text-main)', marginBottom:'5px', display:'block'}}>WhatsApp Contact</label>
                  <input name="contact" required className="clean-input" placeholder="+91 00000 00000" />
                  
                  <label style={{fontSize:'0.85rem', fontWeight:'600', color:'var(--text-main)', marginBottom:'5px', display:'block'}}>Requirements</label>
                  <textarea name="details" required className="clean-input" rows="4" placeholder="I need 100 gold foil stickers..." />
                  
                  <button type="submit" className="primary-btn" style={{width:'100%'}}>Generate Request</button>
                </form>
             ) : (
               <div>
                 <div style={{background:'#f5f5f5', padding:'15px', borderRadius:'8px', marginBottom:'20px'}}>
                   <p style={{margin:0, color:'#333'}}><strong>Name:</strong> {formData.name}</p>
                   <p style={{margin:0, color:'#333'}}><strong>Req:</strong> {formData.details}</p>
                 </div>
                 <button className="big-whatsapp-btn" onClick={()=>window.open('https://wa.me/919243858944','_blank')}>
                   <FaWhatsapp size={24}/> Open WhatsApp Chat
                 </button>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;