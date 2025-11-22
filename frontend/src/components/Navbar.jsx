import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaTimes, FaWhatsapp } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [orderStage, setOrderStage] = useState('FORM'); // FORM -> SUMMARY
  const [isSaving, setIsSaving] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- FORM LOGIC ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const data = new FormData(e.target);
    const newOrder = {
      name: data.get('name'),
      contact: data.get('contact'),
      details: data.get('details'),
      type: 'General Order (Navbar)',
      date: new Date().toLocaleString()
    };
    setFormData(newOrder);
    try { await axios.post(`${API_URL}/api/orders`, newOrder); } catch(e) {}
    setIsSaving(false);
    setOrderStage('SUMMARY');
  };

  const connectWhatsApp = () => {
    const msg = `*NEW ORDER INQUIRY* 🚀\n👤 Name: ${formData.name}\n📞 Contact: ${formData.contact}\n📝 Request: ${formData.details}`;
    window.open(`https://wa.me/919243858944?text=${encodeURIComponent(msg)}`, '_blank');
    setModalOpen(false);
    setOrderStage('FORM');
  };

  return (
    <>
      <nav>
        <div className="logo" onClick={() => navigate('/')} style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <img src="/public/Logos.png" alt="AB" style={{height:'40px'}} /> 
          AB CUSTOM LABELS
        </div>
        
        <div className="nav-links">
          <span className="nav-link" onClick={() => navigate('/gallery/stickers')}>Stickers</span>
          <span className="nav-link" onClick={() => navigate('/gallery/labels')}>Labels</span>
          <span className="nav-link" onClick={() => navigate('/gallery/logos')}>Logos</span>
          <span className="nav-link" onClick={() => navigate('/gallery/cards')}>Cards</span>
          <span className="nav-link" onClick={() => navigate('/career')}>Career</span>
        </div>

        {/* THE BUTTON THAT OPENS THE FORM */}
        <button onClick={() => setModalOpen(true)} className="primary-btn" style={{fontSize:'0.9rem', padding:'12px 24px'}}>
          GIVE ORDER
        </button>
      </nav>

      {/* --- GLOBAL MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <motion.div 
              className="order-modal" 
              onClick={(e) => e.stopPropagation()}
              initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}}
            >
              <button onClick={() => setModalOpen(false)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer'}}>
                <FaTimes size={20} color="#fff"/>
              </button>

              {orderStage === 'FORM' ? (
                <form onSubmit={handleFormSubmit}>
                  <h2 style={{marginBottom:'20px', color:'white'}}>Place Your Order</h2>
                  <p style={{color:'#888', marginBottom:'20px', fontSize:'0.9rem'}}>Fill this form to start the process.</p>
                  
                  <label style={{color:'#ccc', fontSize:'0.9rem'}}>Name</label>
                  <input name="name" required className="clean-input" placeholder="Ex: Rahul Enterprises" />
                  
                  <label style={{color:'#ccc', fontSize:'0.9rem'}}>WhatsApp Number</label>
                  <input name="contact" required className="clean-input" placeholder="+91 99999 99999" />
                  
                  <label style={{color:'#ccc', fontSize:'0.9rem'}}>What do you need?</label>
                  <textarea name="details" required className="clean-input" rows="4" placeholder="I need 500 round stickers for my jars..." />
                  
                  <button type="submit" className="primary-btn" style={{width:'100%'}} disabled={isSaving}>
                    {isSaving ? 'Processing...' : 'Next: Connect WhatsApp'}
                  </button>
                </form>
              ) : (
                <div>
                  <h2 style={{marginBottom:'15px', color:'white'}}>Ready to Connect?</h2>
                  <div className="summary-box">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Req:</strong> {formData.details}</p>
                  </div>
                  <p style={{color:'#888', fontSize:'0.9rem', marginBottom:'20px', textAlign:'center'}}>
                    Your details are saved. Click below to chat with us about pricing.
                  </p>
                  <button onClick={connectWhatsApp} className="big-whatsapp-btn">
                    <FaWhatsapp size={24}/> Chat on WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;