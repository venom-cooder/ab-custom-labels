import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; 
import { FaArrowRight, FaBoxOpen, FaTimes, FaWhatsapp, FaStar } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  
  // --- STATE MANAGEMENT ---
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [orderStage, setOrderStage] = useState('FORM'); // 'FORM' -> 'SUMMARY'
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Vercel/Render API URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- 1. HANDLE FORM SUBMISSION ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const data = new FormData(e.target);
    
    // Create Order Object
    const newOrder = {
      name: data.get('name'),
      contact: data.get('contact'),
      details: data.get('details'),
      type: 'Home Page Request', // Helps identify source in Admin
      date: new Date().toLocaleString()
    };

    setFormData(newOrder);

    // Send to Backend (Cloud DB)
    try {
      await axios.post(`${API_URL}/api/orders`, newOrder);
      console.log("Order saved to Cloud DB");
    } catch (err) {
      console.error("Failed to save order:", err);
    }

    setIsSaving(false);
    setOrderStage('SUMMARY');
  };

  // --- 2. CONNECT TO WHATSAPP ---
  const connectWhatsApp = () => {
    const msg = `*NEW PROJECT INQUIRY - AB CUSTOM LABELS* 🚀\n\n` +
                `👤 Name: ${formData.name}\n` +
                `📞 Contact: ${formData.contact}\n` +
                `📝 Request: ${formData.details}`;
    
    window.open(`https://wa.me/919243858944?text=${encodeURIComponent(msg)}`, '_blank');
    
    // Reset
    setOrderModalOpen(false);
    setOrderStage('FORM');
  };

  // --- ANIMATION VARIANTS ---
  const bentoContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const bentoItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 50 }
    }
  };

  const scrollUp = { 
    animate: { y: [0, -500], transition: { repeat: Infinity, duration: 15, ease: "linear" } } 
  };
  const scrollDown = { 
    animate: { y: [-500, 0], transition: { repeat: Infinity, duration: 18, ease: "linear" } } 
  };

  return (
    <div className="app-container">
      {/* --- NAVBAR --- */}
      <nav>
        <div className="logo">AB CUSTOM LABELS</div>
        <button 
          className="primary-btn" 
          style={{width:'auto', padding:'10px 24px', fontSize: '0.9rem'}} 
          onClick={() => setOrderModalOpen(true)}
        >
          Start Project
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">We Design Identities<br/>That Stick.</h1>
          <p className="hero-desc">
            <b>AB CUSTOM LABELS</b> is a premium design house in Katni. We don't just print; we engineer branding assets. 
            Waterproof labels, holographic stickers, and logos that define your product's value.
          </p>
        </motion.div>
      </section>

      {/* --- BENTO GRID NAVIGATION --- */}
      <div className="bento-section">
        <motion.div 
          className="bento-grid"
          variants={bentoContainer}
          initial="hidden"
          animate="visible"
        >
          
          {/* 1. HERO CARD (Starts Order) */}
          <motion.div 
            className="card hero-card" 
            variants={bentoItem}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOrderModalOpen(true)}
          >
            <div className="tag">Start Here</div>
            <div>
              <h2 style={{fontSize:'2rem', marginBottom:'10px'}}>Custom Order.</h2>
              <p style={{opacity: 0.8}}>Have a specific idea? Describe it, and we'll build it.</p>
            </div>
            <div style={{marginTop:'20px', display:'flex', alignItems:'center', gap:'10px', fontWeight:'bold'}}>
              BEGIN PROCESS <FaArrowRight />
            </div>
          </motion.div>

          {/* 2. STICKERS (Gallery) */}
          <motion.div 
            className="card tall-card" 
            variants={bentoItem}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/gallery/stickers')}
          >
            <div className="tag">Gallery</div>
            <h3>Stickers</h3>
            <p style={{color:'#666', fontSize:'0.9rem'}}>Die-cut & Vinyl</p>
            <div style={{marginTop:'auto', fontSize:'3rem', color:'#ccc', display:'flex', justifyContent:'center'}}>
              <FaBoxOpen />
            </div>
          </motion.div>

          {/* 3. LOGOS */}
          <motion.div 
            className="card" 
            variants={bentoItem}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/gallery/logos')}
          >
            <h3>Logos</h3>
            <p style={{color:'#666'}}>Identity Design</p>
          </motion.div>

          {/* 4. LABELS */}
          <motion.div 
            className="card" 
            variants={bentoItem}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/gallery/labels')}
          >
            <h3>Labels</h3>
            <p style={{color:'#666'}}>Product Packaging</p>
          </motion.div>
          
          {/* 5. REVIEWS (Added back for layout balance) */}
          <motion.div className="card" variants={bentoItem}>
             <h3>4.9 <FaStar color="#FFD700" size={15}/></h3>
             <p style={{color:'#666'}}>Trusted Quality</p>
          </motion.div>

        </motion.div>
      </div>

      {/* --- VERTICAL SCROLL SHOWCASE --- */}
      <section className="scroll-showcase">
        <h3 style={{textAlign:'center', marginBottom:'30px', color:'#999', fontSize:'0.8rem', letterSpacing:'2px', textTransform:'uppercase'}}>
          Recent Production
        </h3>
        <div className="scroll-container">
          {/* Col 1: Up */}
          <motion.div className="scroll-col" variants={scrollUp} animate="animate">
            {[1,2,3,4].map(n => <div key={n} className="showcase-item">Ref {n}</div>)}
          </motion.div>
          
          {/* Col 2: Down */}
          <motion.div className="scroll-col" style={{marginTop:'-50px'}} variants={scrollDown} animate="animate">
            {[5,6,7,8].map(n => <div key={n} className="showcase-item">Ref {n}</div>)}
          </motion.div>
          
          {/* Col 3: Up (Hidden on Mobile via CSS) */}
          <motion.div className="scroll-col" variants={scrollUp} animate="animate">
            {[9,10,11,12].map(n => <div key={n} className="showcase-item">Ref {n}</div>)}
          </motion.div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="faq-section">
        <h2 style={{textAlign:'center', marginBottom:'40px'}}>Frequently Asked Questions</h2>
        <div className="faq-item">
          <div className="faq-q">What is the minimum order quantity?</div>
          <div className="faq-a">For stickers and labels, we start as low as 50 pieces. Logos are one-time design fees.</div>
        </div>
        <div className="faq-item">
          <div className="faq-q">How do I customize a design?</div>
          <div className="faq-a">Use the "Start Project" button or browse our gallery to select a reference style.</div>
        </div>
        <div className="faq-item">
          <div className="faq-q">Do you ship pan-India?</div>
          <div className="faq-a">Yes. We use premium courier partners to ensure your assets arrive safely within 3-5 days.</div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer>
        <div className="footer-content">
          <h2 style={{fontSize:'2rem'}}>AB CUSTOM LABELS</h2>
          <p style={{color:'#888'}}>Make it Unforgettable.</p>
          
          <div style={{display:'flex', gap:'20px', margin:'20px 0', flexWrap:'wrap', justifyContent:'center'}}>
            <a href="#" style={{color:'#666', textDecoration:'none'}}>Instagram</a>
            <a href="#" style={{color:'#666', textDecoration:'none'}}>Privacy Policy</a>
            <a href="#" style={{color:'#666', textDecoration:'none'}}>Terms</a>
          </div>

          <button 
            onClick={() => window.open('https://wa.me/919243858944', '_blank')}
            className="primary-btn" 
            style={{background:'white', color:'black', maxWidth:'300px', marginTop: '20px'}}
          >
            <FaWhatsapp /> Direct WhatsApp Contact
          </button>
          
          <p style={{fontSize:'0.8rem', color:'#444', marginTop:'30px'}}>&copy; 2025 AB Custom Labels. Katni, MP.</p>
        </div>
      </footer>

      {/* --- START PROJECT MODAL --- */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              className="order-modal" 
              initial={{scale:0.9, opacity:0}} 
              animate={{scale:1, opacity:1}}
              exit={{scale:0.9, opacity:0}}
            >
              <button 
                onClick={() => setOrderModalOpen(false)} 
                style={{position:'absolute', top:'20px', right:'20px', border:'none', background:'transparent', cursor:'pointer'}}
              >
                <FaTimes size={20} color="#888"/>
              </button>

              {orderStage === 'FORM' ? (
                <form onSubmit={handleFormSubmit}>
                  <h2 style={{marginBottom:'20px'}}>Start Your Project</h2>
                  
                  <label style={{fontSize:'0.9rem', fontWeight:'600', display:'block', marginBottom:'5px'}}>Brand / Name</label>
                  <input name="name" required className="clean-input" placeholder="Ex: Urban Hype" />
                  
                  <label style={{fontSize:'0.9rem', fontWeight:'600', display:'block', marginBottom:'5px'}}>WhatsApp Contact</label>
                  <input name="contact" required className="clean-input" placeholder="+91 00000 00000" />
                  
                  <label style={{fontSize:'0.9rem', fontWeight:'600', display:'block', marginBottom:'5px'}}>Requirements</label>
                  <textarea name="details" required className="clean-input" rows="4" placeholder="I need 100 gold foil stickers..." />
                  
                  <button type="submit" className="primary-btn" disabled={isSaving}>
                    {isSaving ? 'Processing...' : 'Generate Request'}
                  </button>
                </form>
              ) : (
                /* SUMMARY VIEW */
                <div>
                  <h2 style={{marginBottom:'10px'}}>Request Generated</h2>
                  <div className="summary-box">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Contact:</strong> {formData.contact}</p>
                    <p><strong>Request:</strong> {formData.details}</p>
                  </div>
                  
                  <p style={{textAlign:'center', fontSize:'0.9rem', color:'#666', marginBottom:'20px'}}>
                    Your request has been saved. Connect to WhatsApp for pricing?
                  </p>
                  
                  <button onClick={connectWhatsApp} className="primary-btn" style={{background:'#25D366'}}>
                    <FaWhatsapp /> Yes, Chat on WhatsApp
                  </button>
                  
                  <button onClick={() => setOrderModalOpen(false)} className="primary-btn secondary-btn">
                    No, Cancel
                  </button>
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