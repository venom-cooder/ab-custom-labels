import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaCheckCircle, FaWhatsapp, FaTimes, FaLightbulb, FaPaperPlane, FaAward, FaUsers, FaPrint, FaLeaf } from 'react-icons/fa';
import AuroraBackground from '../components/anim/AuroraBackground';

const About = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- ANIMATION STATE (Top Section) ---
  const [stepIndex, setStepIndex] = useState(0);
  const steps = [
    { title: "Idea", desc: "You share your vision or brand concept.", img: "/images/Step1.png" },
    { title: "Sketch", desc: "Our artists create the visual story.", img: "/images/Step2.png" },
    { title: "Design", desc: "We refine typography, colors, and shape.", img: "/images/Step3.png" },
    { title: "Print", desc: "Production on high-end industrial printers.", img: "/images/Step4.png" },
    { title: "Deliver", desc: "Your premium labels arrive ready to stick.", img: "/images/Step5.png" }
  ];

  // --- MODAL & FORM STATE ---
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    projectType: 'Consultation',
    details: '',
    qty: ''
  });

  // --- EFFECTS ---
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(stepInterval);
  }, []);

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
      details: `ABOUT PAGE INQUIRY: ${formData.projectType} | ${formData.details}`,
      type: 'New Inquiry',
      qty: formData.qty,
      date: new Date().toLocaleString()
    };

    try {
      // 1. Save to Inventory
      await axios.post(`${API_URL}/api/orders`, newOrder);
      // 2. Show Success
      setSubmitSuccess(true);
    } catch (e) {
      console.error("Error submitting", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const connectWhatsApp = () => {
    const msg = `*NEW INQUIRY* (from About Page) 🚀\n👤 Name: ${formData.name}\n📞 Contact: ${formData.contact}\n📝 Request: ${formData.details}\n🔢 Qty: ${formData.qty}`;
    window.open(`https://wa.me/919243858944?text=${encodeURIComponent(msg)}`, '_blank');
    
    // Reset
    setSubmitSuccess(false);
    setModalOpen(false);
    setFormData({ name: '', contact: '', projectType: 'Consultation', details: '', qty: '' });
  };

  return (
    <div className="app-container">
      
      {/* ========================================================== */}
      {/* 1. TOP SECTION: 5-STEP PROCESS (AURORA BG) - SAME AS GALLERY */}
      {/* ========================================================== */}
      <div style={{position:'relative', height:'500px', overflow:'hidden', display:'flex', alignItems:'center', background:'#fff', borderBottom:'1px solid #eee'}}>
        <AuroraBackground />
        <div className="container" style={{position:'relative', zIndex:1, maxWidth:'1200px', margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', alignItems:'center', padding:'0 2rem'}}>
          
          {/* Text Animation */}
          <div style={{paddingRight:'40px'}}>
             <AnimatePresence mode="wait">
               <motion.div
                 key={stepIndex}
                 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                 transition={{ duration: 0.5 }}
               >
                 <h2 style={{fontSize:'3.5rem', fontWeight:'900', color:'var(--text-main)', marginBottom:'10px', lineHeight:'1.1'}}>
                   {steps[stepIndex].title} <span style={{color:'var(--primary)'}}>→</span>
                 </h2>
                 <p style={{fontSize:'1.3rem', color:'#555', lineHeight:'1.6'}}>
                   {steps[stepIndex].desc}
                 </p>
                 <div style={{display:'flex', gap:'8px', marginTop:'30px'}}>
                   {steps.map((_, i) => (
                     <div key={i} style={{width: i === stepIndex ? '25px' : '8px', height:'8px', borderRadius:'4px', background: i === stepIndex ? 'var(--primary)' : '#ddd', transition: '0.3s'}}/>
                   ))}
                 </div>
               </motion.div>
             </AnimatePresence>
          </div>

          {/* Image Animation */}
          <div style={{height:'350px', display:'flex', justifyContent:'center', alignItems:'center'}}>
             <AnimatePresence mode="wait">
               <motion.img
                 key={stepIndex} src={steps[stepIndex].img} alt="Process Step"
                 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                 style={{maxHeight:'100%', maxWidth:'100%', borderRadius:'16px', boxShadow:'0 20px 50px rgba(0,0,0,0.1)', objectFit: 'contain'}}
                 onError={(e) => e.target.src = 'https://placehold.co/400x300?text=Process+Step'} 
               />
             </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* 2. ABOUT CONTENT (Clean/Professional Theme) */}
      {/* ========================================================== */}
      <div className="page-header">
        <h1>Crafting Identity Since 2020</h1>
        <p>We are a team of designers, printers, and brand strategists obsessed with perfection.</p>
      </div>

      <div className="container" style={{maxWidth:'1000px', margin:'0 auto', paddingBottom:'80px', paddingLeft:'20px', paddingRight:'20px'}}>
        
        {/* Story Block */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'50px', alignItems:'center', marginBottom:'80px'}}>
           <div>
              <h2 style={{fontSize:'2rem', fontWeight:'800', marginBottom:'20px', color:'var(--text-main)'}}>More Than Just A Printer.</h2>
              <p style={{color:'#555', lineHeight:'1.8', marginBottom:'20px'}}>
                AB Custom Labels started with a simple idea: <strong>Quality shouldn't be complicated.</strong> We realized that businesses struggled to find reliable suppliers who could deliver premium, waterproof, and die-cut labels without massive minimum order quantities.
              </p>
              <p style={{color:'#555', lineHeight:'1.8'}}>
                Today, we serve hundreds of brands across India, providing everything from wine labels to industrial stickers, all printed on state-of-the-art digital machinery.
              </p>
           </div>
           <div style={{background:'#f9fafb', borderRadius:'12px', padding:'40px', textAlign:'center'}}>
              <div style={{fontSize:'4rem', fontWeight:'900', color:'var(--primary)'}}>10k+</div>
              <div style={{color:'#888', fontWeight:'600', marginBottom:'30px'}}>Orders Delivered</div>
              <div style={{fontSize:'4rem', fontWeight:'900', color:'var(--accent)'}}>99%</div>
              <div style={{color:'#888', fontWeight:'600'}}>On-Time Delivery</div>
           </div>
        </div>

        {/* Values Grid */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'30px', marginBottom:'80px'}}>
           <div className="strict-card" style={{padding:'30px', textAlign:'center', height:'auto'}}>
              <FaAward size={40} color="var(--primary)" style={{margin:'0 auto 20px'}}/>
              <h3 style={{fontSize:'1.2rem', fontWeight:'700', marginBottom:'10px'}}>Premium Quality</h3>
              <p style={{color:'#666', fontSize:'0.9rem'}}>We use only Avery Dennison stock and UV-resistant inks.</p>
           </div>
           <div className="strict-card" style={{padding:'30px', textAlign:'center', height:'auto'}}>
              <FaUsers size={40} color="var(--primary)" style={{margin:'0 auto 20px'}}/>
              <h3 style={{fontSize:'1.2rem', fontWeight:'700', marginBottom:'10px'}}>Customer First</h3>
              <p style={{color:'#666', fontSize:'0.9rem'}}>Direct WhatsApp support for every single order.</p>
           </div>
           <div className="strict-card" style={{padding:'30px', textAlign:'center', height:'auto'}}>
              <FaLeaf size={40} color="var(--primary)" style={{margin:'0 auto 20px'}}/>
              <h3 style={{fontSize:'1.2rem', fontWeight:'700', marginBottom:'10px'}}>Eco Conscious</h3>
              <p style={{color:'#666', fontSize:'0.9rem'}}>Offering sustainable and biodegradable label options.</p>
           </div>
        </div>

        {/* ========================================================== */}
        {/* 3. BOTTOM CTA (Triggers Modal) */}
        {/* ========================================================== */}
        <div style={{background:'#0d1216', borderRadius:'16px', padding:'60px', textAlign:'center', color:'white'}}>
           <FaPrint size={50} style={{marginBottom:'20px', opacity:0.8}}/>
           <h2 style={{fontSize:'2.5rem', fontWeight:'800', marginBottom:'20px', color:'white'}}>Ready to Print Your Vision?</h2>
           <p style={{color:'#a0aec0', marginBottom:'40px', maxWidth:'600px', margin:'0 auto 40px'}}>
             Whether you need 50 stickers or 50,000 labels, we are ready to help. Start your project today.
           </p>
           <button 
             onClick={() => setModalOpen(true)} 
             className="primary-btn" 
             style={{padding:'16px 40px', fontSize:'1.1rem', background:'white', color:'black', border:'none'}}
           >
             Start Your Project Now
           </button>
        </div>

      </div>

      {/* ========================================================== */}
      {/* 4. THE MODAL (INVENTORY -> WHATSAPP) */}
      {/* ========================================================== */}
      <AnimatePresence>
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
            <motion.div 
              initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}}
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
                // SUCCESS STATE
                <div style={{textAlign: 'center', padding: '30px 10px'}}>
                  <div style={{width: '70px', height: '70px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
                     <FaCheckCircle size={35} />
                  </div>
                  <h2 style={{color:'var(--text-main)', marginBottom:'10px'}}>Inquiry Saved!</h2>
                  <p style={{color:'var(--text-body)', lineHeight: '1.6', marginBottom:'25px'}}>
                    We've added your project to our system. Let's discuss the finer details on WhatsApp.
                  </p>
                  <button 
                    onClick={connectWhatsApp} 
                    className="primary-btn" 
                    style={{width:'100%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}
                  >
                    <FaWhatsapp size={20}/> Continue to WhatsApp
                  </button>
                </div>
              ) : (
                // FORM STATE
                <>
                  <div style={{marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                     <div style={{background: '#f3e8ff', padding: '10px', borderRadius: '50%', color: 'var(--primary)'}}><FaLightbulb size={20}/></div>
                     <div>
                        <h2 style={{color:'var(--text-main)', margin: 0, fontSize: '1.5rem'}}>Start Project</h2>
                        <p style={{color:'var(--text-body)', margin: 0, fontSize: '0.9rem'}}>Tell us about your needs.</p>
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
                      <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Project Type</label>
                      <select name="projectType" value={formData.projectType} onChange={handleInputChange} className="clean-input" style={{width: '100%', background: 'white'}}>
                        <option>Consultation</option>
                        <option>Stickers</option>
                        <option>Product Labels</option>
                        <option>Packaging</option>
                        <option>Bulk Printing</option>
                      </select>
                    </div>

                    <div>
                      <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Project Details</label>
                      <textarea name="details" value={formData.details} onChange={handleInputChange} required className="clean-input" rows="3" placeholder="Describe your vision..." style={{background:'#f8f9fa'}}/>
                    </div>

                    <div>
                       <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Estimated Quantity</label>
                       <input name="qty" type="number" value={formData.qty} onChange={handleInputChange} required className="clean-input" placeholder="Ex: 1000" style={{background:'#f8f9fa'}}/>
                    </div>

                    <button type="submit" className="primary-btn" disabled={isSubmitting} style={{width:'100%', marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '8px'}}>
                       {isSubmitting ? 'Saving...' : <><FaPaperPlane/> Add to Inventory</>}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default About;