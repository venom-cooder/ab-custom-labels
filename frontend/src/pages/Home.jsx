import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; 
import { FaArrowRight, FaTimes, FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaShapes, FaTag, FaIdCard, FaPenNib } from 'react-icons/fa';

// Animation Components
import TiltCard from '../components/anim/TiltCard';
import RevealText from '../components/anim/RevealText';
import MagneticBtn from '../components/anim/MagneticBtn';
import CardSwap, { Card } from '../components/anim/CardSwap';
import LiquidChrome from '../components/anim/LiquidChrome';

const Home = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [orderStage, setOrderStage] = useState('FORM');
  const [logoIndex, setLogoIndex] = useState(0);
  const logos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % logos.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

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
      
      {/* NAVBAR handled globally, but buttons specific to Home hero are here */}

      {/* 1. HERO SECTION (Static Premium Image) */}
      <div className="distortion-wrapper">
        {/* THE BACKGROUND IMAGE */}
        <div className="hero-static-bg"></div>
        
        <div className="hero-overlay">
          <h1 className="hero-title">
            WELCOME TO <br/>
            <span style={{color:'var(--accent)'}}>AB CUSTOM LABELS</span>
          </h1>
          
          <p className="hero-desc">
            Your premier design house for engineering branding assets. 
            From waterproof labels and holographic stickers to professional logos that define product value.
          </p>

          <div className="hero-buttons-grid">
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/logos')}><FaPenNib/> LOGOS</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/labels')}><FaTag/> LABELS</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/cards')}><FaIdCard/> CARDS</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/stickers')}><FaShapes/> STICKERS</button>
          </div>
        </div>
      </div>

      {/* 2. SPLIT SECTION (Cards Right & Down) */}
      <section className="split-section">
        <div className="split-text">
          <h2 style={{fontSize:'3.5rem', fontWeight:'800', lineHeight:'1.1', marginBottom:'20px', color:'#ffffff'}}>
            Unleash Your <br/> <span style={{color:'var(--accent)', fontStyle:'italic'}}>Creativity.</span>
          </h2>
          <p style={{color:'#e0e0e0', marginBottom:'40px', fontSize:'1.1rem', lineHeight:'1.6'}}>
            We craft identities that people remember. Don't know what you want? Let the cards decide.
          </p>
          <button className="primary-btn" onClick={() => setOrderModalOpen(true)}>
            GIVE ORDER
          </button>
        </div>

        <div className="split-visual">
          <CardSwap cardDistance={50} verticalDistance={60}>
            <Card>
              <img src="/images/Cards/cards1.png" alt="Card" />
              <div className="swap-content"><h3>Cards</h3><p>Premium Finish</p></div>
            </Card>
            <Card>
              <img src="/images/Stickers/stickers2.png" alt="Sticker" />
              <div className="swap-content"><h3>Stickers</h3><p>Die-cut Vinyl</p></div>
            </Card>
            <Card>
              <img src="/images/Logos/logo3.png" alt="Logo" />
              <div className="swap-content"><h3>Logos</h3><p>Brand Identity</p></div>
            </Card>
            <Card>
              <img src="/images/Labels/labels4.png" alt="Label" />
              <div className="swap-content"><h3>Labels</h3><p>Packaging</p></div>
            </Card>
          </CardSwap>
        </div>
      </section>

      {/* 3. OUR WORK */}
      <section style={{padding:'4rem 0', background:'#0a0a0a', display:'flex', flexDirection:'column', alignItems:'center', borderTop:'1px solid #222'}}>
        <p style={{marginBottom:'30px', letterSpacing:'2px', fontSize:'0.9rem', color:'#555', fontWeight:'bold'}}>OUR WORK</p>
        <div style={{height:'150px', display:'flex', alignItems:'center'}}>
          <AnimatePresence mode="wait">
            <motion.img 
              key={logoIndex}
              src={`/images/Logos/logo${logos[logoIndex]}.png`} 
              alt="Logo"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              style={{ maxHeight: '120px', filter:'invert(1)' }} 
            />
          </AnimatePresence>
        </div>
      </section>

      {/* 4. STICKERS MARQUEE */}
      <div style={{overflow:'hidden', whiteSpace:'nowrap', padding:'40px 0', background:'#000', borderTop:'1px solid #222', borderBottom:'1px solid #222'}}>
        <motion.div style={{display:'flex', gap:'50px'}} animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }}>
          {[...Array(10), ...Array(10)].map((_, i) => (
            <img key={i} src={`/images/Stickers/stickers${(i % 10) + 1}.png`} style={{height:'100px', width:'auto', filter:'grayscale(0.3)'}} alt="sticker"/>
          ))}
        </motion.div>
      </div>

      {/* 5. HIGHLIGHTS */}
      <section className="highlights-section">
        <div className="liquid-bg">
          <LiquidChrome baseColor={[0.2, 0.18, 0.1]} speed={0.4} amplitude={0.3} />
        </div>
        <div className="stacked-cards">
          <div className="glass-card">
            <img src="/images/Cards/cards5.png" alt="Highlight 1" />
            <h3 style={{marginTop:'15px', color:'white'}}>Exclusive Prints</h3>
          </div>
          <div className="glass-card">
            <img src="/images/Cards/cards3.png" alt="Highlight 2" />
            <h3 style={{marginTop:'15px', color:'white'}}>Matte Finish</h3>
          </div>
        </div>
      </section>

      {/* FOOTER (Handled Globally by App.jsx now) */}

      {/* MODAL */}
      {isOrderModalOpen && (
        <div className="modal-overlay" onClick={()=>setOrderModalOpen(false)}>
          <div className="order-modal" onClick={e=>e.stopPropagation()}>
             <h2 style={{color:'white', marginBottom:'20px'}}>Start Project</h2>
             <p style={{color:'#ccc', marginBottom:'30px'}}>Connect with us directly on WhatsApp.</p>
             <button className="big-whatsapp-btn" onClick={()=>window.open('https://wa.me/919243858944','_blank')}>
               <FaWhatsapp size={24}/> Open WhatsApp Chat
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;