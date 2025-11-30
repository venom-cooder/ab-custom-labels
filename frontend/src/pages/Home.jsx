import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; 
import { FaArrowRight, FaTimes, FaWhatsapp, FaCheckCircle, FaStar, FaCheck, FaPlus, FaMinus, FaPenNib, FaTag, FaIdCard, FaShapes, FaMagic, FaLightbulb, FaPaperPlane } from 'react-icons/fa';

// Animation Components
import TiltCard from '../components/anim/TiltCard';
import ChangingImage from '../components/anim/ChangingImage';
import AuroraBackground from '../components/anim/AuroraBackground'; 

const Home = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- MODAL STATE ---
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    projectType: 'Stickers',
    details: '',
    qty: ''
  });

  // --- HERO TEXT ANIMATION STATE ---
  const [textIndex, setTextIndex] = useState(0);
  const heroPhrases = ["We Build Identity", "We Shape Memories", "We Create Stories", "We Add Emotion"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % heroPhrases.length);
    }, 2000); 
    return () => clearInterval(interval);
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
      details: `PROJECT START: ${formData.projectType} | Desc: ${formData.details}`,
      type: 'New Project Inquiry',
      qty: formData.qty,
      date: new Date().toLocaleString()
    };

    try {
      // Send directly to Backend Inventory
      await axios.post(`${API_URL}/api/orders`, newOrder);
      setSubmitSuccess(true);
      setFormData({ name: '', contact: '', projectType: 'Stickers', details: '', qty: '' });
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setOrderModalOpen(false);
      }, 3000);
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Data Arrays
  const services = [
    { icon: "🎨", title: "Custom Design", desc: "Bespoke label designs tailored to your brand identity.", features: ["Brand consultation", "Unlimited revisions"] },
    { icon: "🏭", title: "Premium Printing", desc: "State-of-the-art printing technology with premium materials.", features: ["High-res printing", "Weather resistant"] },
    { icon: "🚚", title: "Fast Delivery", desc: "Quick turnaround times without compromising quality.", features: ["3-5 day production", "Tracking included"] },
    { icon: "📏", title: "Any Size & Shape", desc: "Custom sizes and shapes to fit any product.", features: ["Die-cut shapes", "Perfect fit guarantee"] },
    { icon: "✨", title: "Special Finishes", desc: "Luxury finishes that make your products stand out.", features: ["Gold/silver foil", "UV spot coating"] },
    { icon: "🎯", title: "Industry Expertise", desc: "Specialized knowledge across industries.", features: ["FDA compliance", "Expert consultation"] }
  ];

  const showcaseItems = [
    { icon: "🍷", title: "Wine & Spirits", desc: "Premium labels for luxury beverages" },
    { icon: "💄", title: "Cosmetics", desc: "Beautiful labels for beauty products" },
    { icon: "🥗", title: "Food & Beverage", desc: "Appetizing labels that sell products" },
    { icon: "💊", title: "Healthcare", desc: "Compliant labels for medical products" }
  ];

  const additionalServices = [
    { icon: "🏷️", title: "Sticker Printing", desc: "High-quality stickers for promotions." },
    { icon: "📦", title: "Packaging Labels", desc: "Complete packaging solutions." },
    { icon: "🎨", title: "Brand Consultation", desc: "Expert guidance on brand identity." },
    { icon: "⚡", title: "Rush Orders", desc: "Same-day and 24-hour rush printing." },
    { icon: "🔒", title: "Security Labels", desc: "Tamper-evident labels for protection." },
    { icon: "📱", title: "QR Code Labels", desc: "Smart labels for digital engagement." },
    { icon: "🌿", title: "Eco-Friendly Options", desc: "Sustainable label materials." },
    { icon: "🎯", title: "Variable Data Printing", desc: "Personalized labels with unique codes." }
  ];

  const gallerySections = [
    { title: 'Stickers', type: 'stickers' },
    { title: 'Labels', type: 'labels' },
    { title: 'Logos', type: 'logos' },
    { title: 'Cards', type: 'cards' }
  ];

  const faqData = [
    { q: "What is the minimum order quantity?", a: "Our minimum order quantity is just 100 labels, making us perfect for small businesses and startups." },
    { q: "How long does production take?", a: "Standard production time is 3-5 business days after design approval. Rush options available." },
    { q: "Do you provide design services?", a: "Yes! Our expert design team can create custom labels from scratch or work with your existing artwork." },
    { q: "What materials do you use?", a: "We use premium materials including vinyl, paper, polyester, and eco-friendly options." },
    { q: "Can you match specific colors?", a: "Absolutely! We can match Pantone colors and provide color proofs." },
    { q: "Do you ship internationally?", a: "Yes, we ship worldwide! International shipping takes 7-14 business days." }
  ];

  const whyChooseUs = [
    { title: "Premium Quality", desc: "Industry-leading materials and printing technology" },
    { title: "Fast Turnaround", desc: "3-5 day standard production, rush options available" },
    { title: "Expert Design Team", desc: "Professional designers with industry expertise" },
    { title: "Competitive Pricing", desc: "Best value for premium quality labels" }
  ];

  return (
    <div className="app-container">
      
      {/* 1. HERO SECTION */}
      <div className="distortion-wrapper" style={{ height: '80vh', minHeight: '600px' }}>
        <div 
          className="hero-static-bg" 
          style={{ 
            backgroundImage: "url('/images/Home.png')",
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'brightness(0.5)', 
            zIndex: 0
          }}
        ></div>
        
        <div className="hero-overlay" style={{ paddingTop: '0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '10px', color: 'white', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
            We Don’t Print Labels…
          </h1>

          <div style={{ height: '60px', marginBottom: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={textIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  fontSize: '2.5rem', fontWeight: '800', 
                  background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  margin: 0
                }}
              >
                → {heroPhrases[textIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>
          
          <p className="hero-desc" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto 50px auto', fontSize: '1.2rem', lineHeight: '1.6', fontWeight: '500', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            AB Custom Labels is your design partner. Waterproof labels, stickers, and premium branding assets delivered to your door.
          </p>

          <div className="hero-buttons-grid">
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/logos')}><FaPenNib color="var(--primary)"/> Logos</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/labels')}><FaTag color="var(--accent)"/> Labels</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/cards')}><FaIdCard color="#E1306C"/> Cards</button>
            <button className="category-rect-btn" onClick={()=>navigate('/gallery/stickers')}><FaShapes color="#25D366"/> Stickers</button>
          </div>
          
          <div style={{marginTop: '40px'}}>
             <button onClick={() => setOrderModalOpen(true)} className="primary-btn" style={{padding: '16px 40px', fontSize: '1.1rem', boxShadow: '0 0 20px rgba(139, 61, 255, 0.5)'}}>
               Start Your Project
             </button>
          </div>
        </div>
      </div>

      {/* 2. WHAT WE MAKE */}
      <section className="make-section">
        <div className="make-text">
          <h2>Quality you can <span style={{color:'var(--primary)'}}>feel.</span></h2>
          <p>
            We don't just print; we craft experiences. From matte-finish business cards to die-cut vinyl stickers that withstand the elements.
          </p>
          <div style={{marginTop:'30px'}}>
            <button className="primary-btn" onClick={() => setOrderModalOpen(true)}>Start a Custom Order</button>
          </div>
        </div>

        <div className="make-visual">
          <div className="live-grid">
            <ChangingImage folder="Stickers" prefix="stickers" count={5} label="Stickers" />
            <ChangingImage folder="Logos" prefix="logo" count={5} label="Logos" />
            <ChangingImage folder="Labels" prefix="labels" count={5} label="Labels" />
            <ChangingImage folder="Cards" prefix="cards" count={5} label="Cards" />
          </div>
        </div>
      </section>

      {/* 3. AI INTELLIGENCE */}
      <section style={{ position: 'relative', minHeight: '600px', overflow: 'hidden', display: 'flex', alignItems: 'center', background:'#f8f9fa' }}>
        <div style={{ 
          position: 'relative', zIndex: 1, 
          display: 'grid', gridTemplateColumns: '1fr 1fr', 
          maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', 
          gap: '60px', alignItems: 'center' 
        }}>
          <div>
            <span style={{ 
              background: 'rgba(139, 61, 255, 0.1)', color: 'var(--primary)', 
              padding: '8px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '700', 
              marginBottom: '20px', display: 'inline-block', letterSpacing: '1px'
            }}>
              NEW INTELLIGENCE
            </span>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '20px', color: '#111', lineHeight: '1.1' }}>
              Meet Your <br/>
              <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Brand Identity Builder AI
              </span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6', marginBottom: '30px' }}>
              Not sure if your design is print-ready? Our AI analyzes your brand colors, shapes, and typography to give you a <strong>Professional Print Score</strong>.
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333', fontWeight: '600' }}>
                <FaCheckCircle color="#25D366" /> Instant Design Rating
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333', fontWeight: '600' }}>
                <FaMagic color="var(--primary)" /> Material Suggestions
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TiltCard className="ai-action-card" style={{width: '100%', maxWidth: '450px', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.8)', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 60px rgba(139, 61, 255, 0.15)', textAlign: 'center'}}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-primary)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(139, 61, 255, 0.3)' }}>
                <FaStar size={35} color="white" />
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#111', marginBottom: '10px' }}>Check Your Brand Score</h3>
              <p style={{ color: '#666', marginBottom: '30px' }}>Use our AI Studio to generate and rate your next label design concept in seconds.</p>
              <button onClick={() => navigate('/ai-design')} className="primary-btn" style={{ width: '100%', fontSize: '1rem', padding: '16px' }}>
                Launch AI Studio <FaArrowRight style={{ marginLeft: '8px' }} />
              </button>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT SHOWCASE */}
      <section style={{ position: 'relative', minHeight: '500px', overflow: 'hidden', display: 'flex', alignItems: 'center', background:'#fff' }}>
        <AuroraBackground />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '20px', color: '#111' }}>Product Showcase</h2>
          <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6', marginBottom: '50px', maxWidth: '800px', margin: '0 auto 50px' }}>
            From boutique brands to enterprise solutions, our custom labels enhance products across every industry.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {showcaseItems.map((item, index) => (
              <TiltCard key={index} className="service-card" style={{textAlign: 'center', alignItems: 'center', padding: '1.5rem', minHeight: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '700' }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES */}
      <section className="services-section">
        <div className="services-header">
          <h2>Our Services</h2>
          <p>From concept to creation, we deliver exceptional custom labels that elevate your brand and captivate your customers.</p>
        </div>
        <div className="services-grid">
          {services.map((service, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <ul className="service-list">
                {service.features.map((feature, j) => (
                  <li key={j}><FaCheck className="check-icon"/> {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ADDITIONAL SERVICES */}
      <section className="additional-services-section">
        <div className="additional-services-header">
          <h2>Additional Services</h2>
          <p>Beyond basic labels, we offer comprehensive solutions to meet all your branding and packaging needs.</p>
        </div>
        <div className="additional-services-grid">
          {additionalServices.map((service, index) => (
            <div key={index} className="add-service-card">
              <div className="add-service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SEGREGATED GALLERY (UPDATED: 3 In Row + Fixed Sizes) */}
      <section className="segregated-gallery-section">
        {gallerySections.map((section) => (
          <div key={section.type} style={{ marginBottom: '60px' }}>
            <div className="category-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h3>{section.title}</h3>
            </div>
            
            {/* STRICT GRID: 3 COLS, FIXED HEIGHT */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', width: '100%' }}>
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => navigate(`/gallery/${section.type}`)}
                  style={{
                    border: '1px solid #e1e4e8', borderRadius: '4px', background: '#fff',
                    overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {/* FIXED IMAGE BOX */}
                  <div style={{
                    height: '250px', width: '100%', background: '#f9fafb', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    borderBottom: '1px solid #eee', padding: '20px'
                  }}>
                    <img 
                      src={`/images/${section.title}/${section.type === 'logos' ? 'logo' : section.type}${i + 1}.png`} 
                      alt={`${section.title} ${i+1}`} 
                      loading="lazy"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                         e.target.style.display='none'; // Hides broken image icon
                         e.target.parentNode.innerHTML = '<div style="color:#ccc">Image Preview</div>'; // Fallback text
                      }}
                    />
                  </div>
                  
                  {/* TEXT */}
                  <div style={{padding: '20px', textAlign: 'center'}}>
                    <div style={{fontWeight: '700', fontSize: '1rem', color: '#111'}}>{section.title} Design #{i+1}</div>
                    <div style={{fontSize: '0.85rem', color: '#888', marginTop: '5px'}}>Customizable • Premium</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{textAlign:'center', marginTop:'30px'}}>
               <button onClick={()=>navigate(`/gallery/${section.type}`)} className="category-rect-btn" style={{width:'auto', display:'inline-flex', background: 'var(--primary)', color:'white', border:'none'}}>
                 Explore {section.title} Collection <FaArrowRight/>
               </button>
            </div>
          </div>
        ))}
      </section>

      {/* 8. WHY CHOOSE US */}
      <section style={{ position: 'relative', padding: '6rem 5%', overflow: 'hidden', textAlign: 'center', background:'#f8f9fa' }}>
        <AuroraBackground />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '40px', color: 'var(--text-main)' }}>Why Choose AB Custom Labels?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {whyChooseUs.map((item, i) => (
              <div key={i} style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <FaCheckCircle size={40} color="var(--primary)" style={{ marginBottom: '15px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQS */}
      <section style={{ padding: '6rem 5%', background: '#fff', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '800', textAlign: 'center', marginBottom: '40px', color: 'var(--text-main)' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {faqData.map((item, i) => (
            <div key={i} style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
              <button 
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                style={{
                  width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: '#f9fafb', border: 'none', cursor: 'pointer', fontSize: '1.1rem', fontWeight: '600', textAlign: 'left'
                }}
              >
                {item.q}
                {openFaqIndex === i ? <FaMinus color="var(--primary)"/> : <FaPlus color="#ccc"/>}
              </button>
              <AnimatePresence>
                {openFaqIndex === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden', background: '#fff' }}>
                    <p style={{ padding: '20px', color: '#666', lineHeight: '1.6', margin: 0 }}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================= */}
      {/* ============ START PROJECT MODAL (UPDATED) ============ */}
      {/* ======================================================= */}
      {isOrderModalOpen && (
        <div className="modal-overlay" onClick={()=>setOrderModalOpen(false)}>
          <div className="order-modal" onClick={e=>e.stopPropagation()} style={{maxWidth: '500px'}}>
             <button onClick={() => setOrderModalOpen(false)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer'}}><FaTimes size={20} color="#888"/></button>
             
             {submitSuccess ? (
               <div style={{textAlign: 'center', padding: '30px 10px'}}>
                 <div style={{width: '70px', height: '70px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
                    <FaCheckCircle size={35} />
                 </div>
                 <h2 style={{color:'var(--text-main)', marginBottom:'10px'}}>Project Started!</h2>
                 <p style={{color:'var(--text-body)', lineHeight: '1.6'}}>We have received your request. Our team has added it to the inventory and will contact you shortly.</p>
               </div>
             ) : (
               <>
                 <div style={{marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                   <div style={{background: '#f3e8ff', padding: '10px', borderRadius: '50%', color: 'var(--primary)'}}><FaLightbulb size={20}/></div>
                   <div>
                      <h2 style={{color:'var(--text-main)', margin: 0, fontSize: '1.5rem'}}>Start New Project</h2>
                      <p style={{color:'var(--text-body)', margin: 0, fontSize: '0.9rem'}}>Tell us what you need.</p>
                   </div>
                 </div>
                 
                 <form onSubmit={handleFormSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                      <div>
                        <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Name</label>
                        <input name="name" value={formData.name} onChange={handleInputChange} required className="clean-input" placeholder="Your Name" />
                      </div>
                      <div>
                        <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Contact</label>
                        <input name="contact" value={formData.contact} onChange={handleInputChange} required className="clean-input" placeholder="+91..." />
                      </div>
                    </div>

                    <div>
                      <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Project Type</label>
                      <select name="projectType" value={formData.projectType} onChange={handleInputChange} className="clean-input" style={{width: '100%', background: 'white'}}>
                        <option>Stickers</option>
                        <option>Product Labels</option>
                        <option>Logo Design</option>
                        <option>Packaging</option>
                        <option>Business Cards</option>
                      </select>
                    </div>

                    <div>
                      <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Project Details</label>
                      <textarea name="details" value={formData.details} onChange={handleInputChange} required className="clean-input" rows="3" placeholder="Describe size, colors, or specific ideas..." />
                    </div>

                    <div>
                       <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Quantity</label>
                       <input name="qty" type="number" value={formData.qty} onChange={handleInputChange} required className="clean-input" placeholder="Ex: 500" />
                    </div>

                    <button type="submit" className="primary-btn" disabled={isSubmitting} style={{width:'100%', marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '8px'}}>
                       {isSubmitting ? 'Sending...' : <><FaPaperPlane/> Send to Inventory</>}
                    </button>
                 </form>
               </>
             )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;