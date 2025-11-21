import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; 
import { FaArrowRight, FaTimes, FaWhatsapp, FaInstagram, FaShapes, FaIdCard, FaTag, FaPenNib } from 'react-icons/fa';

// Components
import TiltCard from '../components/anim/TiltCard';
import RevealText from '../components/anim/RevealText';
import MagneticBtn from '../components/anim/MagneticBtn';
import AuroraBackground from '../components/anim/AuroraBackground';

const Home = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // States
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
      
      {/* --- NAVBAR --- */}
      <nav>
        <div className="logo" onClick={()=>navigate('/')} style={{display:'flex', alignItems:'center', gap:'10px'}}>
          {/* Using logo.png explicitly */}
          <img src="/logo.png" alt="AB Logo" style={{height:'35px', width:'auto'}} />
          <span>AB CUSTOM LABELS</span>
        </div>
        
        <div className="nav-links">
          <span className="nav-link" onClick={()=>navigate('/gallery/stickers')}>Stickers</span>
          <span className="nav-link" onClick={()=>navigate('/gallery/labels')}>Labels</span>
          <span className="nav-link" onClick={()=>navigate('/gallery/logos')}>Logos</span>
          <span className="nav-link" onClick={()=>navigate('/gallery/cards')}>Cards</span>
          <span className="nav-link" onClick={()=>navigate('/career')}>Career</span>
        </div>
        
        <MagneticBtn onClick={() => setOrderModalOpen(true)} style={{ width: 'auto', padding: '10px 20px', fontSize: '0.85rem' }}>
          Place Order
        </MagneticBtn>
      </nav>

      {/* --- 1. HERO SECTION --- */}
      <section style={{ position: 'relative', minHeight: '650px', overflow: 'hidden', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }}>
        
        {/* Interactive Aurora Background */}
        <AuroraBackground />

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 20px', marginTop:'-50px' }}>
          <div className="hero-title" style={{ display: 'flex', justifyContent: 'center' }}>
            <RevealText text="We Design Identities That Stick." />
          </div>
          <motion.p 
            initial={{opacity:0, y:20}} 
            animate={{opacity:1, y:0}} 
            transition={{delay:0.5}} 
            className="hero-desc"
            style={{ color: '#333', fontWeight: '500' }} 
          >
            Premium branding assets. Waterproof labels, holographic stickers, visiting cards, and logos.
          </motion.p>
          
          {/* EXPANDED BUTTONS (4 PARTS) */}
          <motion.div 
            initial={{opacity:0, y:30}} 
            animate={{opacity:1, y:0}} 
            transition={{delay:0.8}}
            style={{
              marginTop:'50px', 
              display:'flex', 
              flexWrap:'wrap', 
              gap:'15px', 
              justifyContent:'center'
            }}
          >
            <button className="category-pill" onClick={() => navigate('/gallery/logos')}>
              <FaPenNib /> Explore Logos
            </button>
            <button className="category-pill" onClick={() => navigate('/gallery/labels')}>
              <FaTag /> Explore Labels
            </button>
            <button className="category-pill" onClick={() => navigate('/gallery/cards')}>
              <FaIdCard /> Explore Cards
            </button>
            <button className="category-pill" onClick={() => navigate('/gallery/stickers')}>
              <FaShapes /> Explore Stickers
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- 2. BENTO GRID --- */}
      <div className="bento-section">
        <div className="bento-grid">
          <TiltCard className="card hero-card" onClick={() => setOrderModalOpen(true)}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div style={{zIndex:1}}>
                <div style={{fontSize:'0.8rem', opacity:0.7, marginBottom:'5px'}}>HAVE A UNIQUE IDEA?</div>
                <h2 style={{fontSize:'1.8rem', margin:0}}>Start Custom Order</h2>
              </div>
              <button className="grid-btn" style={{marginTop:'20px'}}>Open Form <FaArrowRight/></button>
            </div>
          </TiltCard>

          <TiltCard className="card" onClick={() => navigate('/gallery/stickers')}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div><h3>Stickers</h3> <p style={{fontSize:'0.8rem', color:'#666'}}>Die-cut & Vinyl.</p></div>
              <button className="grid-btn">View Stickers</button>
            </div>
          </TiltCard>

          <TiltCard className="card" onClick={() => navigate('/gallery/labels')}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div><h3>Labels</h3> <p style={{fontSize:'0.8rem', color:'#666'}}>Rolls & Sheets.</p></div>
              <button className="grid-btn">View Labels</button>
            </div>
          </TiltCard>

          <TiltCard className="card" onClick={() => navigate('/gallery/logos')}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div><h3>Logos</h3> <p style={{fontSize:'0.8rem', color:'#666'}}>Brand Identity.</p></div>
              <button className="grid-btn">View Logos</button>
            </div>
          </TiltCard>

          <TiltCard className="card" onClick={() => navigate('/gallery/cards')}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div><h3>Cards</h3> <p style={{fontSize:'0.8rem', color:'#666'}}>Visiting Cards.</p></div>
              <button className="grid-btn">View Cards</button>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* --- 3. OUR WORK --- */}
      <section className="logo-fader-section">
        <p style={{marginBottom:'30px', letterSpacing:'2px', fontSize:'0.9rem', color:'#999', fontWeight:'bold'}}>OUR WORK</p>
        <div className="logo-stage">
          <AnimatePresence mode="wait">
            <motion.img 
              key={logoIndex}
              src={`/images/Logos/logo${logos[logoIndex]}.png`} 
              alt="Logo"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </AnimatePresence>
        </div>
      </section>

      {/* --- 4. STICKER MARQUEE --- */}
      <section className="marquee-container">
        <motion.div 
          className="marquee-track"
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...Array(10), ...Array(10)].map((_, i) => (
            <img key={i} src={`/images/Stickers/stickers${(i % 10) + 1}.png`} alt="sticker" className="marquee-img" />
          ))}
        </motion.div>
      </section>

      {/* --- 5. HIGHLIGHTS (NOW WITH AURORA) --- */}
      <section style={{ position: 'relative', padding: '5rem 2rem', overflow: 'hidden' }}>
        
        {/* Background Aurora for Highlights */}
        <AuroraBackground />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '60px' }}>
          <h3 style={{textAlign:'center', color:'#333', fontSize:'2rem', marginBottom:'-20px', fontWeight:'900'}}>HIGHLIGHTS</h3>
          
          <TiltCard className="feat-card-wrapper">
            <img src="/images/Cards/cards5.png" alt="Highlight 1" className="feat-card-img" />
          </TiltCard>
          
          <TiltCard className="feat-card-wrapper"> 
            <img src="/images/Cards/cards3.png" alt="Highlight 2" className="feat-card-img" />
          </TiltCard>
        </div>
      </section>

      {/* --- 6. FOOTER --- */}
      <footer>
        <div className="footer-content">
          <h2 style={{fontSize:'2.5rem', marginBottom:'10px'}}>AB CUSTOM LABELS</h2>
          <p style={{color:'#888', fontSize:'1.1rem'}}>Make it Unforgettable.</p>
          <a href="https://www.instagram.com/abcustomlables?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" style={{color:'#666', textDecoration:'none', display:'flex', alignItems:'center', gap:'8px', marginTop:'20px'}}>
            <FaInstagram size={20}/> Follow on Instagram
          </a>
          <button onClick={() => window.open('https://wa.me/919243858944', '_blank')} className="big-whatsapp-btn">
            <FaWhatsapp size={28} /> Chat on WhatsApp
          </button>
          <p style={{fontSize:'0.8rem', color:'#444', marginTop:'40px', lineHeight:'1.6'}}>&copy; 2025 AB Custom Labels. All rights reserved.<br/>Designed with ❤️ in India</p>
        </div>
      </footer>

      {/* MODAL */}
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
                  <button type="submit" className="primary-btn" style={{width:'100%'}} disabled={isSaving}>{isSaving ? '...' : 'Generate Request'}</button>
                </form>
              ) : (
                <div>
                  <h2 style={{marginBottom:'10px'}}>Request Generated</h2>
                  <button onClick={connectWhatsApp} className="primary-btn" style={{background:'#25D366', width:'100%'}}><FaWhatsapp /> Chat on WhatsApp</button>
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