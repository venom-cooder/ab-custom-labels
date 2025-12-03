import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import AuroraBackground from '../components/anim/AuroraBackground';

// --- INTERNAL ICON COMPONENTS (No External Dependencies) ---
const FaPenNib = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M368.5 240l-84.8-84.8 59.4-59.4 84.8 84.8-59.4 59.4zm-107.5-62.2L345.8 262.6 157.3 451.1 57.2 461l10-100.1 193.8-183.1z"></path>
  </svg>
);
const FaWhatsapp = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
  </svg>
);
const FaTimes = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.19 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.19 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
  </svg>
);
const FaLightbulb = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M96.06 454.35c.01 6.29 1.87 12.45 5.36 17.69l17.09 25.69c3.15 4.76 8.44 7.59 14.17 7.59h86.63c5.73 0 11.02-2.83 14.17-7.59l17.09-25.69c3.49-5.24 5.35-11.4 5.36-17.69l.06-38.35H96.01l.05 38.35zM304 224c0-79.53-64.47-144-144-144S16 144.47 16 224c0 48.4 23.49 91.31 59.14 118.83L75.2 342.93c-6.4 6.4-6.4 16.77 0 23.17l22.63 22.63c6.4 6.4 16.77 6.4 23.17 0l22.97-22.97h64.06l22.97 22.97c6.4 6.4 16.77 6.4 23.17 0l22.63-22.63c6.4-6.4 6.4-16.77 0-23.17l.06-.06C280.51 315.31 304 272.4 304 224zm-64 0c0 44.18-35.82 80-80 80s-80-35.82-80-80 35.82-80 80-80 80 35.82 80 80z"></path>
  </svg>
);
const FaSearch = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
  </svg>
);
const FaEye = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
  </svg>
);

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

  // Use standard localhost URL for environment compatibility
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
        // Ensure we only show items that match the current category, 
        // regardless of whether the backend filtered them or returned all items.
        const filteredItems = res.data ? res.data.filter(item => item.category === type) : [];

        if (filteredItems.length > 0) {
            setItems(filteredItems);
        } else {
            throw new Error("No data"); // Trigger fallback
        }
      } catch (err) {
        console.warn("Using Fallback Mock Data for", type);
        // FALLBACK MOCK DATA
        const mockData = [
            // Stickers
            { _id: 1, title: 'Holographic Die-Cut', category: 'stickers', subcategory: 'die-cut', imageUrl: 'https://placehold.co/600x600/8B3DFF/FFF?text=Holo+Sticker', material: 'Holographic Vinyl', idealFor: 'Laptops, Bumpers' },
            { _id: 4, title: 'QR Code Sticker', category: 'stickers', subcategory: 'square', imageUrl: 'https://placehold.co/600x600/eee/333?text=QR+Sticker', material: 'Glossy Paper', idealFor: 'Packaging' },
            // Labels
            { _id: 2, title: 'Matte Jar Label', category: 'labels', subcategory: 'jar', imageUrl: 'https://placehold.co/600x600/00C4CC/FFF?text=Jar+Label', material: 'Matte Vinyl', idealFor: 'Cosmetic Jars' },
            { _id: 5, title: 'Wine Bottle Label', category: 'labels', subcategory: 'bottle', imageUrl: 'https://placehold.co/600x600/550000/FFF?text=Wine+Label', material: 'Textured Paper', idealFor: 'Wine Bottles' },
            // Logos
            { _id: 3, title: 'Gold Foil Logo', category: 'logos', subcategory: 'modern', imageUrl: 'https://placehold.co/600x600/111/FFF?text=Gold+Logo', material: 'Digital Foil', idealFor: 'Branding' },
            // Cards
            { _id: 6, title: 'Business Card Front', category: 'cards', subcategory: 'standard', imageUrl: 'https://placehold.co/600x600/222/FFF?text=Card+Front', material: '350GSM Matte', idealFor: 'Networking' },
            
            // POSTERS
            { _id: 101, title: 'Summer Music Festival', category: 'posters', subcategory: 'event', imageUrl: 'https://placehold.co/400x600/ff5722/ffffff?text=Music+Fest', material: 'Glossy 180GSM', idealFor: 'Outdoor Walls' },
            { _id: 102, title: 'Minimalist Art Print', category: 'posters', subcategory: 'art', imageUrl: 'https://placehold.co/400x600/333333/ffffff?text=Art+Poster', material: 'Matte Canvas', idealFor: 'Home Decor' },
            { _id: 103, title: 'Corporate Seminar Flyer', category: 'posters', subcategory: 'promo', imageUrl: 'https://placehold.co/400x600/1a237e/ffffff?text=Seminar+Flyer', material: 'Standard Paper', idealFor: 'Notice Boards' },
            
            // BANNERS
            { _id: 201, title: 'Grand Opening Vinyl', category: 'banners', subcategory: 'outdoor', imageUrl: 'https://placehold.co/800x300/d32f2f/ffffff?text=Grand+Opening', material: 'Heavy Duty Vinyl', idealFor: 'Storefronts' },
            { _id: 202, title: 'Trade Show Standee', category: 'banners', subcategory: 'standee', imageUrl: 'https://placehold.co/300x800/00796b/ffffff?text=Standee', material: 'Retractable Flex', idealFor: 'Exhibitions' },
            { _id: 203, title: 'Seasonal Sale Mesh', category: 'banners', subcategory: 'outdoor', imageUrl: 'https://placehold.co/800x300/fbc02d/000000?text=Big+Sale', material: 'Mesh Vinyl', idealFor: 'Windy Areas' },
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
      
      {/* 1. ANIMATION SECTION */}
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

      {/* 3. FILTERS (Dynamic based on Category) */}
      <div style={{display:'flex', justifyContent:'center', gap:'10px', flexWrap:'wrap', marginBottom:'30px', padding:'0 20px'}}>
        {type === 'labels' && ['all', 'circle', 'oval', 'bottle', 'rounded', 'jar'].map((f) => (
           <button key={f} onClick={()=>setLabelFilter(f)} className={`static-btn ${labelFilter===f?'':'bg-white text-gray-500 border-gray-200 shadow-none'}`} style={labelFilter!==f?{background:'white',color:'#666'}:{}}>{f}</button>
        ))}
        {type === 'posters' && ['all', 'event', 'art', 'promo'].map((f) => (
           <button key={f} onClick={()=>setLabelFilter(f)} className={`static-btn ${labelFilter===f?'':'bg-white text-gray-500 border-gray-200 shadow-none'}`} style={labelFilter!==f?{background:'white',color:'#666'}:{}}>{f}</button>
        ))}
        {type === 'banners' && ['all', 'outdoor', 'standee'].map((f) => (
           <button key={f} onClick={()=>setLabelFilter(f)} className={`static-btn ${labelFilter===f?'':'bg-white text-gray-500 border-gray-200 shadow-none'}`} style={labelFilter!==f?{background:'white',color:'#666'}:{}}>{f}</button>
        ))}
      </div>

      {/* 4. GALLERY GRID (STRICT 3 COLS) */}
      <div className="container" style={{maxWidth: '1200px', margin: '0 auto', paddingBottom: '80px', paddingLeft: '20px', paddingRight: '20px'}}>
        {loading ? (
          <p style={{color:'#666', width:'100%', textAlign:'center'}}>Loading Collection...</p>
        ) : displayItems.length === 0 ? (
          <div style={{textAlign:'center', padding:'40px', color:'#444'}}>
             <FaSearch size={30} style={{marginBottom:'10px', color:'#ccc'}}/>
             <p>No items found.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '30px',
            width: '100%'
          }}>
            {displayItems.map((item) => (
              <div 
                key={item._id} 
                style={{
                  background: '#fff', border: '1px solid #eee', borderRadius: '4px',
                  display: 'flex', flexDirection: 'column', height: '100%',
                  overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                {/* IMAGE BOX */}
                <div 
                  onClick={() => { setSelectedItem(item); setStage('PREVIEW'); }}
                  style={{
                    height: '250px', width: '100%', background: '#f9fafb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'zoom-in', padding: '15px', position: 'relative'
                  }}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    loading="lazy"
                    style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}
                  />
                  <div className="absolute top-2 right-2 text-gray-400">
                    <FaEye />
                  </div>
                </div>
                
                {/* INFO */}
                <div style={{padding: '20px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <div>
                    <h4 style={{fontSize:'1.1rem', fontWeight:'700', color:'var(--text-main)', marginBottom:'5px'}}>{item.title}</h4>
                    <p style={{fontSize:'0.85rem', color:'#888', textTransform:'uppercase'}}>{item.subcategory || type}</p>
                  </div>
                  <button 
                    onClick={() => { setSelectedItem(item); setStage('PREVIEW'); }}
                    className="category-rect-btn" 
                    style={{width:'100%', marginTop:'15px', justifyContent:'center', padding: '10px'}}
                  >
                    Preview & Customize
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
        <button onClick={openCustomForm} className="primary-btn" style={{margin:'0 auto', padding:'15px 30px', fontSize:'1rem'}}>
          <FaLightbulb /> Fill Form for Custom Idea
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
              <FaTimes size={30} />
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
                    <p style={{color: '#ccc', marginBottom: '15px'}}>{selectedItem.description || "Premium quality custom print."}</p>
                    
                    {/* NEW: Material & Ideal For Display */}
                    {(selectedItem.material || selectedItem.idealFor) && (
                      <div style={{display:'flex', gap:'20px', justifyContent:'center', marginBottom:'30px', flexWrap:'wrap'}}>
                         {selectedItem.material && (
                           <span style={{background:'rgba(255,255,255,0.1)', padding:'5px 15px', borderRadius:'20px', fontSize:'0.9rem', border:'1px solid rgba(255,255,255,0.2)'}}>
                             🏗 {selectedItem.material}
                           </span>
                         )}
                         {selectedItem.idealFor && (
                           <span style={{background:'rgba(255,255,255,0.1)', padding:'5px 15px', borderRadius:'20px', fontSize:'0.9rem', border:'1px solid rgba(255,255,255,0.2)'}}>
                             ✨ {selectedItem.idealFor}
                           </span>
                         )}
                      </div>
                    )}

                    <button onClick={() => setStage('INPUT')} className="primary-btn" style={{padding: '16px 40px', fontSize: '1.2rem', boxShadow: '0 0 30px rgba(139, 61, 255, 0.4)'}}>
                      <FaPenNib /> Customize This Design
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
                       <FaWhatsapp size={40} color="#16a34a"/>
                    </div>
                    <h2 style={{fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px'}}>Ready to Send!</h2>
                    <button onClick={handleFinalWhatsApp} className="primary-btn" style={{background:'#25D366', width: '100%', border: 'none', fontSize: '1.1rem'}}>
                      <FaWhatsapp style={{marginRight: '8px'}}/> Chat with Team
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