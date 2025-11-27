import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; 
import { FaArrowRight, FaTimes, FaWhatsapp, FaShapes, FaTag, FaIdCard, FaPenNib } from 'react-icons/fa';

// Animation Components
import TiltCard from '../components/anim/TiltCard';
import RevealText from '../components/anim/RevealText';
import MagneticBtn from '../components/anim/MagneticBtn';
import LiquidChrome from '../components/anim/LiquidChrome'; // Kept for highlights
import ChangingImage from '../components/anim/ChangingImage';

const Home = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [orderStage, setOrderStage] = useState('FORM');
  const [logoIndex, setLogoIndex] = useState(0);
  const logos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [showHeroText, setShowHeroText] = useState(true);

  useEffect(() => {
    const textInterval = setInterval(() => { setShowHeroText(prev => !prev); }, 5000);
    const logoInterval = setInterval(() => { setLogoIndex((prev) => (prev + 1) % logos.length); }, 2000); 
    return () => { clearInterval(textInterval); clearInterval(logoInterval); };
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
      
      {/* NAVBAR handled by App.jsx generally, but ensuring local nav matches theme */}
      {/* We rely on App.jsx navbar. Removing local nav to avoid duplicates if App.jsx has it. 
          If App.jsx has navbar, this space is clean. */}

      {/* 1. HERO SECTION (LIGHT THEME) */}
      <div className="distortion-wrapper">
        <div className="hero-static-bg"></div>
        
        <div className="hero-overlay">
          <div style={{height:'180px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px'}}>
            <AnimatePresence mode="wait">
              {showHeroText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  {/* Title color handled by CSS (.hero-title) */}
                  <h1 className="hero-title">
                    WELCOME TO <br/>
                    <span style={{color:'var(--accent)'}}>AB CUSTOM LABELS</span>
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Desc color handled by CSS (.hero-desc) */}
          <p className="hero-desc">
            Your premier design house for engineering branding assets. 
            From waterproof labels and holographic stickers to professional logos that define product value.
          </p>

          <div className="hero-buttons-grid">
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/logos')}><FaPenNib color="var(--text-main)"/> LOGOS</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/labels')}><FaTag color="var(--text-main)"/> LABELS</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/cards')}><FaIdCard color="var(--text-main)"/> CARDS</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/stickers')}><FaShapes color="var(--text-main)"/> STICKERS</button>
          </div>
        </div>
      </div>

      {/* 2. WHAT WE MAKE (Clean Light Section) */}
      <section className="make-section">
        <div className="make-text">
          <h2>WHAT WE <span style={{color:'var(--accent)'}}>MAKE</span></h2>
          <p>
            From stickers that pop to cards that impress. We craft identities that people remember.
            <br/>Browse our diverse categories below.
          </p>
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

      {/* 3. BENTO GRID (Blocks) */}
      <div className="bento-section">
        <div className="bento-grid">
          <TiltCard className="card hero-card" onClick={() => setOrderModalOpen(true)}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div style={{zIndex:1}}>
                <div style={{fontSize:'0.8rem', opacity:0.7, marginBottom:'5px', color:'white'}}>HAVE A UNIQUE IDEA?</div>
                <h2 style={{fontSize:'1.8rem', margin:0, color:'white'}}>Start Custom Order</h2>
              </div>
              <button className="grid-btn" style={{marginTop:'20px'}}>Open Form <FaArrowRight/></button>
            </div>
          </TiltCard>
          <TiltCard className="card" onClick={() => navigate('/gallery/stickers')}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div><h3>Stickers</h3> <p style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Die-cut & Vinyl.</p></div>
              <button className="grid-btn">View Stickers</button>
            </div>
          </TiltCard>
          <TiltCard className="card" onClick={() => navigate('/gallery/labels')}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div><h3>Labels</h3> <p style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Rolls & Sheets.</p></div>
              <button className="grid-btn">View Labels</button>
            </div>
          </TiltCard>
          <TiltCard className="card" onClick={() => navigate('/gallery/logos')}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div><h3>Logos</h3> <p style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Brand Identity.</p></div>
              <button className="grid-btn">View Logos</button>
            </div>
          </TiltCard>
          <TiltCard className="card" onClick={() => navigate('/gallery/cards')}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div><h3>Cards</h3> <p style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Visiting Cards.</p></div>
              <button className="grid-btn">View Cards</button>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* 4. OUR WORK (Logos) */}
      <section style={{padding:'4rem 0', background:'var(--bg-secondary)', display:'flex', flexDirection:'column', alignItems:'center', borderTop:'1px solid var(--border)'}}>
        <p style={{marginBottom:'30px', letterSpacing:'2px', fontSize:'0.9rem', color:'var(--text-muted)', fontWeight:'bold'}}>OUR WORK</p>
        <div style={{height:'150px', display:'flex', alignItems:'center'}}>
          <AnimatePresence mode="wait">
            <motion.img 
              key={logoIndex}
              src={`/images/Logos/logo${logos[logoIndex]}.png`} 
              alt="Logo"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              /* NO INVERT FILTER for Light Mode (assuming logos are dark or colored) */
              style={{ maxHeight: '120px' }} 
            />
          </AnimatePresence>
        </div>
      </section>

      {/* 5. STICKERS MARQUEE */}
      <div style={{overflow:'hidden', whiteSpace:'nowrap', padding:'40px 0', background:'var(--accent)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)'}}>
        <motion.div style={{display:'flex', gap:'50px'}} animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }}>
          {[...Array(10), ...Array(10)].map((_, i) => (
            <img key={i} src={`/images/Stickers/stickers${(i % 10) + 1}.png`} style={{height:'100px', width:'auto'}} alt="sticker"/>
          ))}
        </motion.div>
      </div>

      {/* 6. HIGHLIGHTS */}
      <section className="highlights-section">
        {/* Liquid Chrome Opacity lowered for white BG */}
        <div className="liquid-bg" style={{opacity:0.1}}>
          <LiquidChrome baseColor={[0.9, 0.9, 0.9]} speed={0.4} amplitude={0.3} />
        </div>
        <div className="stacked-cards">
          <div className="glass-card">
            <img src="/images/Cards/cards5.png" alt="Highlight 1" />
            <h3 style={{marginTop:'15px', color:'var(--text-main)'}}>Exclusive Prints</h3>
          </div>
          <div className="glass-card">
            <img src="/images/Cards/cards3.png" alt="Highlight 2" />
            <h3 style={{marginTop:'15px', color:'var(--text-main)'}}>Matte Finish</h3>
          </div>
        </div>
      </section>

      {/* MODAL (Light Theme) */}
      {isOrderModalOpen && (
        <div className="modal-overlay" onClick={()=>setOrderModalOpen(false)}>
          <div className="order-modal" onClick={e=>e.stopPropagation()}>
             <button onClick={() => setOrderModalOpen(false)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer'}}><FaTimes size={20} color="#888"/></button>
             <h2 style={{color:'var(--text-main)', marginBottom:'20px'}}>Start Project</h2>
             <p style={{color:'var(--text-body)', marginBottom:'30px'}}>Connect with us directly on WhatsApp.</p>
             
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