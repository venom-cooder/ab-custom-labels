import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaArrowLeft, FaPenNib, FaWhatsapp, FaTimes } from 'react-icons/fa';

const Gallery = () => {
  const { type } = useParams(); // "stickers", "logos", "labels", "cards"
  const navigate = useNavigate();
  
  // --- STATE ---
  const [selectedItem, setSelectedItem] = useState(null);
  const [stage, setStage] = useState('INPUT'); // 'INPUT' -> 'CONFIRM'
  const [customData, setCustomData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Vercel/Render API URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- 1. DYNAMIC IMAGE CONFIGURATION ---
  // This maps the URL type to your specific folder structure and filenames
  const config = {
    stickers: { folder: 'Stickers', count: 10, prefix: 'stickers' }, // stickers1.png ...
    logos:    { folder: 'Logos',    count: 10, prefix: 'logo' },     // logo1.png ...
    labels:   { folder: 'Labels',   count: 29, prefix: 'labels' },   // labels1.png ...
    cards:    { folder: 'Cards',    count: 9,  prefix: 'cards' }     // cards1.png ...
  };

  // Get config for current page type (default to empty if not found)
  const currentConfig = config[type] || { folder: '', count: 0, prefix: '' };

  // Generate the list of items pointing to real images
  const items = Array.from({ length: currentConfig.count }, (_, i) => ({
    id: i + 1,
    title: `${type.toUpperCase()} #${i + 1}`,
    // Points to: public/images/Folder/prefix1.png
    imgSrc: `/images/${currentConfig.folder}/${currentConfig.prefix}${i + 1}.png`
  }));

  // --- 2. HANDLE FORM SUBMIT (SAVE TO DB) ---
  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const data = new FormData(e.target);
    
    const newOrder = {
      name: data.get('name'),
      contact: data.get('contact'),
      details: `Ref: ${selectedItem.title} | Changes: ${data.get('changes')} | Qty: ${data.get('qty')}`,
      type: `Gallery Inquiry (${type})`,
      qty: data.get('qty'),
      date: new Date().toLocaleString()
    };

    setCustomData({ ...newOrder, changes: data.get('changes') });

    try {
      // Send to Render Backend
      await axios.post(`${API_URL}/api/orders`, newOrder);
      console.log("Gallery inquiry saved to Cloud DB");
    } catch (err) {
      console.error("Failed to save inquiry", err);
    }

    setIsSaving(false);
    setStage('CONFIRM');
  };

  // --- 3. HANDLE WHATSAPP CONNECT ---
  const handleFinalWhatsApp = () => {
    const phone = "919243858944";
    const msg = `*GALLERY INQUIRY - AB CUSTOM LABELS* 🖼\n\n` +
                `Ref: ${selectedItem.title}\n` +
                `👤 Name: ${customData.name}\n` +
                `📞 Contact: ${customData.contact}\n` +
                `📝 Customization: ${customData.changes}\n` +
                `🔢 Quantity: ${customData.qty}`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    
    // Reset
    setSelectedItem(null);
    setStage('INPUT');
  };

  return (
    <div className="app-container">
      {/* --- NAVBAR --- */}
      <nav>
        <div 
          onClick={() => navigate('/')} 
          style={{display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', fontWeight:'600', color:'#333'}}
        >
          <FaArrowLeft /> Back to Home
        </div>
        <div style={{textTransform:'capitalize', fontWeight:'800', fontSize:'1.1rem', letterSpacing:'-0.5px'}}>
          AB {type} Archive
        </div>
      </nav>

      {/* --- MASONRY GALLERY GRID (Original Resolutions) --- */}
      <div className="masonry-grid">
        {items.map((item) => (
          <motion.div 
            key={item.id} 
            className="masonry-item"
            whileHover={{ scale: 1.02 }}
            onClick={() => { setSelectedItem(item); setStage('INPUT'); }}
          >
            {/* The Real Image */}
            <img 
              src={item.imgSrc} 
              alt={item.title} 
              loading="lazy" 
              onError={(e) => {e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Found'}} // Fallback if file missing
            />
            
            {/* Hover Overlay */}
            <div className="overlay-btn">
              Customize <FaPenNib size={10} style={{marginLeft:5}}/>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- CUSTOMIZATION MODAL --- */}
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
                style={{position:'absolute', top:'15px', right:'15px', border:'none', background:'transparent', cursor:'pointer'}}
              >
                <FaTimes size={20} color="#888"/>
              </button>

              {/* Thumbnail Preview in Modal */}
              <div style={{display:'flex', gap:'15px', alignItems:'center', marginBottom:'25px'}}>
                <img 
                  src={selectedItem.imgSrc} 
                  style={{width:'60px', height:'60px', objectFit:'cover', borderRadius:'8px', border:'1px solid #eee'}} 
                  alt="preview"
                />
                <div>
                  <h2 style={{margin:0, fontSize:'1.2rem'}}>Customize This</h2>
                  <p style={{margin:0, fontSize:'0.8rem', color:'#666'}}>{selectedItem.title}</p>
                </div>
              </div>

              {stage === 'INPUT' ? (
                <form onSubmit={handleGenerate}>
                  <label style={{fontSize:'0.8rem', fontWeight:'600', marginBottom:'5px', display:'block'}}>Your Name</label>
                  <input name="name" required className="clean-input" placeholder="Ex: Rahul Design" />

                  <label style={{fontSize:'0.8rem', fontWeight:'600', marginBottom:'5px', display:'block'}}>WhatsApp Contact</label>
                  <input name="contact" required className="clean-input" placeholder="+91 99999 99999" />

                  <label style={{fontSize:'0.8rem', fontWeight:'600', marginBottom:'5px', display:'block'}}>What changes do you want?</label>
                  <textarea name="changes" required className="clean-input" rows="3" placeholder="Change color to red, add my logo..." />

                  <label style={{fontSize:'0.8rem', fontWeight:'600', marginBottom:'5px', display:'block'}}>Quantity</label>
                  <input name="qty" type="number" required className="clean-input" placeholder="50" />

                  <button type="submit" className="primary-btn" disabled={isSaving}>
                    {isSaving ? 'Processing...' : <><FaPenNib /> Generate Request</>}
                  </button>
                </form>
              ) : (
                <div>
                  <div className="summary-box">
                    <p><strong>Reference:</strong> {selectedItem.title}</p>
                    <p><strong>Name:</strong> {customData.name}</p>
                    <p><strong>Contact:</strong> {customData.contact}</p>
                    <p><strong>Changes:</strong> {customData.changes}</p>
                    <p><strong>Qty:</strong> {customData.qty}</p>
                  </div>

                  <p style={{textAlign:'center', fontSize:'0.9rem', color:'#666', marginBottom:'15px'}}>
                    Send this inquiry to AB Custom Labels on WhatsApp?
                  </p>
                  
                  <button onClick={handleFinalWhatsApp} className="primary-btn" style={{background:'#25D366'}}>
                    <FaWhatsapp size={20} /> Yes, Send on WhatsApp
                  </button>
                  
                  <button onClick={() => setSelectedItem(null)} className="primary-btn secondary-btn">
                    No, Just Browsing
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