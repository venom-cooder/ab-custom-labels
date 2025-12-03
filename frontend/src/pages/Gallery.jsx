import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import AuroraBackground from '../components/anim/AuroraBackground'; 

// --- INLINE ICONS (No Dependencies) ---
const Icons = {
  PenTool: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
  ),
  MessageCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  ),
  Lightbulb: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 16.5 8 4.5 4.5 0 0 0 12 3.5 4.5 4.5 0 0 0 7.5 8c0 1.5.8 2.8 2 3.5.76.76 1.23 1.52 1.41 2.5"></path></svg>
  ),
  Search: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  ),
  Eye: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
  ),
  CheckCircle: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  )
};

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

  // Fixed API URL
  const API_URL = 'http://localhost:5001';

  // --- CONTENT CONFIGURATION ---
  const steps = [
    { title: "Idea", desc: "Customer shares their dream product.", img: "/images/Step1.png" },
    { title: "Sketch", desc: "We create the emotional story behind the design.", img: "/images/Step2.png" },
    { title: "Design", desc: "Luxury-shaped, premium typography.", img: "/images/Step3.png" },
    { title: "Print", desc: "High-end materials, fade-proof, waterproof.", img: "/images/Step4.png" },
    { title: "Deliver", desc: "Your brand becomes unforgettable.", img: "/images/Step5.png" }
  ];

  const categoryInfo = {
    stickers: { title: "Premium Custom Stickers", desc: "Elevate your brand visibility with our high-durability stickers. Crafted from weather-resistant vinyl and available in any die-cut shape." },
    labels: { title: "Professional Product Labels", desc: "Transform your packaging with our industry-grade labels. Whether for bottles, jars, or boxes, we offer roll and sheet formats." },
    logos: { title: "Brand Identity Logos", desc: "Your logo is your first impression. Our design team crafts memorable, scalable, and versatile logos that define your business identity." },
    cards: { title: "Luxury Visiting Cards", desc: "Make every introduction count with our premium business cards. Featuring high-gsm paper, spot UV, embossing, and unique textures." },
    // NEW CATEGORIES
    posters: { title: "High-Impact Posters", desc: "Turn walls into windows for your brand. High-resolution printing on gloss, matte, or satin paper. Perfect for events, promotions, and art." },
    banners: { title: "Durable Event Banners", desc: "Make a big statement indoors or outdoors. Our weather-resistant vinyl banners come with reinforced grommets for easy hanging and long-lasting color." }
  };

  const currentInfo = categoryInfo[type] || categoryInfo['stickers'];

  // --- EFFECTS ---
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 4000);

    const fetchGallery = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/products?category=${type}`);
        if (res.data && res.data.length > 0) {
            setItems(res.data);
        } else {
            throw new Error("No data"); // Trigger fallback
        }
      } catch (err) {
        console.warn("Using Fallback Mock Data for", type);
        // FALLBACK MOCK DATA
        const mockData = [
            // Stickers
            { _id: 1, title: 'Holographic Die-Cut', category: 'stickers', subcategory: 'die-cut', imageUrl: 'https://placehold.co/600x600/8B3DFF/FFF?text=Holo+Sticker' },
            { _id: 4, title: 'QR Code Sticker', category: 'stickers', subcategory: 'square', imageUrl: 'https://placehold.co/600x600/eee/333?text=QR+Sticker' },
            // Labels
            { _id: 2, title: 'Matte Jar Label', category: 'labels', subcategory: 'jar', imageUrl: 'https://placehold.co/600x600/00C4CC/FFF?text=Jar+Label' },
            { _id: 5, title: 'Wine Bottle Label', category: 'labels', subcategory: 'bottle', imageUrl: 'https://placehold.co/600x600/550000/FFF?text=Wine+Label' },
            // Logos
            { _id: 3, title: 'Gold Foil Logo', category: 'logos', subcategory: 'modern', imageUrl: 'https://placehold.co/600x600/111/FFF?text=Gold+Logo' },
            // Cards
            { _id: 6, title: 'Business Card Front', category: 'cards', subcategory: 'standard', imageUrl: 'https://placehold.co/600x600/222/FFF?text=Card+Front' },
            
            // POSTERS (New Mock Data)
            { _id: 101, title: 'Summer Music Festival', category: 'posters', subcategory: 'event', imageUrl: 'https://placehold.co/400x600/ff5722/ffffff?text=Music+Fest' },
            { _id: 102, title: 'Minimalist Art Print', category: 'posters', subcategory: 'art', imageUrl: 'https://placehold.co/400x600/333333/ffffff?text=Art+Poster' },
            { _id: 103, title: 'Corporate Seminar Flyer', category: 'posters', subcategory: 'promo', imageUrl: 'https://placehold.co/400x600/1a237e/ffffff?text=Seminar+Flyer' },
            
            // BANNERS (New Mock Data)
            { _id: 201, title: 'Grand Opening Vinyl', category: 'banners', subcategory: 'outdoor', imageUrl: 'https://placehold.co/800x300/d32f2f/ffffff?text=Grand+Opening' },
            { _id: 202, title: 'Trade Show Standee', category: 'banners', subcategory: 'standee', imageUrl: 'https://placehold.co/300x800/00796b/ffffff?text=Standee' },
            { _id: 203, title: 'Seasonal Sale Mesh', category: 'banners', subcategory: 'outdoor', imageUrl: 'https://placehold.co/800x300/fbc02d/000000?text=Big+Sale' },
        ];
        // Filter mock data for current page type
        setItems(mockData.filter(i => i.category === type));
      }
      setLoading(false);
    };
    
    fetchGallery();
    setLabelFilter('all');
    
    return () => clearInterval(stepInterval);
  }, [type, API_URL]);

  // --- FILTER LOGIC ---
  const displayItems = items.filter(item => {
    if (labelFilter === 'all') return true;
    return item.subcategory && item.subcategory.toLowerCase() === labelFilter.toLowerCase();
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
      
      {/* 1. ANIMATION SECTION (AURORA PRESERVED) */}
      <div style={{position:'relative', height:'500px', overflow:'hidden', display:'flex', alignItems:'center', background:'#fff', borderBottom:'1px solid #eee'}}>
        <AuroraBackground />
        <div style={{position:'relative', zIndex:1, maxWidth:'1200px', margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', alignItems:'center', padding:'0 2rem'}}>
          <div style={{paddingRight:'40px'}}>
             <AnimatePresence mode="wait">
               <motion.div
                 key={stepIndex}
                 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                 transition={{ duration: 0.5 }}
               >
                 <h2 style={{fontSize:'3.5rem', fontWeight:'900', color:'var(--text-main)', marginBottom:'10px'}}>
                   {steps[stepIndex].title} <span style={{color:'var(--primary)'}}>→</span>
                 </h2>
                 <p style={{fontSize:'1.3rem', color:'#555', lineHeight:'1.6'}}>{steps[stepIndex].desc}</p>
                 <div style={{display:'flex', gap:'8px', marginTop:'30px'}}>
                   {steps.map((_, i) => (
                     <div key={i} style={{width: i === stepIndex ? '25px' : '8px', height:'8px', borderRadius:'4px', background: i === stepIndex ? 'var(--primary)' : '#ddd', transition: '0.3s'}}/>
                   ))}
                 </div>
               </motion.div>
             </AnimatePresence>
          </div>
          <div style={{height:'350px', display:'flex', justifyContent:'center', alignItems:'center'}}>
             <AnimatePresence mode="wait">
               <motion.img
                 key={stepIndex} src={steps[stepIndex].img} alt={steps[stepIndex].title}
                 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                 style={{maxHeight:'100%', maxWidth:'100%', borderRadius:'16px', boxShadow:'0 20px 50px rgba(0,0,0,0.1)', objectFit: 'contain'}}
                 onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Step+Image'} 
               />
             </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 2. HEADER */}
      <div style={{textAlign:'center', padding:'4rem 1.5rem 2rem', maxWidth:'900px', margin:'0 auto'}}>
        <h1 style={{fontSize:'3rem', fontWeight:'800', marginBottom:'20px', color:'var(--text-main)'}}>{currentInfo.title}</h1>
        <p style={{color:'#666', fontSize:'1.1rem', lineHeight:'1.8'}}>{currentInfo.desc}</p>
      </div>

      {/* 3. FILTERS (Dynamic) */}
      <div style={{display:'flex', justifyContent:'center', gap:'10px', flexWrap:'wrap', marginBottom:'30px', padding:'0 20px'}}>
        {type === 'labels' && ['all', 'circle', 'oval', 'bottle', 'rounded', 'jar'].map((f) => (
           <button key={f} onClick={()=>setLabelFilter(f)} className={`static-btn ${labelFilter===f?'':'bg-white text-gray-500 border-gray-200 shadow-none'}`} style={labelFilter!==f?{background:'white',color:'#666'}:{}}>{f}</button>
        ))}
        {type === 'posters' && ['all', 'event', 'art', 'promo'].map((f) => (
           <button key={f} onClick={()=>setLabelFilter(f)} className={`static-btn ${labelFilter===f?'':'bg-white text-gray-500 border-gray-200 shadow-none'}`} style={labelFilter!==f?{background:'white',color:'#666'}:{}}>{f}</button>
        ))}
        {type === 'banners' && ['all', 'outdoor', 'standee', 'vinyl'].map((f) => (
           <button key={f} onClick={()=>setLabelFilter(f)} className={`static-btn ${labelFilter===f?'':'bg-white text-gray-500 border-gray-200 shadow-none'}`} style={labelFilter!==f?{background:'white',color:'#666'}:{}}>{f}</button>
        ))}
      </div>

      {/* 4. GALLERY GRID (STRICT 3 COLS) */}
      <div className="container" style={{maxWidth: '1200px', margin: '0 auto', paddingBottom: '80px', paddingLeft: '20px', paddingRight: '20px'}}>
        {loading ? (
          <p style={{color:'#666', width:'100%', textAlign:'center'}}>Loading Collection...</p>
        ) : displayItems.length === 0 ? (
          <div style={{textAlign:'center', padding:'40px', color:'#444'}}>
             <Icons.Search />
             <p>No items found.</p>
          </div>
        ) : (
          /* --- THE FIX: STRICT 3 COLUMNS GRID --- */
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', // Forces 3 columns
            gap: '30px',
            width: '100%'
          }}>
            {displayItems.map((item) => (
              <div 
                key={item._id} 
                style={{
                  background: '#fff', border: '1px solid #eee', borderRadius: '4px',
                  display: 'flex', flexDirection: 'column', height: '100%',
                  overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  cursor: 'pointer' // Makes the whole card clickable feel
                }}
                onClick={() => { setSelectedItem(item); setStage('PREVIEW'); }}
              >
                {/* IMAGE BOX: FIXED HEIGHT, CONTAIN FIT */}
                <div style={{
                    height: '250px', width: '100%', background: '#f9fafb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '15px', position: 'relative'
                  }}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    loading="lazy"
                    style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}
                  />
                  {/* Hover Eye */}
                  <div className="absolute top-2 right-2 text-gray-400">
                    <Icons.Eye />
                  </div>
                </div>
                
                {/* INFO */}
                <div style={{padding: '20px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <div>
                    {/* HOVER ANIMATION FOR TITLE */}
                    <motion.h4 
                      whileHover={{ scale: 1.05, color: '#8B3DFF' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={{fontSize:'1.1rem', fontWeight:'700', color:'var(--text-main)', marginBottom:'5px', display: 'inline-block'}}
                    >
                      {item.title}
                    </motion.h4>
                    <p style={{fontSize:'0.85rem', color:'#888', textTransform:'uppercase'}}>{item.subcategory || type}</p>
                  </div>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); // Prevent double trigger
                      setSelectedItem(item); setStage('PREVIEW'); 
                    }}
                    className="category-rect-btn" 
                    style={{width:'100%', marginTop:'15px', justifyContent:'center', padding: '10px', display: 'flex', alignItems: 'center', gap: '5px'}}
                  >
                    <Icons.PenTool /> Preview & Customize
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM CTA */}
      <div style={{padding:'4rem 2rem', textAlign:'center', background:'#f8f9fa', borderTop:'1px solid #eee'}}>
        <h2 style={{marginBottom:'15px', color:'var(--text-main)'}}>Have a unique idea?</h2>
        <button onClick={openCustomForm} className="primary-btn" style={{margin:'0 auto', padding:'15px 30px', fontSize:'1rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
          <Icons.Lightbulb /> Fill Form for Custom Idea
        </button>
      </div>

      {/* --- MODAL SYSTEM --- */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
              background: 'rgba(0, 0, 0, 0.95)', zIndex: 9999, 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(5px)'
            }}
            onClick={() => setSelectedItem(null)}
          >
            <button onClick={() => setSelectedItem(null)} style={{position:'absolute', top: 30, right: 30, border:'none', background:'transparent', color: 'white', cursor:'pointer', zIndex: 10001}}>
              <Icons.X />
            </button>

            <div onClick={(e) => e.stopPropagation()} style={{width: '100%', maxWidth: '1000px', padding: '20px'}}>
              
              {/* STAGE 1: PREVIEW */}
              {stage === 'PREVIEW' && (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                  <div style={{marginBottom: '30px', maxHeight: '60vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', padding: '10px', borderRadius: '8px'}}>
                    <img src={selectedItem.imageUrl} alt={selectedItem.title} style={{maxHeight: '55vh', maxWidth: '100%', objectFit: 'contain'}} />
                  </div>
                  <div style={{textAlign: 'center', color: 'white'}}>
                    <h2 style={{fontSize: '2rem', fontWeight: '800', marginBottom: '10px'}}>{selectedItem.title}</h2>
                    <p style={{color: '#ccc', marginBottom: '30px'}}>{selectedItem.description || "Premium quality custom print."}</p>
                    <button onClick={() => setStage('INPUT')} className="primary-btn" style={{padding: '16px 40px', fontSize: '1.2rem', boxShadow: '0 0 30px rgba(139, 61, 255, 0.4)', display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <Icons.PenTool /> Customize This Design
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2: FORM */}
              {stage === 'INPUT' && (
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{background: 'white', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '500px', margin: '0 auto'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>
                    <h3 style={{fontSize: '1.5rem', fontWeight: '800'}}>Customize Order</h3>
                    <button onClick={() => setStage('PREVIEW')} style={{color: '#666', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer'}}>Back</button>
                  </div>
                  <form onSubmit={handleGenerate}>
                    <input name="name" required className="clean-input" placeholder="Your Name" style={{background:'#f8f9fa'}}/>
                    <input name="contact" required className="clean-input" placeholder="WhatsApp Number" style={{background:'#f8f9fa'}}/>
                    <textarea name="changes" required className="clean-input" rows="3" placeholder="Describe your customization..." style={{background:'#f8f9fa'}}/>
                    <input name="qty" type="number" required className="clean-input" placeholder="Quantity" style={{background:'#f8f9fa'}}/>
                    <button type="submit" className="primary-btn" disabled={isSaving} style={{width: '100%', marginTop: '10px'}}>
                      {isSaving ? 'Processing...' : 'Generate Request'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STAGE 3: CONFIRM */}
              {stage === 'CONFIRM' && (
                 <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{background: 'white', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', margin: '0 auto', textAlign: 'center'}}>
                    <div style={{width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
                       <Icons.CheckCircle />
                    </div>
                    <h2 style={{fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px'}}>Ready to Send!</h2>
                    <button onClick={handleFinalWhatsApp} className="primary-btn" style={{background:'#25D366', width: '100%', border: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                      <Icons.MessageCircle /> Chat with Team
                    </button>
                 </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;