import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaPenNib, FaWhatsapp, FaTimes, FaLightbulb, FaSearch, FaArrowRight } from 'react-icons/fa';

const Gallery = () => {
  const { type } = useParams(); 
  
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [labelFilter, setLabelFilter] = useState('all'); 

  const [selectedItem, setSelectedItem] = useState(null);
  const [stage, setStage] = useState('PREVIEW'); 
  const [customData, setCustomData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/products?category=${type}`);
        setItems(res.data);
      } catch (err) {
        console.error("Failed to load gallery", err);
      }
      setLoading(false);
    };
    fetchGallery();
    setLabelFilter('all'); 
  }, [type, API_URL]);

  // --- FILTER LOGIC ---
  const displayItems = items.filter(item => {
    if (item.category !== type) return false;
    if (type === 'labels') {
      if (labelFilter === 'all') return true;
      return item.subcategory === labelFilter;
    }
    return true;
  });

  // --- HANDLERS ---
  const openCustomForm = () => { setSelectedItem({ title: 'My Custom Idea', imageUrl: null }); setStage('INPUT'); };
  
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
      
      {/* NAVBAR REMOVED (Handled Globally) */}

      {/* HEADER */}
      <div style={{textAlign:'center', padding:'4rem 1.5rem 2rem', maxWidth:'900px', margin:'0 auto'}}>
        <h1 style={{fontSize:'3rem', fontWeight:'800', textTransform:'capitalize', marginBottom:'15px', color:'var(--text-main)'}}>
          {type} Collection
        </h1>
        <p style={{color:'var(--text-body)', fontSize:'1.1rem', lineHeight:'1.6'}}>
          <b>Click any image</b> to customize. 
          {type === 'labels' && " Use the filters below to find your shape."}
        </p>
      </div>

      {/* LABEL FILTERS */}
      {type === 'labels' && (
        <div style={{display:'flex', justifyContent:'center', gap:'10px', flexWrap:'wrap', marginBottom:'30px', padding:'0 20px'}}>
          {['all', 'circle', 'oval', 'bottle', 'rounded', 'jar'].map((shape) => (
            <button
              key={shape}
              onClick={() => setLabelFilter(shape)}
              style={{
                padding: '8px 16px', borderRadius: '20px', border: '1px solid #eee',
                background: labelFilter === shape ? 'var(--primary)' : '#fff',
                color: labelFilter === shape ? '#fff' : '#666',
                cursor: 'pointer', textTransform: 'capitalize', fontWeight: '600', transition: '0.2s'
              }}
            >
              {shape}
            </button>
          ))}
        </div>
      )}

      {/* --- GALLERY GRID (3 COLUMNS, CARD STYLE) --- */}
      <div className="masonry-grid">
        {loading ? (
          <p style={{color:'#666', width:'100%', textAlign:'center'}}>Loading Collection...</p>
        ) : displayItems.length === 0 ? (
          <div style={{textAlign:'center', padding:'40px', color:'#444', gridColumn:'span 3'}}>
             <FaSearch size={30} style={{marginBottom:'10px'}}/>
             <p>No items found.</p>
          </div>
        ) : (
          displayItems.map((item) => (
            <motion.div 
              key={item._id} 
              className="masonry-item"
              whileHover={{ translateY: -5 }}
              style={{display: 'flex', flexDirection: 'column', background: '#fff', border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden'}}
            >
              {/* IMAGE SECTION */}
              <div 
                style={{
                  width: '100%', 
                  height: '220px', 
                  background: '#f8f9fa', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee'
                }}
                onClick={() => { setSelectedItem(item); setStage('PREVIEW'); }}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  loading="lazy"
                  style={{
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain', 
                    padding: '15px'
                  }}
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
              </div>
              
              {/* INFO & BUTTON SECTION */}
              <div style={{padding: '20px', textAlign: 'left'}}>
                <h4 style={{fontSize: '1.1rem', marginBottom: '5px', color: 'var(--text-main)', fontWeight: '700'}}>
                  {item.title}
                </h4>
                
                <div style={{color: '#888', fontSize: '0.85rem', marginBottom: '15px', fontWeight: '500'}}>
                  Customizable • Premium
                </div>

                <button 
                  style={{
                    width: '100%', 
                    padding: '12px', 
                    background: 'var(--primary)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: '0.2s'
                  }}
                  onClick={() => { setSelectedItem(item); setStage('PREVIEW'); }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = 0.9}
                  onMouseOut={(e) => e.currentTarget.style.opacity = 1}
                >
                  Preview / Customize <FaArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* BOTTOM CTA */}
      <div style={{padding:'4rem 2rem', textAlign:'center', background:'#f8f9fa', borderTop:'1px solid #eee'}}>
        <h2 style={{marginBottom:'15px', color:'var(--text-main)'}}>Have a unique idea?</h2>
        <p style={{color:'#666', marginBottom:'30px'}}>We can create anything from scratch.</p>
        <button onClick={openCustomForm} className="primary-btn" style={{margin:'0 auto', padding:'15px 30px', fontSize:'1rem'}}>
          <FaLightbulb /> Fill Form for Custom Idea
        </button>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
            <motion.div className="order-modal" onClick={(e) => e.stopPropagation()} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <button onClick={() => setSelectedItem(null)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer', zIndex:10}}><FaTimes size={20} color="#888"/></button>
              
              {stage === 'PREVIEW' && (
                <div style={{textAlign:'center'}}>
                  {selectedItem.imageUrl && (
                    <img src={selectedItem.imageUrl} style={{maxWidth:'100%', maxHeight:'350px', borderRadius:'8px', marginBottom:'20px', border:'1px solid #eee'}} />
                  )}
                  <h2 style={{color:'var(--text-main)', marginBottom:'10px'}}>{selectedItem.title}</h2>
                  <p style={{color:'#666', fontSize:'0.9rem', marginBottom:'25px', lineHeight:'1.5'}}>{selectedItem.description}</p>
                  <button onClick={() => setStage('INPUT')} className="primary-btn" style={{width:'100%'}}><FaPenNib/> Customize / Order</button>
                </div>
              )}

              {stage === 'INPUT' && (
                <form onSubmit={handleGenerate}>
                   <div style={{marginBottom:'20px', borderBottom:'1px solid #eee', paddingBottom:'10px'}}>
                      <h3 style={{color:'var(--text-main)', margin:0}}>Order Details</h3>
                      <span style={{color:'var(--primary)', fontSize:'0.8rem'}}>{selectedItem.title}</span>
                   </div>
                  <input name="name" required className="clean-input" placeholder="Your Name" />
                  <input name="contact" required className="clean-input" placeholder="WhatsApp Contact Number" />
                  <textarea name="changes" required className="clean-input" rows="3" placeholder="Describe changes..." />
                  <input name="qty" type="number" required className="clean-input" placeholder="Quantity" />
                  <button type="submit" className="primary-btn" disabled={isSaving}>{isSaving ? '...' : 'Generate Request'}</button>
                </form>
              )}

              {stage === 'CONFIRM' && (
                <div>
                  <div className="summary-box"><p style={{color:'green'}}>Request Saved!</p></div>
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