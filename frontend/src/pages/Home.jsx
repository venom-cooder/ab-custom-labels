import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; 
import { FaArrowRight, FaTimes, FaWhatsapp, FaPenNib } from 'react-icons/fa';

// Animation Components
import TiltCard from '../components/anim/TiltCard';
import RevealText from '../components/anim/RevealText';
import MagneticBtn from '../components/anim/MagneticBtn';

const Home = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- STATES ---
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [orderStage, setOrderStage] = useState('FORM');
  
  // Logo Animation State
  const [logoIndex, setLogoIndex] = useState(0);
  const logos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Assumes logo1.png ... logo10.png exist

  // Cycle Logos every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % logos.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // --- HANDLERS ---
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
      
      {/* --- 1. IMPROVED HEADER --- */}
      <nav>
        <div className="logo" onClick={()=>navigate('/')}>AB CUSTOM.</div>
        
        {/* Direct Links Section */}
        <div className="nav-links">
          <span className="nav-link" onClick={()=>navigate('/gallery/stickers')}>Stickers</span>
          <span className="nav-link" onClick={()=>navigate('/gallery/labels')}>Labels</span>
          <span className="nav-link" onClick={()=>navigate('/gallery/logos')}>Logos</span>
          <span className="nav-link" onClick={()=>navigate('/gallery/cards')}>Cards</span>
          <span className="nav-link" onClick={()=>navigate('/career')}>Career</span>
          <span className="nav-link" onClick={()=>window.scrollTo(0, document.body.scrollHeight)}>About</span>
        </div>

        <MagneticBtn onClick={() => setOrderModalOpen(true)} style={{ width: 'auto', padding: '10px 20px', fontSize: '0.85rem' }}>
          Start Project
        </MagneticBtn>
      </nav>

      {/* --- 2. HERO TEXT --- */}
      <section className="hero-section">
        <div className="hero-title" style={{ display: 'flex', justifyContent: 'center' }}>
          <RevealText text="We Design Identities That Stick." />
        </div>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} className="hero-desc">
          Premium branding assets. Waterproof labels, holographic stickers, and logos that define your product's value.
        </motion.p>
      </section>

      {/* --- 3. FASCINATING CARD SHOWCASE (Cards 2 & 7) --- */}
      <section className="featured-section">
        <div className="blob"></div> {/* Background Glow */}
        
        <TiltCard className="feat-card-wrapper">
          <img src="/images/Cards/cards2.png" alt="Featured 1" className="feat-card-img" />
        </TiltCard>
        
        <TiltCard className="feat-card-wrapper" style={{marginTop:'50px'}}> {/* Offset for aesthetics */}
          <img src="/images/Cards/cards7.png" alt="Featured 2" className="feat-card-img" />
        </TiltCard>
      </section>

      {/* --- 4. COMPACT BENTO GRID --- */}
      <div className="bento-section">
        <div style={{marginBottom:'20px', textAlign:'center', color:'#888', fontSize:'0.9rem'}}>
          Select a category to view past work & customize
        </div>
        
        <div className="bento-grid">
          
          {/* Custom Order (Black Card) */}
          <TiltCard className="card hero-card" onClick={() => setOrderModalOpen(true)}>
            <div style={{zIndex:1}}>
              <div style={{fontSize:'0.8rem', opacity:0.7, marginBottom:'5px'}}>HAVE A UNIQUE IDEA?</div>
              <h2 style={{fontSize:'1.8rem', margin:0}}>Start Custom Order</h2>
            </div>
            <button className="grid-btn">Open Form <FaArrowRight/></button>
          </TiltCard>

          {/* Stickers */}
          <TiltCard className="card" onClick={() => navigate('/gallery/stickers')}>
            <h3>Stickers</h3>
            <p style={{fontSize:'0.8rem', color:'#666'}}>Die-cut & Vinyl. <br/>Customize existing designs.</p>
            <button className="grid-btn">View Stickers</button>
          </TiltCard>

          {/* Labels */}
          <TiltCard className="card" onClick={() => navigate('/gallery/labels')}>
            <h3>Labels</h3>
            <p style={{fontSize:'0.8rem', color:'#666'}}>Rolls & Sheets. <br/>Browse archive.</p>
            <button className="grid-btn">View Labels</button>
          </TiltCard>

          {/* Logos */}
          <TiltCard className="card" onClick={() => navigate('/gallery/logos')}>
            <h3>Logos</h3>
            <p style={{fontSize:'0.8rem', color:'#666'}}>Brand Identity. <br/>See our portfolio.</p>
            <button className="grid-btn">View Logos</button>
          </TiltCard>

          {/* Cards */}
          <TiltCard className="card" onClick={() => navigate('/gallery/cards')}>
            <h3>Cards</h3>
            <p style={{fontSize:'0.8rem', color:'#666'}}>Visiting & Event Cards.</p>
            <button className="grid-btn">View Cards</button>
          </TiltCard>

        </div>
      </div>

      {/* --- 5. LOGO FADER ANIMATION (Aesthetic) --- */}
      <section className="logo-fader-section">
        <p style={{marginBottom:'30px', letterSpacing:'2px', fontSize:'0.8rem', color:'#999'}}>TRUSTED BRAND IDENTITIES</p>
        <div className="logo-stage">
          <AnimatePresence mode="wait">
            <motion.img 
              key={logoIndex}
              src={`/images/Logos/logo${logos[logoIndex]}.png`} 
              alt="Logo"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.8 }}
              style={{ maxWidth: '150px', maxHeight: '150px' }}
            />
          </AnimatePresence>
        </div>
      </section>

      {/* --- 6. STICKER MARQUEE (Moving Right) --- */}
      <section className="marquee-container">
        {/* Duplicate list 3 times for seamless loop */}
        <motion.div 
          className="marquee-track"
          animate={{ x: [0, 1000] }} // Moving Right
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {/* Create an array of 20 stickers to scroll */}
          {[...Array(10), ...Array(10)].map((_, i) => (
            <img 
              key={i} 
              src={`/images/Stickers/stickers${(i % 10) + 1}.png`} 
              alt="sticker" 
              className="marquee-img"
            />
          ))}
        </motion.div>
      </section>

      {/* --- FOOTER & MODAL (Keeping existing logic) --- */}
      <footer>
        <div className="footer-content">
          <h2 style={{fontSize:'2rem'}}>AB CUSTOM LABELS</h2>
          <p style={{color:'#888'}}>Make it Unforgettable.</p>
          <MagneticBtn onClick={() => window.open('https://wa.me/919243858944', '_blank')} style={{ background: 'white', color: 'black', maxWidth: '300px', marginTop: '20px' }}>
            <FaWhatsapp /> Direct WhatsApp Contact
          </MagneticBtn>
          <p style={{fontSize:'0.8rem', color:'#444', marginTop:'30px'}}>&copy; 2025 AB Custom Labels. Katni, MP.</p>
        </div>
      </footer>

      <AnimatePresence>
        {isOrderModalOpen && (
          <div className="modal-overlay">
            <motion.div className="order-modal" initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}}>
              <button onClick={() => setOrderModalOpen(false)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer'}}><FaTimes size={20}/></button>
              {orderStage === 'FORM' ? (
                <form onSubmit={handleFormSubmit}>
                  <h2 style={{marginBottom:'20px'}}>Start Your Project</h2>
                  <input name="name" required className="clean-input" placeholder="Your Name" />
                  <input name="contact" required className="clean-input" placeholder="WhatsApp Contact" />
                  <textarea name="details" required className="clean-input" rows="4" placeholder="Describe your idea..." />
                  <button type="submit" className="primary-btn" disabled={isSaving}>{isSaving ? '...' : 'Generate Request'}</button>
                </form>
              ) : (
                <div>
                  <h2 style={{marginBottom:'10px'}}>Request Generated</h2>
                  <button onClick={connectWhatsApp} className="primary-btn" style={{background:'#25D366'}}><FaWhatsapp /> Chat on WhatsApp</button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;