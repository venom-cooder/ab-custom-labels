import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaArrowRight, FaTimes, FaCheckCircle, FaLink, FaArrowLeft } from 'react-icons/fa';

// Components
import MagneticBtn from '../components/anim/MagneticBtn';
import Footer from '../components/Footer'; // Footer is required here

const Career = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null); // Stores the job being applied for
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- JOB DATA (Your Content) ---
  const jobs = [
    {
      id: 1, 
      title: 'Creative Designer 🎨',
      desc: 'Turn blank canvases into bold brand statements.',
      detail: 'Love design and detail? Use your creativity to craft stunning labels, stickers, and logos that people will hold in their hands. Work with a brand that values original ideas and creative freedom. We’re looking for passionate designers who can turn a blank canvas into a bold brand statement. If you’ve got Canva or Illustrator skills, this is your chance to shine with real client projects.'
    },
    {
      id: 2, 
      title: 'Social Media Manager 🧑‍💼',
      desc: 'Lead our online voice and create scroll-stopping content.',
      detail: 'Love creating scroll-stopping content? You’ll lead our Instagram, Reels, and Stories to showcase our custom labels to the world. Freedom to experiment, learn trends, and grow a real business’s online voice.'
    },
    {
      id: 3, 
      title: 'Sales Growth Executive 📈',
      desc: 'Turn conversations into conversions. Earn commission.',
      detail: 'As our sales partner, you’ll connect with cafes, event planners, gift shops and close deals with commission on every order. The more you help us grow, the more you earn — simple and smart. Use your skills to reach more clients, pitch our label services, and close sales through social media, referrals, or direct outreach.'
    },
    {
      id: 4, 
      title: 'Website Design Intern 💻',
      desc: 'Manage our digital presence and product visuals.',
      detail: 'We’re building our online presence — and we need someone to manage our listings, product photos, and descriptions. No coding needed, just attention to detail and love for product display. Want hands-on experience building real websites? Assist in maintaining and improving our layout and visuals for a fast-growing business.'
    },
    {
      id: 5, 
      title: 'Product Photographer 📷',
      desc: 'Capture the shine, texture, and perfection of our work.',
      detail: 'Your shots will be seen across our website, catalogs, and social media. Join the brand-building journey. Help us dream up new label categories, campaign ideas, and creative directions. Perfect for someone who sees what others don’t.'
    }
  ];

  // --- FORM SUBMIT HANDLER ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    
    const application = {
      name: formData.get('name'),
      email: formData.get('email'),
      role: selectedRole.title,
      cvLink: formData.get('cvLink'),
      whyJoin: formData.get('whyJoin')
    };

    try {
      await axios.post(`${API_URL}/api/applications`, application);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedRole(null);
      }, 3000);
    } catch (err) {
      alert('Failed to submit. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="app-container">
      
      

      {/* --- HERO SECTION WITH BACKGROUND IMAGE --- */}
      <div style={{ position: 'relative', height: '600px', overflow: 'hidden', borderBottom:'1px solid #222' }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.3)', zIndex: 0
        }}></div>

        {/* Hero Text */}
        <div className="hero-overlay" style={{maxWidth:'800px', padding:'0 20px'}}>
          <motion.h1 
            initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.8}}
            style={{fontSize:'3.5rem', fontWeight:'800', lineHeight:'1.1', marginBottom:'20px', color:'#fff'}}
          >
            JOIN THE <br/> <span style={{color:'var(--accent)'}}>AB CUSTOM LABELS</span> TEAM
          </motion.h1>
          
          <motion.p 
            initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
            style={{fontSize:'1.2rem', color:'#ddd', lineHeight:'1.6'}}
          >
            Shape the Future of Label Design With Us. <br/>
            We're more than a design brand — we're building a movement of creativity, customisation, and craft.
          </motion.p>
        </div>
      </div>

      {/* --- INTRO TEXT --- */}
      <div style={{padding:'4rem 2rem', textAlign:'center', maxWidth:'900px', margin:'0 auto'}}>
        <h2 style={{color:'#fff', marginBottom:'20px'}}>Curious? Let’s create something bold, together.</h2>
        <p style={{color:'#888', fontSize:'1.1rem', lineHeight:'1.6'}}>
          Whether you're a designer, marketer, or maker, your passion can help us redefine how businesses and events express themselves.
          <br/>
          There are lots of opportunities here. <b>Would you like to try?</b>
        </p>
      </div>

      {/* --- JOB LISTINGS --- */}
      <div style={{padding:'0 5% 6rem', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(350px, 1fr))', gap:'30px'}}>
          {jobs.map((job, i) => (
            <motion.div 
              key={job.id}
              initial={{opacity:0, y:20}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{delay: i * 0.1}}
              style={{
                background:'#111', border:'1px solid #333', borderRadius:'16px', padding:'2rem',
                display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%',
                boxShadow:'0 10px 30px rgba(0,0,0,0.3)'
              }}
            >
              <div>
                <h3 style={{fontSize:'1.4rem', marginBottom:'10px', color:'#fff'}}>{job.title}</h3>
                <p style={{color:'var(--accent)', marginBottom:'15px', fontWeight:'600', fontSize:'0.9rem'}}>{job.desc}</p>
                <p style={{color:'#aaa', fontSize:'0.9rem', lineHeight:'1.6', marginBottom:'20px'}}>{job.detail}</p>
              </div>
              
              <button 
                className="primary-btn" 
                style={{width:'100%', marginTop:'auto'}}
                onClick={() => setSelectedRole(job)}
              >
                Apply Now <FaArrowRight size={12}/>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- APPLICATION MODAL --- */}
      <AnimatePresence>
        {selectedRole && (
          <div className="modal-overlay">
            <motion.div 
              className="order-modal"
              initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}}
            >
              <button onClick={() => setSelectedRole(null)} style={{position:'absolute', top:20, right:20, border:'none', background:'transparent', cursor:'pointer'}}>
                <FaTimes size={20} color="#888"/>
              </button>

              {success ? (
                <div style={{textAlign:'center', padding:'40px 0'}}>
                  <FaCheckCircle size={50} color="#25D366" style={{marginBottom:'20px'}}/>
                  <h3 style={{color:'#fff'}}>Application Sent!</h3>
                  <p style={{color:'#888'}}>We will review your profile and contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{marginBottom:'10px', color:'#fff'}}>Apply: <span style={{color:'var(--accent)'}}>{selectedRole.title.split(' ')[0]}</span></h2>
                  <p style={{color:'#888', fontSize:'0.9rem', marginBottom:'25px'}}>Join the movement.</p>

                  <label style={{fontSize:'0.85rem', fontWeight:'bold', color:'#ccc'}}>Full Name</label>
                  <input name="name" required className="clean-input" placeholder="Your Name" />

                  <label style={{fontSize:'0.85rem', fontWeight:'bold', color:'#ccc'}}>Email / Contact</label>
                  <input name="email" required className="clean-input" placeholder="email@example.com" />

                  <label style={{fontSize:'0.85rem', fontWeight:'bold', color:'#ccc'}}>Link to CV / Portfolio</label>
                  <div style={{display:'flex', alignItems:'center', background:'#111', border:'1px solid #333', borderRadius:'4px', marginBottom:'15px'}}>
                    <div style={{padding:'0 15px', color:'#888'}}><FaLink/></div>
                    <input name="cvLink" required className="clean-input" style={{marginBottom:0, border:'none', background:'transparent'}} placeholder="Google Drive / Behance Link" />
                  </div>

                  <label style={{fontSize:'0.85rem', fontWeight:'bold', color:'#ccc'}}>Why do you want to join?</label>
                  <textarea name="whyJoin" className="clean-input" rows="3" placeholder="Tell us in one sentence..." />

                  <button type="submit" className="primary-btn" style={{width:'100%'}} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

  

    </div>
  );
};

export default Career;