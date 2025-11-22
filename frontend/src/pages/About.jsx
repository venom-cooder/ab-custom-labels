import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import MagneticBtn from '../components/anim/MagneticBtn';

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="app-container">
      <nav>
        <div className="logo" onClick={()=>navigate('/')}><img src="/logo.png" style={{height:'35px'}}/> AB CUSTOM.</div>
        <MagneticBtn onClick={()=>navigate('/')}>Home</MagneticBtn>
      </nav>

      <div className="content-page">
        {/* Premium Background Image */}
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" className="about-hero-img" alt="Studio" />
        
        <h1>About Us</h1>
        <p><b>AB Custom Labels</b> was born out of a passion for design, detail, and the power of branding. We started with a simple idea — to help individuals and businesses bring their packaging to life. Today, we create tailored labels that blend creativity with quality for bottles, jars, boxes, and events.</p>

        <h2>Our Mission, Vision & Values</h2>
        
        <h3>🎯 Mission</h3>
        <p>To empower businesses, events, and individuals by delivering custom-designed labels that not only reflect their identity but also elevate the value of their products.</p>

        <h3>🌍 Vision</h3>
        <p>To become India’s leading and most trusted name in the custom label industry — recognized for our creativity, ethical values, and customer-first approach.</p>

        <h3>💎 Values</h3>
        <div className="values-grid">
          <div className="value-card"><h4>Creativity 🎨</h4><p>We pour imagination into every design.</p></div>
          <div className="value-card"><h4>Quality 🏆</h4><p>Never compromising on materials.</p></div>
          <div className="value-card"><h4>Integrity 🤝</h4><p>Transparent and honest service.</p></div>
          <div className="value-card"><h4>Sustainability 🌱</h4><p>Exploring eco-friendly materials.</p></div>
        </div>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>1️⃣ <b>Fast Turnaround:</b> High-quality labels on a tight timeline.</li>
          <li>2️⃣ <b>Fully Customized:</b> Designed from scratch based on your needs.</li>
          <li>3️⃣ <b>Eco-Friendly Options:</b> Sustainable label materials available.</li>
          <li>4️⃣ <b>Personal Support:</b> Honest advice and updates at every step.</li>
          <li>5️⃣ <b>Premium Print Quality:</b> No smudges, no fading.</li>
        </ul>

        <div style={{textAlign:'center', marginTop:'4rem'}}>
          <h3>Ready to make your label stand out?</h3>
          <MagneticBtn onClick={()=>navigate('/')} style={{marginTop:'20px'}}>Let’s create something custom</MagneticBtn>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default About;