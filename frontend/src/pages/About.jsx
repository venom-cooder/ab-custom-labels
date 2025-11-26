import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaClipboardList, FaCheckCircle } from 'react-icons/fa';

// IMPORT FOOTER HERE
import Footer from '../components/Footer';

const About = () => {
  // --- Slideshow Logic ---
  const heroImages = [
    '/images/AboutUs/aboutus1.png',
    '/images/AboutUs/aboutus2.png',
    '/images/AboutUs/aboutus3.png',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const openWhatsApp = (msg) => {
    window.open(`https://wa.me/919243858944?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="app-container">
      
      {/* 1. HERO SLIDESHOW SECTION */}
      <div style={{ position: 'relative', height: '60vh', minHeight:'400px', overflow: 'hidden', borderBottom: '1px solid #222' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            alt={`About Us ${currentImageIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }} // Lower opacity so text pops
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }}
          />
        </AnimatePresence>
        <div style={{
          position:'absolute', top:0, left:0, width:'100%', height:'100%', 
          background:'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9))',
          display:'flex', alignItems:'flex-end', padding:'3rem'
        }}>
          <h1 style={{fontSize:'4rem', color:'white', margin:0, textShadow:'0 2px 10px rgba(0,0,0,0.5)'}}>
            ABOUT <span style={{color:'var(--accent)'}}>US</span>
          </h1>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem', color: '#fff' }}>
        
        {/* Intro */}
        <section style={{ marginBottom: '5rem', textAlign:'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '20px' }}>
            AB Custom Labels
          </h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc', maxWidth:'800px', margin:'0 auto' }}>
            AB Custom Labels was born out of a passion for design, detail, and the power of branding. 
            We started with a simple idea — to help individuals and businesses bring their packaging to life. 
            Today, we create tailored labels that blend creativity with quality for bottles, jars, boxes, and events.
          </p>
        </section>

        {/* Mission, Vision & Values Grid */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {/* Mission */}
            <div style={{ background: '#111', padding: '30px', borderRadius: '12px', border: '1px solid #222' }}>
              <h3 style={{ color: 'var(--accent)', fontSize:'1.5rem', marginBottom:'15px' }}>🎯 Mission</h3>
              <p style={{ color: '#aaa', lineHeight:'1.6' }}>
                To empower businesses, events, and individuals by delivering custom-designed labels that not only reflect their identity but also elevate the value of their products. We aim to combine aesthetic design, durable quality, and personal connection into every label.
              </p>
            </div>
            {/* Vision */}
            <div style={{ background: '#111', padding: '30px', borderRadius: '12px', border: '1px solid #222' }}>
              <h3 style={{ color: 'var(--accent)', fontSize:'1.5rem', marginBottom:'15px' }}>🌍 Vision</h3>
              <p style={{ color: '#aaa', lineHeight:'1.6' }}>
                To become India’s leading and most trusted name in the custom label industry — recognized for our creativity, ethical values, and customer-first approach. We envision a future where every product has access to beautiful labels.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section style={{ marginBottom: '5rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize:'2rem' }}>💎 Our Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign:'center' }}>
            {[
              { icon: '🎨', title: 'Creativity', desc: 'Every label is a canvas for imagination.' },
              { icon: '🏆', title: 'Quality', desc: 'No compromise on materials or precision.' },
              { icon: '🤝', title: 'Integrity', desc: 'Transparent communication and honest service.' },
              { icon: '💬', title: 'Customer Focus', desc: 'We listen, adapt, and deliver beyond expectations.' },
              { icon: '🌱', title: 'Sustainability', desc: 'Actively exploring eco-friendly materials.' },
            ].map((val, index) => (
              <div key={index} style={{ background: '#0a0a0a', padding: '20px', borderRadius: '8px', border: '1px solid #222' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{val.icon}</div>
                <h4 style={{ color: 'white', marginBottom: '10px' }}>{val.title}</h4>
                <p style={{ color: '#888', fontSize:'0.9rem' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize:'2rem' }}>Why Choose Us</h2>
          <p style={{ textAlign: 'center', color: '#ccc', marginBottom: '40px' }}>
            We focus on what truly matters to our clients — <b>speed, creativity, and care.</b>
          </p>
          <div style={{ display: 'grid', gap: '25px' }}>
            {[
              { title: "Fast Turnaround", desc: "We respect your time. We deliver high-quality custom labels on a tight timeline without compromising quality." },
              { title: "Fully Customized Designs", desc: "Every label is designed from scratch based on your needs. From shape to fonts — you dream it, we create it." },
              { title: "Eco-Friendly Options", desc: "We care about the planet. We offer sustainable, recyclable label materials for eco-conscious choices." },
              { title: "Personal Support & Guidance", desc: "You’re never on your own. We work closely with you from concept to delivery with honest advice." },
              { title: "Premium Print Quality", desc: "High-resolution printing and durable materials ensure your labels look sharp, feel premium, and last." },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                 <h3 style={{ color: 'var(--accent)', fontSize:'2rem', lineHeight:'1', opacity:0.6 }}>{i+1}️⃣</h3>
                 <div>
                   <h3 style={{ color: 'white', marginBottom: '10px' }}>{item.title}</h3>
                   <p style={{ color: '#aaa', lineHeight: '1.6' }}>{item.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* 3. BOTTOM CTAs */}
      <div style={{ padding: '4rem 2rem', background: '#080808', textAlign: 'center', borderTop:'1px solid #222' }}>
        <h2 style={{ color: 'white', marginBottom: '20px' }}>Ready to make your label stand out?</h2>
        <p style={{ color: '#888', marginBottom: '30px' }}>Let’s create something custom together.</p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap:'wrap' }}>
          <button 
            onClick={() => openWhatsApp("Hi, I want to give a custom order after reading your About page.")}
            className="primary-btn" 
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <FaClipboardList /> Give Order
          </button>
          <button 
            onClick={() => openWhatsApp("Hi, I'd like to connect and discuss some ideas.")}
            className="big-whatsapp-btn" 
            style={{ width:'auto', padding:'16px 32px' }}
          >
            <FaWhatsapp size={20} /> Connect to WhatsApp
          </button>
        </div>
      </div>

      

    </div>
  );
};

export default About;