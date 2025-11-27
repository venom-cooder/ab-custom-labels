import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; 
import { FaArrowRight, FaTimes, FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaShapes, FaTag, FaIdCard, FaPenNib } from 'react-icons/fa';

// Animation Components
import TiltCard from '../components/anim/TiltCard';
import RevealText from '../components/anim/RevealText';
import MagneticBtn from '../components/anim/MagneticBtn';
import AuroraBackground from '../components/anim/AuroraBackground'; 
import ChangingImage from '../components/anim/ChangingImage';

const Home = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [orderStage, setOrderStage] = useState('FORM');

  // --- DATA CONFIG FOR HOME GALLERY ---
  const gallerySections = [
    { title: 'Stickers', type: 'stickers', count: 10 },
    { title: 'Labels', type: 'labels', count: 29 },
    { title: 'Logos', type: 'logos', count: 10 },
    { title: 'Cards', type: 'cards', count: 9 }
  ];

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
      
      {/* NAVBAR handled by App.jsx */}

      {/* 1. HERO SECTION (Aurora Light Theme) */}
      <div className="distortion-wrapper">
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

      {/* 2. WHAT WE MAKE */}
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

      {/* 3. NEW FULL WIDTH GALLERY SECTIONS */}
      <section className="segregated-gallery-section">
        {gallerySections.map((section) => (
          <div key={section.type}>
            <div className="category-header">
              <h3>{section.title}</h3>
            </div>
            
            <div className="full-width-grid">
              {/* Display first 4 items for preview */}
              {[...Array(Math.min(section.count, 8))].map((_, i) => (
                <div 
                  key={i} 
                  className="full-grid-item" 
                  onClick={() => navigate(`/gallery/${section.type}`)}
                >
                  {/* Assuming images follow standard naming convention locally until backend populated */}
                  <img 
                    src={`/images/${section.title}/${section.type === 'logos' ? 'logo' : section.type}${i + 1}.png`} 
                    alt={`${section.title} ${i+1}`} 
                    loading="lazy"
                    onError={(e) => {e.target.style.display='none'}}
                  />
                  <div className="grid-item-info" style={{padding: '0 20px 20px'}}>
                    <div className="grid-item-title">{section.title} Design #{i+1}</div>
                    <div className="grid-item-sub">Customizable • Premium</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{textAlign:'center', marginTop:'30px'}}>
               <button onClick={()=>navigate(`/gallery/${section.type}`)} className="category-rect-btn" style={{width:'auto', display:'inline-flex'}}>
                 View All {section.title} <FaArrowRight/>
               </button>
            </div>
          </div>
        ))}
      </section>

      {/* MODAL */}
      {isOrderModalOpen && (
        <div className="modal-overlay" onClick={()=>setOrderModalOpen(false)}>
          <div className="order-modal" onClick={e=>e.stopPropagation()}>
             <button onClick={() => setOrderModalOpen(false)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer'}}><FaTimes size={20} color="#888"/></button>
             <h2 style={{color:'var(--text-main)', marginBottom:'20px'}}>Start Project</h2>
             <p style={{color:'var(--text-body)', marginBottom:'30px'}}>Tell us what you need. We'll connect on WhatsApp.</p>
             
             {orderStage === 'FORM' ? (
                <form onSubmit={handleFormSubmit}>
                  <label style={{fontSize:'0.85rem', fontWeight:'600', marginBottom:'5px', display:'block', color:'var(--text-main)'}}>Brand / Name</label>
                  <input name="name" required className="clean-input" placeholder="Ex: Urban Hype" />
                  
                  <label style={{fontSize:'0.85rem', fontWeight:'600', marginBottom:'5px', display:'block', color:'var(--text-main)'}}>WhatsApp Contact</label>
                  <input name="contact" required className="clean-input" placeholder="+91 00000 00000" />
                  
                  <label style={{fontSize:'0.85rem', fontWeight:'600', marginBottom:'5px', display:'block', color:'var(--text-main)'}}>Requirements</label>
                  <textarea name="details" required className="clean-input" rows="4" placeholder="Describe your idea..." />
                  
                  <button type="submit" className="primary-btn" style={{width:'100%'}}>Generate Request</button>
                </form>
             ) : (
               <div>
                 <h2 style={{marginBottom:'10px', color:'var(--text-main)'}}>Request Generated</h2>
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