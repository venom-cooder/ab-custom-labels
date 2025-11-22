import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="app-container" style={{paddingTop:'4rem'}}>
      <div style={{maxWidth:'900px', margin:'0 auto', padding:'2rem', color:'#fff'}}>
        
        <motion.h1 initial={{opacity:0}} animate={{opacity:1}} style={{fontSize:'3rem', color:'var(--accent)', marginBottom:'20px'}}>
          About Us
        </motion.h1>
        
        <p style={{fontSize:'1.1rem', lineHeight:'1.6', color:'#ccc', marginBottom:'30px'}}>
          <b>AB Custom Labels</b> was born out of a passion for design, detail, and the power of branding. 
          We started with a simple idea — to help individuals and businesses bring their packaging to life. 
          Today, we create tailored labels that blend creativity with quality for bottles, jars, boxes, and events.
        </p>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'40px'}}>
          <div style={{background:'#111', padding:'20px', borderRadius:'12px', border:'1px solid #222'}}>
            <h3 style={{color:'white'}}>🎯 Mission</h3>
            <p style={{color:'#888', fontSize:'0.9rem'}}>To empower businesses by delivering custom-designed labels that elevate product value.</p>
          </div>
          <div style={{background:'#111', padding:'20px', borderRadius:'12px', border:'1px solid #222'}}>
            <h3 style={{color:'white'}}>🌍 Vision</h3>
            <p style={{color:'#888', fontSize:'0.9rem'}}>To become India’s leading name in the custom label industry.</p>
          </div>
        </div>

        <h2 style={{color:'white', marginTop:'40px'}}>Why Choose Us?</h2>
        <ul style={{color:'#bbb', lineHeight:'1.8', marginLeft:'20px'}}>
          <li><b>Fast Turnaround:</b> High-quality labels on a tight timeline.</li>
          <li><b>Fully Customized:</b> Designed from scratch based on your needs.</li>
          <li><b>Premium Print Quality:</b> No smudges, no fading.</li>
        </ul>

      </div>
    </div>
  );
};

export default About;