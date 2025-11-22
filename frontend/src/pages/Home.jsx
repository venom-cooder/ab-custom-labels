import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

// ANIMATIONS
import GridDistortion from '../components/anim/GridDistortion';
import CardSwap, { Card } from '../components/anim/CardSwap';
import LiquidChrome from '../components/anim/LiquidChrome';
import MagneticBtn from '../components/anim/MagneticBtn';

const Home = () => {
  const navigate = useNavigate();
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  return (
    <div className="app-container">
      
      {/* --- NAVBAR --- */}
      <nav>
        <div className="logo" onClick={()=>navigate('/')}>
          <img src="/logo.png" alt="AB" style={{height:'35px'}} />
          AB CUSTOM LABELS
        </div>
        <div className="nav-links">
          <span className="nav-link" onClick={()=>navigate('/gallery/stickers')}>Stickers</span>
          <span className="nav-link" onClick={()=>navigate('/gallery/logos')}>Logos</span>
          <span className="nav-link" onClick={()=>navigate('/gallery/labels')}>Labels</span>
          <span className="nav-link" onClick={()=>navigate('/gallery/cards')}>Cards</span>
        </div>
        <MagneticBtn onClick={() => setOrderModalOpen(true)}>Start Project</MagneticBtn>
      </nav>

      {/* --- 1. GRID DISTORTION HERO --- */}
      <div style={{ width: '100%', height: '650px', position: 'relative', overflow:'hidden' }}>
        <GridDistortion
          imageSrc="/images/Stickers/stickers1.png" // Background Image
          grid={15} mouse={0.1} strength={0.2} relaxation={0.9}
        />
        {/* Overlay Content */}
        <div className="hero-content-overlay">
          <h1 className="hero-title">
            MAKE IT <span style={{color:'var(--accent)'}}>STICK.</span>
          </h1>
          <p style={{fontSize:'1.3rem', color:'#ddd', marginTop:'20px'}}>
            Premium Custom Branding Solutions.
          </p>
        </div>
      </div>

      {/* --- 2. SPLIT SECTION (Green Text + CardSwap) --- */}
      <section className="split-section">
        
        {/* LEFT: Text & Random Button */}
        <div style={{flex:1, zIndex:2, paddingRight:'50px'}}>
          <h2 className="fancy-text">
            Unleash Your <br/> 
            <span className="fancy-green">Creativity.</span>
          </h2>
          <p style={{color:'#888', margin:'30px 0', fontSize:'1.1rem', lineHeight:'1.6'}}>
            From stickers that pop to cards that impress. We craft identities that people remember.
            Don't know what you want? Let fate decide.
          </p>
          <button 
            onClick={() => alert("Randomizer Coming Soon!")} 
            className="random-btn"
          >
            🎲 I'm Feeling Lucky (Random Order)
          </button>
        </div>

        {/* RIGHT: Card Swap Animation */}
        <div style={{flex:1, height:'500px', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <CardSwap cardDistance={60} verticalDistance={70} delay={3000}>
            <Card>
              <h3 style={{marginTop:'10px'}}>Stickers</h3>
              <p style={{color:'#888', fontSize:'0.9rem'}}>Die-cut & Vinyl</p>
            </Card>
            <Card>
              <h3 style={{marginTop:'10px'}}>Logos</h3>
              <p style={{color:'#888', fontSize:'0.9rem'}}>Brand Identity</p>
            </Card>
            <Card>
              <h3 style={{marginTop:'10px'}}>Labels</h3>
              <p style={{color:'#888', fontSize:'0.9rem'}}>Packaging Rolls</p>
            </Card>
          </CardSwap>
        </div>
      </section>

      {/* --- 3. HIGHLIGHTS (Liquid Chrome) --- */}
      <section className="highlights-section">
        {/* Background */}
        <div className="liquidChrome-container">
          <LiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={0.4} amplitude={0.5} interactive={true} />
        </div>

        {/* Content */}
        <div className="floating-cards-wrapper">
          <div className="glass-card">
            <img src="/images/Cards/cards2.png" style={{width:'100%', borderRadius:'12px'}} alt="Card 1"/>
            <h3 style={{marginTop:'20px', color:'white'}}>Premium Business Cards</h3>
            <p style={{color:'#aaa', fontSize:'0.9rem'}}>Matte finish with spot UV.</p>
          </div>
          <div className="glass-card" style={{marginTop:'80px'}}>
            <img src="/images/Cards/cards7.png" style={{width:'100%', borderRadius:'12px'}} alt="Card 2"/>
            <h3 style={{marginTop:'20px', color:'white'}}>Event Passes</h3>
            <p style={{color:'#aaa', fontSize:'0.9rem'}}>Holographic & Secure.</p>
          </div>
        </div>
      </section>

      {/* --- 4. FOOTER (Exact Replica) --- */}
      <footer>
        <div className="footer-grid">
          {/* Col 1 */}
          <div className="footer-col">
            <h3>Products</h3>
            <span className="footer-link" onClick={()=>navigate('/gallery/labels')}>Labels</span>
            <span className="footer-link" onClick={()=>navigate('/gallery/stickers')}>Stickers</span>
            <span className="footer-link" onClick={()=>navigate('/gallery/logos')}>Logo</span>
          </div>
          
          {/* Col 2 */}
          <div className="footer-col">
            <h3>Company</h3>
            <span className="footer-link" onClick={()=>window.scrollTo(0,0)}>About Us</span>
            <span className="footer-link" onClick={()=>navigate('/career')}>Career</span>
            <span className="footer-link">Social News</span>
          </div>

          {/* Col 3 */}
          <div className="footer-col">
            <h3>Support</h3>
            <span className="footer-link">Help</span>
            <span className="footer-link">Contact Us</span>
            <span className="footer-link">Feedback</span>
          </div>

          {/* Col 4 */}
          <div className="footer-col">
            <h3>Important</h3>
            <span className="footer-link">Privacy Policy</span>
            <span className="footer-link">Terms & Condition</span>
            <span className="footer-link">FAQs</span>
          </div>

          {/* Col 5 (Right Aligned Contact) */}
          <div className="footer-col contact-col">
            <div className="contact-row">
              <FaMapMarkerAlt color="#ff4444"/> Location : Katni, MP
            </div>
            <div className="contact-row">
              Phone : +91-9243858944 <FaPhoneAlt color="#aaa" style={{marginLeft:5}}/>
            </div>
            <div className="contact-row">
              Gmail : ab.customlabels@gmail.com <FaEnvelope color="#aaa" style={{marginLeft:5}}/>
            </div>
            
            <div style={{marginTop:'20px', fontSize:'0.9rem', color:'#fff'}}>Follow us on :</div>
            <div className="social-icons">
              <FaInstagram size={32} color="#E1306C" cursor="pointer" onClick={()=>window.open('https://www.instagram.com/abcustomlables','_blank')} />
              <FaWhatsapp size={32} color="#25D366" cursor="pointer" onClick={()=>window.open('https://wa.me/919243858944','_blank')} />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 AB Custom Labels. All rights reserved. | Designed with ❤️ in India
        </div>
      </footer>

      {/* MODAL (Keep existing logic) */}
      {isOrderModalOpen && (
        <div className="modal-overlay" onClick={()=>setOrderModalOpen(false)}>
          <div className="order-modal" onClick={e=>e.stopPropagation()}>
             <h2>Start Project</h2>
             <p style={{color:'black'}}>Contact us on WhatsApp to begin.</p>
             <button className="primary-btn" onClick={()=>window.open('https://wa.me/919243858944','_blank')}>Open WhatsApp</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;