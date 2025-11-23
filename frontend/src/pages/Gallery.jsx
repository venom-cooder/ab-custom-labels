import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaArrowLeft, FaPenNib, FaWhatsapp, FaTimes, FaLightbulb, FaExpand } from 'react-icons/fa';

const Gallery = () => {
  const { type } = useParams(); 
  const navigate = useNavigate();
  
  const [selectedItem, setSelectedItem] = useState(null);
  
  // STAGES: 'PREVIEW' -> 'INPUT' -> 'CONFIRM'
  const [stage, setStage] = useState('PREVIEW'); 
  
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
  
  // 1. Open "General" Custom Form (No Image)
  const openCustomForm = () => {
    setSelectedItem({ title: 'My Custom Idea', imgSrc: null });
    setStage('INPUT'); // Skip preview for custom ideas
  };

  // 2. Open Image Preview (From Grid)
  const openPreview = (item) => {
    setSelectedItem(item);
    setStage('PREVIEW');
  };

  // 3. Submit Data to Backend
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
    setIsSaving(false); 
    setStage('CONFIRM');
  };

  // 4. Final WhatsApp Redirect
  const handleFinalWhatsApp = () => {
    const phone = "919243858944";
    const msg = `*GALLERY INQUIRY* 🖼\nRef: ${selectedItem?.title || 'Custom Idea'}\n👤: ${customData.name}\n📞: ${customData.contact}\n📝: ${customData.changes}\n🔢: ${customData.qty}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    setSelectedItem(null); 
  };

  return (
    <div className="app-container">
      
      {/* NAVBAR */}
      <nav>
        <div onClick={() => navigate('/')} style={{display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', fontWeight:'600', color:'#fff'}}>
          <FaArrowLeft /> Back to Home
        </div>
        <div style={{textTransform:'capitalize', fontWeight:'800', fontSize:'1.1rem', color:'#fff'}}>
          AB {type} Archive
        </div>
      </nav>

      {/* HEADER TEXT */}
      <div style={{textAlign:'center', padding:'3rem 1.5rem 1rem', maxWidth:'900px', margin:'0 auto'}}>
        <h1 style={{fontSize:'3rem', fontWeight:'800', textTransform:'capitalize', marginBottom:'15px', color:'#fff'}}>
          {type} Collection
        </h1>
        <p style={{color:'#ccc', fontSize:'1.1rem', lineHeight:'1.6'}}>
          <b>Click any image</b> to preview it in full detail. From there, you can customize it or order the exact design.
        </p>
      </div>

      {/* MASONRY GRID */}
      <div className="masonry-grid">
        {items.map((item) => (
          <motion.div 
            key={item.id} 
            className="masonry-item"
            whileHover={{ scale: 1.02 }}
            onClick={() => openPreview(item)} // Opens Preview Stage
          >
            <img 
              src={item.imgSrc} 
              alt={item.title} 
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
            <div className="overlay-btn"><FaExpand size={12} style={{marginRight:5}}/> Click to Preview</div>
          </motion.div>
        ))}
      </div>

      {/* BOTTOM CTA */}
      <div style={{padding:'4rem 2rem', textAlign:'center', background:'#0a0a0a', borderTop:'1px solid #222'}}>
        <h2 style={{marginBottom:'15px', color:'#fff'}}>Have a unique idea?</h2>
        <p style={{color:'#888', marginBottom:'30px'}}>We can design anything from scratch.</p>
        <button onClick={openCustomForm} className="primary-btn" style={{margin:'0 auto', padding:'15px 30px', fontSize:'1rem'}}>
          <FaLightbulb /> Fill Form for Custom Idea
        </button>
      </div>

      {/* --- MODAL SYSTEM --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
            <motion.div 
              className="order-modal" 
              onClick={(e) => e.stopPropagation()} 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <button onClick={() => setSelectedItem(null)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer', zIndex:10}}><FaTimes size={24} color="#fff"/></button>
              
              {/* --- STAGE 1: PREVIEW IMAGE --- */}
              {stage === 'PREVIEW' && (
                <div style={{textAlign:'center'}}>
                  <h3 style={{marginBottom:'20px', color:'#fff'}}>{selectedItem.title}</h3>
                  <div style={{
                    background:'#111', padding:'10px', borderRadius:'12px', border:'1px solid #333',
                    maxHeight:'60vh', overflow:'hidden', display:'flex', justifyContent:'center', alignItems:'center'
                  }}>
                    <img 
                      src={selectedItem.imgSrc} 
                      style={{maxWidth:'100%', maxHeight:'400px', objectFit:'contain', borderRadius:'8px'}} 
                      alt="Preview"
                    />
                  </div>
                  <div style={{marginTop:'25px', display:'flex', flexDirection:'column', gap:'10px'}}>
                    <button 
                      onClick={() => setStage('INPUT')} 
                      className="primary-btn" 
                      style={{width:'100%', fontSize:'1rem'}}
                    >
                      <FaPenNib /> Customize / Order This
                    </button>
                    <button onClick={() => setSelectedItem(null)} style={{background:'transparent', border:'none', color:'#888', cursor:'pointer', marginTop:'10px'}}>
                      Close Preview
                    </button>
                  </div>
                </div>
              )}

              {/* --- STAGE 2: INPUT FORM --- */}
              {stage === 'INPUT' && (
                <form onSubmit={handleGenerate}>
                  {/* Thumbnail in Header */}
                  <div style={{display:'flex', gap:'15px', alignItems:'center', marginBottom:'20px', borderBottom:'1px solid #333', paddingBottom:'15px'}}>
                    {selectedItem.imgSrc && <img src={selectedItem.imgSrc} style={{width:'50px', borderRadius:'6px'}} />}
                    <div>
                      <h3 style={{margin:0, color:'#fff', fontSize:'1.1rem'}}>Order Details</h3>
                      <p style={{margin:0, fontSize:'0.8rem', color:'#888'}}>{selectedItem.title}</p>
                    </div>
                  </div>

                  <input name="name" required className="clean-input" placeholder="Your Name" />
                  <input name="contact" required className="clean-input" placeholder="WhatsApp Contact Number" />
                  <textarea name="changes" required className="clean-input" rows="3" placeholder="Describe changes (e.g. 'Change color to blue', 'Same as image')..." />
                  <input name="qty" type="number" required className="clean-input" placeholder="Quantity (e.g. 100)" />
                  
                  <button type="submit" className="primary-btn" style={{width:'100%'}} disabled={isSaving}>
                    {isSaving ? 'Processing...' : 'Generate Request'}
                  </button>
                </form>
              )}

              {/* --- STAGE 3: CONFIRMATION --- */}
              {stage === 'CONFIRM' && (
                <div>
                  <div className="summary-box">
                    <p><strong>Name:</strong> {customData.name}</p>
                    <p><strong>Qty:</strong> {customData.qty}</p>
                    <p style={{marginTop:'10px', color:'#25D366', fontWeight:'bold'}}>Request Saved!</p>
                  </div>
                  <p style={{textAlign:'center', color:'#888', fontSize:'0.9rem', margin:'20px 0'}}>
                    Click below to send these details to us on WhatsApp and finalize the price.
                  </p>
                  <button onClick={handleFinalWhatsApp} className="primary-btn" style={{background:'#25D366', width:'100%'}}>
                    <FaWhatsapp size={20}/> Chat on WhatsApp
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

export default Gallery;