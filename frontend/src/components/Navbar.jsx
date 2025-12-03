import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// --- INTERNAL ICONS (No Lucide/React-Icons needed) ---
const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const IconCheck = () => (
  <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
const IconWhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  
  // States
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '', contact: '', projectType: 'General Order', details: '', qty: ''
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- HANDLERS ---
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newOrder = {
      name: formData.name,
      contact: formData.contact,
      details: `NAVBAR ORDER: ${formData.projectType} | ${formData.details}`,
      type: 'Navbar Inquiry',
      qty: formData.qty,
      date: new Date().toLocaleString()
    };
    try {
      await axios.post(`${API_URL}/api/orders`, newOrder);
      setSubmitSuccess(true);
    } catch (e) { console.error(e); } finally { setIsSubmitting(false); }
  };

  const connectWhatsApp = () => {
    const msg = `*NEW ORDER* 🚀\nID: Saved in Inventory\n👤 Name: ${formData.name}\n📞 Contact: ${formData.contact}\n📝 Request: ${formData.details}\n🔢 Qty: ${formData.qty}`;
    window.open(`https://wa.me/919243858944?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitSuccess(false); setModalOpen(false);
    setFormData({ name: '', contact: '', projectType: 'General Order', details: '', qty: '' });
  };

  // Helper to close mobile menu on navigation
  const handleNav = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '15px 5%', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        position: 'sticky', top: 0, zIndex: 1000
      }}>
        
        {/* 1. LOGO */}
        <div onClick={() => handleNav('/')} style={{display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', fontWeight:'800', fontSize:'1.2rem', letterSpacing:'-0.5px'}}>
          <img src="/Logos.png" alt="AB Logo" style={{height:'35px', width:'auto'}} /> 
          <span className="hidden md:inline">AB CUSTOM LABELS</span>
        </div>
        
        {/* 2. DESKTOP LINKS (Hidden on Mobile) */}
        <div className="desktop-menu" style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
          <style>{`
            .desktop-menu { display: flex; }
            .mobile-toggle { display: none; }
            @media (max-width: 1024px) {
              .desktop-menu { display: none !important; }
              .mobile-toggle { display: block !important; }
            }
            .nav-link { cursor: pointer; font-weight: 500; color: #555; transition: 0.2s; font-size: 0.9rem; }
            .nav-link:hover { color: #8B3DFF; }
          `}</style>
          
          <span className="nav-link" onClick={() => navigate('/')}>Home</span>
          <span className="nav-link" onClick={() => navigate('/gallery/stickers')}>Stickers</span>
          <span className="nav-link" onClick={() => navigate('/gallery/labels')}>Labels</span>
          <span className="nav-link" onClick={() => navigate('/gallery/logos')}>Logos</span>
          <span className="nav-link" onClick={() => navigate('/gallery/cards')}>Cards</span>
          <span className="nav-link" onClick={() => navigate('/gallery/posters')}>Posters</span>
          <span className="nav-link" onClick={() => navigate('/gallery/banners')}>Banners</span>
          <span className="nav-link" onClick={() => navigate('/career')}>Career</span>
          
          <button onClick={() => setModalOpen(true)} className="primary-btn" style={{fontSize:'0.85rem', padding:'10px 20px'}}>
            GIVE ORDER
          </button>
        </div>

        {/* 3. MOBILE TOGGLE */}
        <div className="mobile-toggle">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} style={{background:'none', border:'none', cursor:'pointer', color:'#333'}}>
            {isMobileMenuOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </nav>

      {/* 4. MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{
              position:'fixed', top:'70px', left:0, width:'100%', background:'white', 
              boxShadow:'0 10px 20px rgba(0,0,0,0.1)', zIndex:999, padding:'20px',
              display: 'flex', flexDirection: 'column', gap: '15px'
            }}
          >
             <span onClick={() => handleNav('/')} style={{fontSize:'1.1rem', fontWeight:'600'}}>Home</span>
             <span onClick={() => handleNav('/gallery/stickers')} style={{fontSize:'1.1rem'}}>Stickers</span>
             <span onClick={() => handleNav('/gallery/labels')} style={{fontSize:'1.1rem'}}>Labels</span>
             <span onClick={() => handleNav('/gallery/logos')} style={{fontSize:'1.1rem'}}>Logos</span>
             <span onClick={() => handleNav('/gallery/cards')} style={{fontSize:'1.1rem'}}>Cards</span>
             <span onClick={() => handleNav('/gallery/posters')} style={{fontSize:'1.1rem', color:'#8B3DFF'}}>Posters</span>
             <span onClick={() => handleNav('/gallery/banners')} style={{fontSize:'1.1rem', color:'#00C4CC'}}>Banners</span>
             <span onClick={() => handleNav('/career')} style={{fontSize:'1.1rem'}}>Career</span>
             <hr style={{borderTop:'1px solid #eee'}}/>
             <button onClick={() => { setModalOpen(true); setMobileMenuOpen(false); }} className="primary-btn" style={{width:'100%', justifyContent:'center'}}>
                GIVE ORDER
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ORDER MODAL --- */}
      {isModalOpen && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.85)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(5px)'
          }}
          onClick={() => setModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} style={{background: 'white', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '500px', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.5)'}}>
            <button onClick={() => setModalOpen(false)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer', color:'#888'}}>
              <IconX />
            </button>

            {submitSuccess ? (
              <div style={{textAlign: 'center', padding: '30px 10px'}}>
                <div style={{width: '70px', height: '70px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
                  <IconCheck />
                </div>
                <h2 style={{color:'var(--text-main)', marginBottom:'10px'}}>Order Saved!</h2>
                <button onClick={connectWhatsApp} className="primary-btn" style={{width:'100%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}>
                  <IconWhatsApp /> Connect on WhatsApp
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                  <h2 style={{fontSize: '1.5rem', margin:0}}>Place Order</h2>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                    <input name="name" value={formData.name} onChange={handleInputChange} required className="clean-input" placeholder="Name" style={{background:'#f8f9fa'}}/>
                    <input name="contact" value={formData.contact} onChange={handleInputChange} required className="clean-input" placeholder="Contact" style={{background:'#f8f9fa'}}/>
                  </div>
                  <select name="projectType" value={formData.projectType} onChange={handleInputChange} className="clean-input" style={{width: '100%', background: 'white'}}>
                      {['Stickers','Product Labels','Logo Design','Business Cards','Posters','Banners','General Order'].map(o=><option key={o}>{o}</option>)}
                  </select>
                  <textarea name="details" value={formData.details} onChange={handleInputChange} required className="clean-input" rows="3" placeholder="Describe requirement..." style={{background:'#f8f9fa'}}/>
                  <input name="qty" type="number" value={formData.qty} onChange={handleInputChange} required className="clean-input" placeholder="Quantity" style={{background:'#f8f9fa'}}/>
                  <button type="submit" className="primary-btn" disabled={isSubmitting} style={{width:'100%', justifyContent:'center'}}>{isSubmitting ? 'Saving...' : 'Add to Inventory'}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;