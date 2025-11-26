import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaArrowLeft, FaPenNib, FaWhatsapp, FaTimes, FaLightbulb, FaSearch } from 'react-icons/fa';

const Gallery = () => {
  const { type } = useParams(); // "stickers", "logos", "labels", "cards"
  const navigate = useNavigate();
  
  // --- STATE ---
  const [items, setItems] = useState([]); // Stores data from Backend
  const [loading, setLoading] = useState(true);
  const [labelFilter, setLabelFilter] = useState('all'); // For Label Subcategories

  const [selectedItem, setSelectedItem] = useState(null);
  const [stage, setStage] = useState('PREVIEW'); 
  const [customData, setCustomData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- 1. FETCH FROM BACKEND (No Local Files) ---
  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        // Ask backend for items matching the current URL category (e.g., ?category=stickers)
        const res = await axios.get(`${API_URL}/api/products?category=${type}`);
        setItems(res.data);
      } catch (err) {
        console.error("Failed to load gallery", err);
      }
      setLoading(false);
    };
    
    fetchGallery();
    setLabelFilter('all'); // Reset sub-filter when category changes
  }, [type, API_URL]);

  // --- 2. CLIENT-SIDE FILTER (For Labels only) ---
  const displayItems = items.filter(item => {
    // Double-check category strictness (optional, as backend already filters)
    if (item.category !== type) return false;

    // Logic for Labels subcategories
    if (type === 'labels') {
      if (labelFilter === 'all') return true;
      return item.subcategory === labelFilter;
    }
    return true;
  });

  // --- HANDLERS ---
  const openCustomForm = () => {
    setSelectedItem({ title: 'My Custom Idea', imageUrl: null });
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

    // Send Order to Backend
    try { 
      await axios.post(`${API_URL}/api/orders`, newOrder); 
    } catch(err){ 
      console.error(err); 
    }

    setIsSaving(false); 
    setStage('CONFIRM');
  };

  const handleFinalWhatsApp = () => {
    const phone = "919243858944";
    const msg = `*GALLERY INQUIRY* 🖼\n\nRef: ${selectedItem?.title || 'Custom Idea'}\n👤: ${customData.name}\n📞: ${customData.contact}\n📝: ${customData.changes}\n🔢: ${customData.qty}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    setSelectedItem(null); 
    setStage('INPUT');
  };

  return (
    <div className="app-container">
      
      {/* HEADER TEXT */}
      <div style={{textAlign:'center', padding:'3rem 1.5rem 1rem', maxWidth:'900px', margin:'0 auto'}}>
        <h1 style={{fontSize:'3rem', fontWeight:'800', textTransform:'capitalize', marginBottom:'15px', color:'#fff'}}>
          {type} Collection
        </h1>
        <p style={{color:'#ccc', fontSize:'1.1rem', lineHeight:'1.6'}}>
          <b>Click any image</b> to preview details or customize it. 
          {type === 'labels' && <span style={{color:'#E5C76B'}}> Use filters below to find specific shapes.</span>}
        </p>
      </div>

      {/* --- LABEL FILTERS (Only show for Labels) --- */}
      {type === 'labels' && (
        <div style={{display:'flex', justifyContent:'center', gap:'10px', flexWrap:'wrap', marginBottom:'30px', padding:'0 20px'}}>
          {['all', 'circle', 'oval', 'bottle', 'rounded', 'jar'].map((shape) => (
            <button
              key={shape}
              onClick={() => setLabelFilter(shape)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #333',
                background: labelFilter === shape ? '#E5C76B' : '#111',
                color: labelFilter === shape ? '#000' : '#888',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: 'bold',
                transition: '0.2s'
              }}
            >
              {shape}
            </button>
          ))}
        </div>
      )}

      {/* --- MASONRY GRID (Backend Data) --- */}
      <div className="masonry-grid">
        {loading ? (
          <div style={{textAlign:'center', width:'100%', gridColumn:'span 5', padding:'50px'}}>
            <p style={{color:'#666'}}>Loading from Cloud...</p>
          </div>
        ) : displayItems.length === 0 ? (
          <div style={{textAlign:'center', padding:'50px', color:'#666', gridColumn:'span 5'}}>
            <FaSearch size={30} style={{marginBottom:'10px'}}/>
            <p>No items found in this category.</p>
            <p style={{fontSize:'0.8rem'}}>Check Admin Panel to upload new items.</p>
          </div>
        ) : (
          displayItems.map((item) => (
            <motion.div 
              key={item._id} 
              className="masonry-item"
              whileHover={{ scale: 1.02 }}
              onClick={() => { setSelectedItem(item); setStage('PREVIEW'); }}
            >
              {/* IMAGE FROM CLOUDINARY */}
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }} 
              />
              <div className="overlay-btn">
                 <span style={{textTransform:'capitalize'}}>{item.subcategory ? item.subcategory : 'View'}</span> 
                 <FaPenNib size={10} style={{marginLeft:5}}/>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* BOTTOM CTA */}
      <div style={{padding:'4rem 2rem', textAlign:'center', background:'#0a0a0a', borderTop:'1px solid #222'}}>
        <h2 style={{marginBottom:'15px', color:'#fff'}}>Have a unique idea?</h2>
        <p style={{color:'#888', marginBottom:'30px'}}>We can create anything from scratch.</p>
        <button 
          onClick={openCustomForm} 
          className="primary-btn" 
          style={{margin:'0 auto', padding:'15px 30px', fontSize:'1rem'}}
        >
          <FaLightbulb /> Fill Form for Custom Idea
        </button>
      </div>

      {/* --- MODAL SYSTEM --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
            <motion.div className="order-modal" onClick={(e) => e.stopPropagation()} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <button onClick={() => setSelectedItem(null)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer', zIndex:10}}><FaTimes size={24} color="#fff"/></button>
              
              {/* STAGE 1: PREVIEW */}
              {stage === 'PREVIEW' && (
                <div style={{textAlign:'center'}}>
                  {selectedItem.imageUrl && (
                    <img src={selectedItem.imageUrl} style={{maxWidth:'100%', maxHeight:'400px', borderRadius:'8px', marginBottom:'20px', border:'1px solid #333'}} />
                  )}
                  <h2 style={{color:'#fff', marginBottom:'5px'}}>{selectedItem.title}</h2>
                  {selectedItem.description && (
                    <p style={{color:'#888', fontSize:'0.9rem', marginBottom:'25px', lineHeight:'1.5'}}>
                      {selectedItem.description}
                    </p>
                  )}
                  <button onClick={() => setStage('INPUT')} className="primary-btn" style={{width:'100%'}}>
                    <FaPenNib/> Customize / Order
                  </button>
                </div>
              )}

              {/* STAGE 2: INPUT FORM */}
              {stage === 'INPUT' && (
                <form onSubmit={handleGenerate}>
                   <div style={{marginBottom:'20px', borderBottom:'1px solid #333', paddingBottom:'10px'}}>
                      <h3 style={{color:'#fff', margin:0}}>Order Details</h3>
                      <span style={{color:'#E5C76B', fontSize:'0.8rem'}}>{selectedItem.title}</span>
                   </div>
                  <input name="name" required className="clean-input" placeholder="Your Name" />
                  <input name="contact" required className="clean-input" placeholder="WhatsApp Contact Number" />
                  <textarea name="changes" required className="clean-input" rows="3" placeholder="Describe changes (e.g. 'Change color to blue')..." />
                  <input name="qty" type="number" required className="clean-input" placeholder="Quantity (e.g. 100)" />
                  <button type="submit" className="primary-btn" disabled={isSaving}>{isSaving ? 'Processing...' : 'Generate Request'}</button>
                </form>
              )}

              {/* STAGE 3: CONFIRMATION */}
              {stage === 'CONFIRM' && (
                <div>
                  <div className="summary-box">
                    <p><strong>Name:</strong> {customData.name}</p>
                    <p><strong>Qty:</strong> {customData.qty}</p>
                    <p style={{marginTop:'10px', color:'#25D366', fontWeight:'bold'}}>Request Saved!</p>
                  </div>
                  <button onClick={handleFinalWhatsApp} className="primary-btn" style={{background:'#25D366', width:'100%'}}>
                    <FaWhatsapp/> Chat on WhatsApp
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