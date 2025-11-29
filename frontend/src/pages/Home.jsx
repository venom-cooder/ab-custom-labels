import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaArrowRight, FaTimes, FaWhatsapp, FaShapes, FaTag, FaIdCard, FaPenNib, FaMagic, FaCheckCircle, FaStar } from 'react-icons/fa';

// Animation Components
import TiltCard from '../components/anim/TiltCard';
import ChangingImage from '../components/anim/ChangingImage';
import AuroraBackground from '../components/anim/AuroraBackground'; // Imported for AI Section

const Home = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [orderStage, setOrderStage] = useState('FORM');

  // --- HERO TEXT ANIMATION STATE ---
  const [textIndex, setTextIndex] = useState(0);
  const heroPhrases = [
    "We Build Identity",
    "We Shape Memories",
    "We Create Stories",
    "We Add Emotion"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % heroPhrases.length);
    }, 2000); // Change every 2 seconds
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
      
      {/* 1. HERO SECTION */}
      <div className="distortion-wrapper" style={{ height: '80vh', minHeight: '600px' }}>
        {/* BACKGROUND IMAGE */}
        <div 
          className="hero-static-bg" 
          style={{ 
            backgroundImage: "url('/images/Home.png')",
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundSize: 'cover', backgroundPosition: 'center',
            // Darkened to 0.5 so white text is visible without a box
            filter: 'brightness(0.5)', 
            zIndex: 0
          }}
        ></div>
        
        <div className="hero-overlay" style={{ paddingTop: '0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* STATIC MAIN TITLE */}
          <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '10px', color: 'white', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
            We Don’t Print Labels…
          </h1>

          {/* ANIMATED SUBTITLES */}
          <div style={{ height: '60px', marginBottom: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={textIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800', 
                  // Use brand gradient for animated text
                  background: 'var(--gradient-primary)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  margin: 0
                }}
              >
                → {heroPhrases[textIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>
          
          {/* DESCRIPTION */}
          <p className="hero-desc" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto 50px auto', fontSize: '1.2rem', lineHeight: '1.6', fontWeight: '500', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            AB Custom Labels is your design partner. Waterproof labels, stickers, and premium branding assets delivered to your door.
          </p>

          {/* 4 BUTTONS */}
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

      {/* 3. BRAND IDENTITY BUILDER AI (NEW SECTION) */}
      <section style={{ position: 'relative', minHeight: '600px', overflow: 'hidden', display: 'flex', alignItems: 'center', background:'#fff' }}>
        {/* Aurora Background for Premium Feel */}
        <AuroraBackground />
        
        <div style={{ 
          position: 'relative', zIndex: 1, 
          display: 'grid', gridTemplateColumns: '1fr 1fr', 
          maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', 
          gap: '60px', alignItems: 'center' 
        }}>
          
          {/* Left: Description */}
          <div style={{ textAlign: 'left' }}>
            <span style={{ 
              background: 'rgba(139, 61, 255, 0.1)', color: 'var(--primary)', 
              padding: '8px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '700', 
              marginBottom: '20px', display: 'inline-block', letterSpacing: '1px'
            }}>
              NEW INTELLIGENCE
            </span>
            
            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '20px', color: '#111', lineHeight: '1.1' }}>
              Meet Your <br/>
              <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Brand Identity Builder AI
              </span>
            </h2>
            
            <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6', marginBottom: '30px' }}>
              Not sure if your design is print-ready? Our AI analyzes your brand colors, shapes, and typography to give you a <strong>Professional Print Score</strong>.
              <br/><br/>
              It doesn't just rate; it recommends the perfect material (Gold Foil, Matte, Vinyl) to make your brand stand out on the shelf.
            </p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333', fontWeight: '600' }}>
                <FaCheckCircle color="#25D366" /> Instant Design Rating
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333', fontWeight: '600' }}>
                <FaMagic color="var(--primary)" /> Material Suggestions
              </div>
            </div>
          </div>

          {/* Right: Action Card */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TiltCard 
              className="ai-action-card"
              style={{
                width: '100%', maxWidth: '450px', 
                background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.8)', borderRadius: '24px',
                padding: '40px', boxShadow: '0 20px 60px rgba(139, 61, 255, 0.15)',
                textAlign: 'center'
              }}
            >
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '50%', 
                background: 'var(--gradient-primary)', margin: '0 auto 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(139, 61, 255, 0.3)'
              }}>
                <FaStar size={35} color="white" />
              </div>
              
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#111', marginBottom: '10px' }}>
                Check Your Brand Score
              </h3>
              <p style={{ color: '#666', marginBottom: '30px' }}>
                Use our AI Studio to generate and rate your next label design concept in seconds.
              </p>
              
              <button 
                onClick={() => navigate('/ai-design')}
                className="primary-btn" 
                style={{ width: '100%', fontSize: '1rem', padding: '16px' }}
              >
                Launch AI Studio <FaArrowRight style={{ marginLeft: '8px' }} />
              </button>
            </TiltCard>
          </div>

        </div>
      </section>

      {/* 4. BENTO GRID */}
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

      {/* MODAL */}
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
                  <textarea name="details" required className="clean-input" rows="4" placeholder="Describe your idea..." />
                  
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