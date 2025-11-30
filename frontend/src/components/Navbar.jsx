import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaTimes, FaWhatsapp, FaCheckCircle, FaPaperPlane, FaLightbulb } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    projectType: 'General Order',
    details: '',
    qty: ''
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      // 1. Feed into Inventory
      await axios.post(`${API_URL}/api/orders`, newOrder);
      
      // 2. Show Success / WhatsApp Option
      setSubmitSuccess(true);
    } catch (e) {
      console.error("Error submitting order", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const connectWhatsApp = () => {
    const msg = `*NEW ORDER* 🚀\nID: Saved in Inventory\n👤 Name: ${formData.name}\n📞 Contact: ${formData.contact}\n📝 Request: ${formData.details}\n🔢 Qty: ${formData.qty}`;
    window.open(`https://wa.me/919243858944?text=${encodeURIComponent(msg)}`, '_blank');
    
    // Reset and Close
    setSubmitSuccess(false);
    setModalOpen(false);
    setFormData({ name: '', contact: '', projectType: 'General Order', details: '', qty: '' });
  };

  return (
    <>
      <nav>
        <div className="logo" onClick={() => navigate('/')} style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <img src="/Logos.png" alt="AB Logo" style={{height:'40px', width:'auto'}} /> 
          AB CUSTOM LABELS
        </div>
        
        <div className="nav-links">
          <span className="nav-link" onClick={() => navigate('/')}>Home</span>
          <span className="nav-link" onClick={() => navigate('/gallery/stickers')}>Stickers</span>
          <span className="nav-link" onClick={() => navigate('/gallery/labels')}>Labels</span>
          <span className="nav-link" onClick={() => navigate('/gallery/logos')}>Logos</span>
          <span className="nav-link" onClick={() => navigate('/gallery/cards')}>Cards</span>
          <span className="nav-link" onClick={() => navigate('/career')}>Career</span>
        </div>

        {/* GIVE ORDER BUTTON */}
        <button onClick={() => setModalOpen(true)} className="primary-btn" style={{fontSize:'0.9rem', padding:'12px 24px'}}>
          GIVE ORDER
        </button>
      </nav>

      {/* --- GLOBAL MODAL (Consistent with Home.jsx) --- */}
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
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{
              background: 'white', padding: '30px', borderRadius: '12px',
              width: '90%', maxWidth: '500px', position: 'relative',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)', overflow: 'hidden'
            }}
          >
            <button onClick={() => setModalOpen(false)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer'}}>
              <FaTimes size={20} color="#888"/>
            </button>

            {submitSuccess ? (
              // SUCCESS STATE + WHATSAPP BUTTON
              <div style={{textAlign: 'center', padding: '30px 10px'}}>
                <div style={{width: '70px', height: '70px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
                   <FaCheckCircle size={35} />
                </div>
                <h2 style={{color:'var(--text-main)', marginBottom:'10px'}}>Order Saved!</h2>
                <p style={{color:'var(--text-body)', lineHeight: '1.6', marginBottom: '25px'}}>
                  Your order has been added to our inventory system. Click below to finalize details on WhatsApp.
                </p>
                <button 
                  onClick={connectWhatsApp} 
                  className="primary-btn" 
                  style={{width:'100%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}
                >
                  <FaWhatsapp size={20}/> Connect on WhatsApp
                </button>
              </div>
            ) : (
              // FORM STATE
              <>
                <div style={{marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                   <div style={{background: '#f3e8ff', padding: '10px', borderRadius: '50%', color: 'var(--primary)'}}><FaLightbulb size={20}/></div>
                   <div>
                      <h2 style={{color:'var(--text-main)', margin: 0, fontSize: '1.5rem'}}>Place Order</h2>
                      <p style={{color:'var(--text-body)', margin: 0, fontSize: '0.9rem'}}>Fill details to feed our inventory.</p>
                   </div>
                 </div>

                <form onSubmit={handleFormSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                    <div>
                      <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Name</label>
                      <input name="name" value={formData.name} onChange={handleInputChange} required className="clean-input" placeholder="Your Name" style={{background:'#f8f9fa'}}/>
                    </div>
                    <div>
                      <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Contact</label>
                      <input name="contact" value={formData.contact} onChange={handleInputChange} required className="clean-input" placeholder="+91..." style={{background:'#f8f9fa'}}/>
                    </div>
                  </div>

                  <div>
                    <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Order Type</label>
                    <select name="projectType" value={formData.projectType} onChange={handleInputChange} className="clean-input" style={{width: '100%', background: 'white'}}>
                      <option>Stickers</option>
                      <option>Product Labels</option>
                      <option>Logo Design</option>
                      <option>Packaging</option>
                      <option>Business Cards</option>
                      <option>General Order</option>
                    </select>
                  </div>

                  <div>
                    <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Requirements</label>
                    <textarea name="details" value={formData.details} onChange={handleInputChange} required className="clean-input" rows="3" placeholder="Describe what you need..." style={{background:'#f8f9fa'}}/>
                  </div>

                  <div>
                     <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Quantity</label>
                     <input name="qty" type="number" value={formData.qty} onChange={handleInputChange} required className="clean-input" placeholder="Ex: 500" style={{background:'#f8f9fa'}}/>
                  </div>

                  <button type="submit" className="primary-btn" disabled={isSubmitting} style={{width:'100%', marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '8px'}}>
                     {isSubmitting ? 'Saving...' : <><FaPaperPlane/> Add to Inventory</>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;