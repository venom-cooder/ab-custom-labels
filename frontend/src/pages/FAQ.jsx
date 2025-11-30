import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaQuestionCircle, FaWhatsapp, FaSearch } from 'react-icons/fa';

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
           // Note: Backend FAQs usually have 'question' and 'answer' fields based on standard schemas
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
      
      {/* 1. HEADER SECTION */}
      <div className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about our products and billing.</p>
      </div>

      {/* 2. FAQ ACCORDION */}
      <div className="container" style={{maxWidth: '800px', margin: '0 auto', paddingBottom: '80px', paddingLeft:'20px', paddingRight:'20px'}}>
        
        {loading ? (
          <p style={{textAlign: 'center', color: '#666'}}>Loading questions...</p>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            {faqs.map((item, index) => (
              <div 
                key={index} 
                className="strict-card"
                style={{
                  border: '1px solid #e1e4e8', borderRadius: '8px', overflow: 'hidden',
                  background: '#fff', boxShadow: openIndex === index ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  style={{
                    width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: openIndex === index ? '#f9fafb' : '#fff', 
                    border: 'none', cursor: 'pointer', textAlign: 'left', outline: 'none'
                  }}
                >
                  <span style={{fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)'}}>
                    {item.question}
                  </span>
                  <span style={{color: openIndex === index ? 'var(--primary)' : '#ccc', marginLeft: '15px'}}>
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
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
                      <div style={{ padding: '0 20px 25px 20px', color: '#555', lineHeight: '1.6', fontSize: '0.95rem' }}>
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
        <div style={{marginTop: '60px', padding: '40px', background: '#f8f9fa', borderRadius: '12px', textAlign: 'center', border: '1px solid #eee'}}>
           <div style={{width:'60px', height:'60px', background:'#f3e8ff', color:'var(--primary)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px'}}>
              <FaQuestionCircle size={24}/>
           </div>
           <h3 style={{fontWeight: '800', fontSize: '1.5rem', marginBottom: '10px', color: 'var(--text-main)'}}>Still have questions?</h3>
           <p style={{color: '#666', marginBottom: '30px', maxWidth:'500px', margin:'0 auto 30px'}}>
             Can't find the answer you're looking for? Please chat to our friendly team.
           </p>
           <button 
             onClick={() => window.open('https://wa.me/919243858944', '_blank')}
             className="primary-btn" 
             style={{display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 30px'}}
           >
             <FaWhatsapp size={20}/> Get in Touch
           </button>
        </div>

      </div>
    </div>
  );
};

export default FAQ;