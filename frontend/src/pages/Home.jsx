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

  // States
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [orderStage, setOrderStage] = useState('FORM');
  
  // Logo Animation State
  const [logoIndex, setLogoIndex] = useState(0);
  const logos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % logos.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  // Handlers
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
      
      {/* NAVBAR */}
      <nav>
        <div className="logo" onClick={()=>navigate('/')}>
          <img src="/Logos.png" alt="AB" style={{height:'40px', width:'auto'}} /> 
          AB CUSTOM LABELS
        </div>
        <div className="nav-links">
          <span className="nav-link" onClick={()=>navigate('/gallery/stickers')}>Stickers</span>
          <span className="nav-link" onClick={()=>navigate('/gallery/labels')}>Labels</span>
          <span className="nav-link" onClick={()=>navigate('/gallery/logos')}>Logos</span>
          <span className="nav-link" onClick={()=>navigate('/gallery/cards')}>Cards</span>
        </div>
        <button onClick={() => setOrderModalOpen(true)} className="primary-btn">
          GIVE ORDER
        </button>
      </nav>

      {/* --- 1. HERO SECTION (Static Premium Image) --- */}
      <div className="hero-wrapper">
        {/* The CSS class .hero-static-bg handles the image */}
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

          {/* 4 Rectangular Buttons */}
          <div className="hero-buttons-grid">
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/logos')}><FaPenNib/> LOGOS</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/labels')}><FaTag/> LABELS</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/cards')}><FaIdCard/> CARDS</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/stickers')}><FaShapes/> STICKERS</button>
          </div>
        </div>
      </div>

      {/* --- 2. BENTO GRID (Blocks with Bottom Buttons) --- */}
      <div className="bento-section">
        <div className="bento-grid">
          {/* Custom Order Block */}
          <TiltCard className="card hero-card" onClick={() => setOrderModalOpen(true)}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div style={{zIndex:1}}>
                <div style={{fontSize:'0.8rem', opacity:0.7, marginBottom:'5px'}}>HAVE A UNIQUE IDEA?</div>
                <h2 style={{fontSize:'1.8rem', margin:0}}>Start Custom Order</h2>
              </div>
              <button className="grid-btn" style={{marginTop:'20px'}}>Open Form <FaArrowRight/></button>
            </div>
          </TiltCard>

          {/* Stickers */}
          <TiltCard className="card" onClick={() => navigate('/gallery/stickers')}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div><h3>Stickers</h3> <p style={{fontSize:'0.8rem', color:'#666'}}>Die-cut & Vinyl.</p></div>
              <button className="grid-btn">View Stickers</button>
            </div>
          </TiltCard>

          {/* Labels */}
          <TiltCard className="card" onClick={() => navigate('/gallery/labels')}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div><h3>Labels</h3> <p style={{fontSize:'0.8rem', color:'#666'}}>Rolls & Sheets.</p></div>
              <button className="grid-btn">View Labels</button>
            </div>
          </TiltCard>

          {/* Logos */}
          <TiltCard className="card" onClick={() => navigate('/gallery/logos')}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div><h3>Logos</h3> <p style={{fontSize:'0.8rem', color:'#666'}}>Brand Identity.</p></div>
              <button className="grid-btn">View Logos</button>
            </div>
          </TiltCard>

          {/* Cards */}
          <TiltCard className="card" onClick={() => navigate('/gallery/cards')}>
            <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div><h3>Cards</h3> <p style={{fontSize:'0.8rem', color:'#666'}}>Visiting Cards.</p></div>
              <button className="grid-btn">View Cards</button>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* --- 3. SPLIT SECTION (Cards Right & Down) --- */}
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
          {/* CARD SWAP (Positioned by CSS) */}
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

      {/* --- 4. OUR WORK (Logos Animation) --- */}
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

      {/* --- 5. STICKERS MARQUEE --- */}
      <div style={{overflow:'hidden', whiteSpace:'nowrap', padding:'40px 0', background:'#000', borderTop:'1px solid #222', borderBottom:'1px solid #222'}}>
        <motion.div style={{display:'flex', gap:'50px'}} animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }}>
          {[...Array(10), ...Array(10)].map((_, i) => (
            <img key={i} src={`/images/Stickers/stickers${(i % 10) + 1}.png`} style={{height:'100px', width:'auto', filter:'grayscale(0.3)'}} alt="sticker"/>
          ))}
        </motion.div>
      </div>

      {/* --- 6. HIGHLIGHTS (Liquid Chrome + Stacked Cards) --- */}
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

      {/* --- 7. FOOTER --- */}
      <footer>
        <div className="footer-grid">
          <div className="footer-col">
            <h3>Products</h3>
            <span className="footer-link" onClick={()=>navigate('/gallery/labels')}>Labels</span>
            <span className="footer-link" onClick={()=>navigate('/gallery/stickers')}>Stickers</span>
            <span className="footer-link" onClick={()=>navigate('/gallery/logos')}>Logo</span>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <span className="footer-link" onClick={()=>window.scrollTo(0,0)}>About Us</span>
            <span className="footer-link" onClick={()=>navigate('/career')}>Career</span>
            <span className="footer-link">Social News</span>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <span className="footer-link">Help</span>
            <span className="footer-link">Contact Us</span>
            <span className="footer-link">Feedback</span>
          </div>
          <div className="footer-col contact-col">
            <div className="contact-row"><FaMapMarkerAlt color="var(--accent)"/> Katni, MP</div>
            <div className="contact-row"><FaPhoneAlt/> +91-9243858944</div>
            <div className="contact-row"><FaEnvelope/> ab.customlabels@gmail.com</div>
            <div className="social-icons">
              <FaInstagram size={28} cursor="pointer" onClick={()=>window.open('https://www.instagram.com/abcustomlables','_blank')} />
              <FaWhatsapp size={28} cursor="pointer" onClick={()=>window.open('https://wa.me/919243858944','_blank')} />
            </div>
          </div>
        </div>
        <div className="footer-bottom">© 2025 AB Custom Labels. All rights reserved. | Designed with ❤️ in India</div>
      </footer>

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