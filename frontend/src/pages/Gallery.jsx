import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaArrowLeft, FaPenNib, FaWhatsapp, FaTimes, FaLightbulb, FaSearch } from 'react-icons/fa';
import AuroraBackground from '../components/anim/AuroraBackground'; 

const Gallery = () => {
  const { type } = useParams(); 
  const navigate = useNavigate();
  
  // --- STATE ---
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [labelFilter, setLabelFilter] = useState('all'); 

  // Modal & Order State
  const [selectedItem, setSelectedItem] = useState(null);
  const [stage, setStage] = useState('PREVIEW'); // 'PREVIEW' -> 'INPUT' -> 'CONFIRM'
  const [customData, setCustomData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // 5-Step Animation State
  const [stepIndex, setStepIndex] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- CONTENT CONFIGURATION ---
  const steps = [
    { title: "Idea", desc: "Customer shares their dream product.", img: "/images/Step1.png" },
    { title: "Sketch", desc: "We create the emotional story behind the design.", img: "/images/Step2.png" },
    { title: "Design", desc: "Luxury-shaped, premium typography.", img: "/images/Step3.png" },
    { title: "Print", desc: "High-end materials, fade-proof, waterproof.", img: "/images/Step4.png" },
    { title: "Deliver", desc: "Your brand becomes unforgettable.", img: "/images/Step5.png" }
  ];

  const categoryInfo = {
    stickers: {
      title: "Premium Custom Stickers",
      desc: "Elevate your brand visibility with our high-durability stickers. Crafted from weather-resistant vinyl and available in any die-cut shape, these stickers are perfect for packaging, giveaways, or outdoor use. Let your brand stick in the minds of your customers forever."
    },
    labels: {
      title: "Professional Product Labels",
      desc: "Transform your packaging with our industry-grade labels. Whether for bottles, jars, or boxes, we offer roll and sheet formats with premium finishes like gold foil, matte, and gloss. Designed to withstand moisture and handling while looking pristine."
    },
    logos: {
      title: "Brand Identity Logos",
      desc: "Your logo is your first impression. Our design team crafts memorable, scalable, and versatile logos that define your business identity. From minimalist modern marks to intricate vintage emblems, we build the visual foundation of your brand."
    },
    cards: {
      title: "Luxury Visiting Cards",
      desc: "Make every introduction count with our premium business cards. Featuring high-gsm paper, spot UV, embossing, and unique textures. These aren't just cards; they are conversation starters that leave a lasting professional impact."
    }
  };

  const currentInfo = categoryInfo[type] || categoryInfo['stickers'];

  // --- EFFECTS ---
  useEffect(() => {
    // 5-Step Animation Timer (4 seconds per step)
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 4000);

    // Fetch Data
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
    
    return () => clearInterval(stepInterval);
  }, [type, API_URL]);

  const displayItems = items.filter(item => {
    if (item.category !== type) return false;
    if (type === 'labels') {
      if (labelFilter === 'all') return true;
      return item.subcategory === labelFilter;
    }
    return true;
  });

  // --- HANDLERS ---
  const openCustomForm = () => {
    setSelectedItem({ title: 'My Custom Idea', imageUrl: null });
    setStage('INPUT'); // Custom idea skips preview, goes straight to input
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
    setSelectedItem(null); setStage('PREVIEW');
  };

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

      {/* --- 1. 5-STEP PROCESS ANIMATION (AURORA BG) --- */}
      <div style={{position:'relative', height:'500px', overflow:'hidden', display:'flex', alignItems:'center', background:'#fff', borderBottom:'1px solid #eee'}}>
        <AuroraBackground />
        
        <div style={{position:'relative', zIndex:1, maxWidth:'1200px', margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', alignItems:'center', padding:'0 2rem'}}>
          
          {/* Left: Text Animation */}
          <div style={{paddingRight:'40px'}}>
             <AnimatePresence mode="wait">
               <motion.div
                 key={stepIndex}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 transition={{ duration: 0.5 }}
               >
                 <h2 style={{fontSize:'3.5rem', fontWeight:'900', color:'var(--text-main)', marginBottom:'10px'}}>
                   {steps[stepIndex].title} <span style={{color:'var(--primary)'}}>→</span>
                 </h2>
                 <p style={{fontSize:'1.3rem', color:'#555', lineHeight:'1.6'}}>
                   {steps[stepIndex].desc}
                 </p>
                 
                 {/* Progress Dots */}
                 <div style={{display:'flex', gap:'8px', marginTop:'30px'}}>
                   {steps.map((_, i) => (
                     <div key={i} style={{
                       width: i === stepIndex ? '25px' : '8px', 
                       height:'8px', borderRadius:'4px', 
                       background: i === stepIndex ? 'var(--primary)' : '#ddd',
                       transition: '0.3s'
                     }}/>
                   ))}
                 </div>
               </motion.div>
             </AnimatePresence>
          </div>

          {/* Right: Image Animation */}
          <div style={{height:'350px', display:'flex', justifyContent:'center', alignItems:'center'}}>
             <AnimatePresence mode="wait">
               <motion.img
                 key={stepIndex}
                 src={steps[stepIndex].img}
                 alt={steps[stepIndex].title}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.1 }}
                 transition={{ duration: 0.5 }}
                 style={{
                   maxHeight:'100%', maxWidth:'100%', 
                   borderRadius:'16px', boxShadow:'0 20px 50px rgba(0,0,0,0.1)',
                   objectFit: 'contain'
                 }}
                 onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Step+Image'} // Fallback
               />
             </AnimatePresence>
          </div>

        </div>
      </div>

      {/* --- 2. CATEGORY HEADER & DESCRIPTION --- */}
      <div style={{textAlign:'center', padding:'4rem 1.5rem 2rem', maxWidth:'900px', margin:'0 auto'}}>
        <h1 style={{fontSize:'3rem', fontWeight:'800', marginBottom:'20px', color:'var(--text-main)'}}>
          {currentInfo.title}
        </h1>
        <p style={{color:'#666', fontSize:'1.1rem', lineHeight:'1.8'}}>
          {currentInfo.desc}
        </p>
        <p style={{fontSize:'0.9rem', color:'#999', marginTop:'15px'}}>
          Browse our latest {type} below. Click any item to customize.
        </p>
      </div>

      {/* --- LABEL FILTERS --- */}
      {type === 'labels' && (
        <div style={{display:'flex', justifyContent:'center', gap:'10px', flexWrap:'wrap', marginBottom:'30px', padding:'0 20px'}}>
          {['all', 'circle', 'oval', 'bottle', 'rounded', 'jar'].map((shape) => (
            <button
              key={shape}
              onClick={() => setLabelFilter(shape)}
              style={{
                padding: '8px 16px', borderRadius: '4px', border: '1px solid #eee',
                background: labelFilter === shape ? 'var(--primary)' : '#fff',
                color: labelFilter === shape ? '#fff' : '#666',
                cursor: 'pointer', textTransform: 'capitalize', fontWeight: '600', transition: '0.2s',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}
            >
              {shape}
            </button>
          ))}
        </div>
      )}

      {/* --- 3. GALLERY GRID (3 Cols) --- */}
      <div className="masonry-grid">
        {loading ? (
          <p style={{color:'#666', width:'100%', textAlign:'center'}}>Loading Collection...</p>
        ) : displayItems.length === 0 ? (
          <div style={{textAlign:'center', padding:'40px', color:'#444', gridColumn:'span 3'}}>
             <FaSearch size={30} style={{marginBottom:'10px', color:'#ccc'}}/>
             <p>No items found.</p>
          </div>
        ) : (
          displayItems.map((item) => (
            <motion.div 
              key={item._id} 
              className="masonry-item"
              whileHover={{ translateY: -5 }}
              layout
            >
              {/* IMAGE (Click -> Preview) */}
              <div 
                style={{cursor:'zoom-in', width: '100%', background: '#f9f9f9'}} 
                onClick={() => { setSelectedItem(item); setStage('PREVIEW'); }}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  loading="lazy"
                  style={{width: '100%', display: 'block'}}
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
              </div>
              
              {/* INFO (Button Click -> Preview) */}
              <div className="masonry-info" style={{textAlign:'center', padding:'15px'}}>
                <h4 className="masonry-title" style={{fontSize:'1rem', fontWeight: '700', marginBottom:'4px'}}>{item.title}</h4>
                {item.category === 'labels' && item.subcategory && (
                  <span className="masonry-sub" style={{marginBottom:'10px', display:'block', fontSize:'0.8rem', color: '#888'}}>{item.subcategory}</span>
                )}
                
                <button 
                  className="category-rect-btn" 
                  style={{
                    width:'100%', marginTop:'8px', background:'#fff', color:'var(--primary)', border:'1px solid var(--primary)',
                    fontSize:'0.85rem', padding:'8px 12px'
                  }}
                  onClick={() => { setSelectedItem(item); setStage('PREVIEW'); }}
                >
                  Preview / Customize
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

      {/* --- MODAL (FIXED FLOW: PREVIEW -> INPUT) --- */}
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
              <button 
                onClick={() => setSelectedItem(null)} 
                style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer', zIndex: 10}}
              >
                <FaTimes size={20} color="#888"/>
              </button>
              
              {/* STAGE 1: PREVIEW (Big Image) */}
              {stage === 'PREVIEW' && (
                <div style={{textAlign:'center'}}>
                  {selectedItem.imageUrl && (
                    <div style={{background: '#f4f4f4', borderRadius: '8px', padding: '10px', marginBottom: '20px'}}>
                      <img 
                        src={selectedItem.imageUrl} 
                        style={{maxWidth:'100%', maxHeight:'50vh', objectFit: 'contain', display: 'block', margin: '0 auto'}} 
                        alt="Preview"
                      />
                    </div>
                  )}
                  <h2 style={{color:'var(--text-main)', marginBottom:'10px', fontSize: '1.5rem'}}>{selectedItem.title}</h2>
                  <p style={{color:'#666', fontSize:'0.9rem', marginBottom:'25px', lineHeight:'1.5'}}>
                    {selectedItem.description || "Premium quality print available in various sizes and finishes."}
                  </p>
                  <button onClick={() => setStage('INPUT')} className="primary-btn" style={{width:'100%'}}>
                    <FaPenNib/> Customize / Order Now
                  </button>
                </div>
              )}

              {/* STAGE 2: INPUT (Form) */}
              {stage === 'INPUT' && (
                <form onSubmit={handleGenerate}>
                   <div style={{marginBottom:'20px', borderBottom:'1px solid #eee', paddingBottom:'10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <h3 style={{color:'var(--text-main)', margin:0}}>Order Details</h3>
                      <button type="button" onClick={() => setStage('PREVIEW')} style={{background:'none', border:'none', color:'#888', fontSize:'0.8rem', cursor:'pointer', textDecoration:'underline'}}>Back to Preview</button>
                   </div>
                  
                  <label style={{fontSize: '0.85rem', fontWeight: 'bold', color: '#555'}}>Your Name</label>
                  <input name="name" required className="clean-input" placeholder="Enter your name" />
                  
                  <label style={{fontSize: '0.85rem', fontWeight: 'bold', color: '#555'}}>WhatsApp Number</label>
                  <input name="contact" required className="clean-input" placeholder="+91 XXXXXXXXXX" />
                  
                  <label style={{fontSize: '0.85rem', fontWeight: 'bold', color: '#555'}}>Customization Notes</label>
                  <textarea name="changes" required className="clean-input" rows="3" placeholder="Size, text changes, color preference..." />
                  
                  <label style={{fontSize: '0.85rem', fontWeight: 'bold', color: '#555'}}>Quantity</label>
                  <input name="qty" type="number" required className="clean-input" placeholder="Ex: 100" />
                  
                  <button type="submit" className="primary-btn" disabled={isSaving} style={{width: '100%'}}>
                    {isSaving ? 'Saving...' : 'Generate Request'}
                  </button>
                </form>
              )}

              {/* STAGE 3: CONFIRM (WhatsApp) */}
              {stage === 'CONFIRM' && (
                <div style={{textAlign: 'center', padding: '20px 0'}}>
                  <div style={{width: '60px', height: '60px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
                     <FaWhatsapp size={30} color="#16a34a"/>
                  </div>
                  <h3 style={{marginBottom: '10px'}}>Order Ready!</h3>
                  <p style={{color: '#666', marginBottom: '20px'}}>Click below to send these details to our team on WhatsApp.</p>
                  <button onClick={handleFinalWhatsApp} className="primary-btn" style={{background:'#25D366', width: '100%', border: 'none'}}>
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