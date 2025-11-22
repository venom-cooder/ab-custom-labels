import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaArrowLeft, FaPenNib, FaWhatsapp, FaTimes, FaLightbulb } from 'react-icons/fa';

// IMPORT FOOTER
import Footer from '../components/Footer';

const Gallery = () => {
  const { type } = useParams(); 
  const navigate = useNavigate();
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [stage, setStage] = useState('INPUT'); 
  const [customData, setCustomData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const config = {
    stickers: { folder: 'Stickers', count: 10, prefix: 'stickers' }, 
    logos:    { folder: 'Logos',    count: 10, prefix: 'logo' },     
    labels:   { folder: 'Labels',   count: 29, prefix: 'labels' },   
    cards:    { folder: 'Cards',    count: 9,  prefix: 'cards' }     
  };

  const currentConfig = config[type ? type.toLowerCase() : ''] || { folder: '', count: 0, prefix: '' };

  const items = Array.from({ length: currentConfig.count }, (_, i) => ({
    id: i + 1,
    title: `${type.toUpperCase()} #${i + 1}`,
    imgSrc: `/images/${currentConfig.folder}/${currentConfig.prefix}${i + 1}.png`
  }));

  // ... (Handlers for generate/whatsapp remain same as before) ...
  const openCustomForm = () => { setSelectedItem({ title: 'My Custom Idea', imgSrc: null }); setStage('INPUT'); };
  const handleGenerate = async (e) => { /*...*/ e.preventDefault(); setIsSaving(true); /* logic */ setIsSaving(false); setStage('CONFIRM'); };
  const handleFinalWhatsApp = () => { /*...*/ window.open('https://wa.me/919243858944', '_blank'); setSelectedItem(null); setStage('INPUT'); };

  return (
    <div className="app-container">
      <nav>
        <div onClick={() => navigate('/')} style={{display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', fontWeight:'600', color:'#fff'}}>
          <FaArrowLeft /> Back to Home
        </div>
        <div style={{textTransform:'capitalize', fontWeight:'800', fontSize:'1.1rem', color:'#fff'}}>
          AB {type} Archive
        </div>
      </nav>

      <div style={{textAlign:'center', padding:'3rem 1.5rem 1rem', maxWidth:'900px', margin:'0 auto'}}>
        <h1 style={{fontSize:'3rem', fontWeight:'800', textTransform:'capitalize', marginBottom:'15px', color:'#fff'}}>
          {type} Collection
        </h1>
        <p style={{color:'#ccc', fontSize:'1.1rem', lineHeight:'1.6'}}>
          <b>Click any image</b> to order the exact same design or customize it.
          <br />
          Have a unique idea? Click the button below!
        </p>
      </div>

      <div className="masonry-grid">
        {items.map((item) => (
          <motion.div 
            key={item.id} 
            className="masonry-item"
            whileHover={{ scale: 1.02 }}
            onClick={() => { setSelectedItem(item); setStage('INPUT'); }}
          >
            <img src={item.imgSrc} alt={item.title} loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
            <div className="overlay-btn">Customize <FaPenNib size={10} style={{marginLeft:5}}/></div>
          </motion.div>
        ))}
      </div>

      <div style={{padding:'4rem 2rem', textAlign:'center', background:'#0a0a0a', borderTop:'1px solid #222'}}>
        <h2 style={{marginBottom:'15px', color:'#fff'}}>Don't see what you're looking for?</h2>
        <p style={{color:'#888', marginBottom:'30px'}}>We can create anything from scratch.</p>
        <button onClick={openCustomForm} className="primary-btn" style={{margin:'0 auto', padding:'15px 30px', fontSize:'1rem'}}>
          <FaLightbulb /> Fill Form for Custom Idea
        </button>
      </div>

      {/* --- FOOTER COMPONENT --- */}
      <Footer />

      {/* --- MODAL (Keeping existing modal logic) --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
            <motion.div className="order-modal" onClick={(e) => e.stopPropagation()} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <button onClick={() => setSelectedItem(null)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer'}}><FaTimes size={20} color="#fff"/></button>
              {stage === 'INPUT' ? (
                <form onSubmit={handleGenerate}>
                  <input name="name" required className="clean-input" placeholder="Your Name" />
                  <input name="contact" required className="clean-input" placeholder="WhatsApp Contact Number" />
                  <textarea name="changes" required className="clean-input" rows="3" placeholder="Describe changes..." />
                  <input name="qty" type="number" required className="clean-input" placeholder="Quantity" />
                  <button type="submit" className="primary-btn" disabled={isSaving}>{isSaving ? '...' : 'Generate Request'}</button>
                </form>
              ) : (
                <div>
                  <div className="summary-box"><p>Request Saved!</p></div>
                  <button onClick={handleFinalWhatsApp} className="primary-btn" style={{background:'#25D366'}}><FaWhatsapp/> Chat on WhatsApp</button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;