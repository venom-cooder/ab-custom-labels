import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaArrowLeft, FaPenNib, FaWhatsapp, FaTimes, FaLightbulb } from 'react-icons/fa';

const Gallery = () => {
  const { type } = useParams(); 
  const navigate = useNavigate();
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [stage, setStage] = useState('INPUT'); 
  const [customData, setCustomData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- CONFIGURATION ---
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

  // --- HANDLERS ---
  const openCustomForm = () => {
    setSelectedItem({ title: 'My Custom Idea', imgSrc: null });
    setStage('INPUT');
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const data = new FormData(e.target);
    const newOrder = {
      name: data.get('name'),
      contact: data.get('contact'),
      details: `Ref: ${selectedItem?.title || 'Custom Idea'} | Changes: ${data.get('changes')} | Qty: ${data.get('qty')}`,
      type: `Gallery Inquiry (${type})`,
      qty: data.get('qty'),
      date: new Date().toLocaleString()
    };
    setCustomData({ ...newOrder, changes: data.get('changes') });

    try { await axios.post(`${API_URL}/api/orders`, newOrder); } catch(err){ console.error(err); }
    setIsSaving(false); setStage('CONFIRM');
  };

  const handleFinalWhatsApp = () => {
    const phone = "919243858944";
    const msg = `*GALLERY INQUIRY* 🖼\nRef: ${selectedItem?.title || 'Custom Idea'}\n👤: ${customData.name}\n📞: ${customData.contact}\n📝: ${customData.changes}\n🔢: ${customData.qty}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    setSelectedItem(null); setStage('INPUT');
  };

  return (
    <div className="app-container">
      {/* NAVBAR */}
      <nav>
        <div onClick={() => navigate('/')} style={{display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', fontWeight:'600'}}>
          <FaArrowLeft /> Back to Home
        </div>
        <div style={{textTransform:'capitalize', fontWeight:'800', fontSize:'1.1rem'}}>
          AB {type} Archive
        </div>
      </nav>

      {/* --- TOP HEADER (INTERACTIVE TEXT) --- */}
      <div style={{textAlign:'center', padding:'3rem 1.5rem 1rem', maxWidth:'800px', margin:'0 auto'}}>
        <motion.h1 
          initial={{opacity:0, y:10}} 
          animate={{opacity:1, y:0}} 
          style={{fontSize:'2.5rem', fontWeight:'800', textTransform:'capitalize', marginBottom:'10px'}}
        >
          {type} Collection
        </motion.h1>
        
        <motion.p 
          initial={{opacity:0}} 
          animate={{opacity:1}} 
          transition={{delay:0.2}}
          style={{color:'#666', fontSize:'1.1rem', lineHeight:'1.5'}}
        >
          Browse our past work below. <b>Click any image</b> to order the exact same design or customize it to fit your brand.
        </motion.p>
      </div>

      {/* --- MASONRY GRID --- */}
      <div className="masonry-grid">
        {items.map((item) => (
          <motion.div 
            key={item.id} 
            className="masonry-item"
            whileHover={{ scale: 1.02 }}
            onClick={() => { setSelectedItem(item); setStage('INPUT'); }}
          >
            <img 
              src={item.imgSrc} 
              alt={item.title} 
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
            <div className="overlay-btn">Customize <FaPenNib size={10} style={{marginLeft:5}}/></div>
          </motion.div>
        ))}
      </div>

      {/* --- BOTTOM CTA FOR CUSTOM IDEAS --- */}
      <div style={{padding:'4rem 2rem', textAlign:'center', background:'#fafafa', borderTop:'1px solid #eee'}}>
        <h2 style={{marginBottom:'15px'}}>Don't see what you're looking for?</h2>
        <p style={{color:'#666', marginBottom:'30px'}}>We can create anything from scratch. Tell us your idea.</p>
        <button 
          onClick={openCustomForm} 
          className="primary-btn" 
          style={{margin:'0 auto', padding:'15px 30px', fontSize:'1rem'}}
        >
          <FaLightbulb /> Fill Form for Custom Idea
        </button>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
            <motion.div className="order-modal" onClick={(e) => e.stopPropagation()} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <button onClick={() => setSelectedItem(null)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer'}}><FaTimes size={20}/></button>
              
              <div style={{display:'flex', gap:'20px', alignItems:'center', marginBottom:'20px'}}>
                {selectedItem.imgSrc && (
                  <img src={selectedItem.imgSrc} style={{width:'80px', borderRadius:'8px', border:'1px solid #eee'}} />
                )}
                <div>
                  <h3 style={{margin:0}}>Customize</h3>
                  <p style={{fontSize:'0.9rem', color:'#666', margin:0}}>{selectedItem.title}</p>
                </div>
              </div>

              {stage === 'INPUT' ? (
                <form onSubmit={handleGenerate}>
                  <input name="name" required className="clean-input" placeholder="Your Name" />
                  <input name="contact" required className="clean-input" placeholder="WhatsApp Contact Number" />
                  <textarea name="changes" required className="clean-input" rows="3" placeholder="Describe your idea or changes..." />
                  <input name="qty" type="number" required className="clean-input" placeholder="Quantity" />
                  <button type="submit" className="primary-btn" style={{width:'100%'}} disabled={isSaving}>{isSaving ? '...' : 'Generate Request'}</button>
                </form>
              ) : (
                <div>
                  <div className="summary-box">
                    <p><strong>Name:</strong> {customData.name}</p>
                    <p><strong>Qty:</strong> {customData.qty}</p>
                    <p style={{marginTop:'10px', color:'green', fontWeight:'bold'}}>Request Saved!</p>
                  </div>
                  <button onClick={handleFinalWhatsApp} className="primary-btn" style={{background:'#25D366', width:'100%'}}><FaWhatsapp/> Chat on WhatsApp</button>
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