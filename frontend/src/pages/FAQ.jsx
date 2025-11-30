import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaQuestionCircle, FaWhatsapp } from 'react-icons/fa';

const FAQ = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  
  // --- STATE ---
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- STATIC CONTENT (From Home.jsx) ---
  const staticFaqs = [
    { 
      question: "What is the minimum order quantity?", 
      answer: "Our minimum order quantity is just 100 labels, making us perfect for small businesses and startups. We also offer sample packs of 10-25 labels for testing purposes." 
    },
    { 
      question: "How long does production take?", 
      answer: "Standard production time is 3-5 business days after design approval. We also offer rush services with 24-48 hour turnaround for urgent orders at an additional cost." 
    },
    { 
      question: "Do you provide design services?", 
      answer: "Yes! Our expert design team can create custom labels from scratch or work with your existing artwork. We provide unlimited revisions until you're completely satisfied with the design." 
    },
    { 
      question: "What materials do you use?", 
      answer: "We use premium materials including vinyl, paper, polyester, and eco-friendly options. All materials are weather-resistant and available in various finishes like matte, gloss, and textured surfaces." 
    },
    { 
      question: "Can you match specific colors?", 
      answer: "Absolutely! We can match Pantone colors, provide color proofs, and ensure brand consistency across all your labels. We use advanced color matching technology for precise results." 
    },
    { 
      question: "Do you ship internationally?", 
      answer: "Yes, we ship worldwide! Domestic orders within India typically arrive in 2-3 days, while international shipping takes 7-14 business days depending on the destination." 
    }
  ];

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/faqs`);
        if (res.data && Array.isArray(res.data)) {
           // Merge backend FAQs with static ones
           setFaqs([...staticFaqs, ...res.data]);
        } else {
           setFaqs(staticFaqs);
        }
      } catch (err) {
        console.error("Error fetching FAQs, using static content only.", err);
        setFaqs(staticFaqs);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [API_URL]);

  return (
    <div className="app-container">
      
      {/* 1. HERO HEADER SECTION (CENTERED WITH BACKGROUND) */}
      <div style={{ position: 'relative', height: '450px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop")', // Professional Abstract Background
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.4)', zIndex: 0
        }}></div>

        {/* Content Centered "In Between" */}
        <div className="container" style={{position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', padding: '0 20px'}}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '20px', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#eee', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6', textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
            Everything you need to know about our custom printing services, billing, design process, and shipping policies.
          </p>
        </div>
      </div>

      {/* 2. FAQ ACCORDION */}
      <div className="container" style={{maxWidth: '900px', margin: '0 auto', padding: '80px 20px'}}>
        
        {loading ? (
          <p style={{textAlign: 'center', color: '#666'}}>Loading questions...</p>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {faqs.map((item, index) => (
              <div 
                key={index} 
                className="strict-card"
                style={{
                  border: '1px solid #e1e4e8', borderRadius: '12px', overflow: 'hidden',
                  background: '#fff', boxShadow: openIndex === index ? '0 10px 30px rgba(0,0,0,0.08)' : '0 2px 5px rgba(0,0,0,0.02)',
                  transition: 'all 0.3s ease'
                }}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  style={{
                    width: '100%', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: openIndex === index ? '#f8f9fa' : '#fff', 
                    border: 'none', cursor: 'pointer', textAlign: 'left', outline: 'none'
                  }}
                >
                  <span style={{fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)'}}>
                    {item.question}
                  </span>
                  <span style={{
                    color: openIndex === index ? 'var(--primary)' : '#ccc', marginLeft: '15px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '30px', height: '30px', borderRadius: '50%', background: openIndex === index ? 'rgba(139, 61, 255, 0.1)' : 'transparent'
                  }}>
                    {openIndex === index ? <FaMinus size={12}/> : <FaPlus size={12}/>}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      transition={{duration: 0.3}}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 25px 30px 25px', color: '#555', lineHeight: '1.7', fontSize: '1rem', borderTop: '1px solid #f0f0f0' }}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        {/* 3. STILL HAVE QUESTIONS CTA */}
        <div style={{marginTop: '80px', padding: '50px', background: '#f8f9fa', borderRadius: '16px', textAlign: 'center', border: '1px solid #eee'}}>
           <div style={{width:'70px', height:'70px', background:'#f3e8ff', color:'var(--primary)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 25px'}}>
              <FaQuestionCircle size={30}/>
           </div>
           <h3 style={{fontWeight: '800', fontSize: '1.8rem', marginBottom: '15px', color: 'var(--text-main)'}}>Still have questions?</h3>
           <p style={{color: '#666', marginBottom: '35px', maxWidth:'600px', margin:'0 auto 35px', fontSize: '1.1rem'}}>
             Can't find the answer you're looking for? Our team is available on WhatsApp to help with custom queries.
           </p>
           <button 
             onClick={() => window.open('https://wa.me/919243858944', '_blank')}
             className="primary-btn" 
             style={{display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 40px', fontSize: '1.1rem'}}
           >
             <FaWhatsapp size={22}/> Get in Touch
           </button>
        </div>

      </div>
    </div>
  );
};

export default FAQ;