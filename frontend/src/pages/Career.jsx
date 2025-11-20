import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaArrowRight, FaBriefcase, FaTimes, FaCheckCircle, FaLink } from 'react-icons/fa';

// Components
import RevealText from '../components/anim/RevealText';
import MagneticBtn from '../components/anim/MagneticBtn';

const Career = () => {
  const [selectedRole, setSelectedRole] = useState(null); // Open Modal State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const jobs = [
    {
      id: 1, title: 'Creative Designer 🎨',
      desc: 'Turn blank canvases into bold brand statements. Craft stunning labels & logos.',
      detail: 'Work with a brand that values original ideas. If you have Canva/Illustrator skills, this is your chance to shine with real client projects.'
    },
    {
      id: 2, title: 'Social Media Manager 🧑‍💼',
      desc: 'Create scroll-stopping content and lead our online voice.',
      detail: 'You will lead our Instagram, Reels, and Stories. Freedom to experiment, learn trends, and grow a real business’s online voice.'
    },
    {
      id: 3, title: 'Sales Growth Executive 📈',
      desc: 'Turn conversations into conversions. Commission on every order.',
      detail: 'Connect with cafes, event planners, and gift shops. The more you help us grow, the more you earn—simple and smart.'
    },
    {
      id: 4, title: 'Website Design Intern 💻',
      desc: 'Manage our digital presence and product listings.',
      detail: 'No coding needed, just attention to detail. Assist in maintaining layouts and visuals for a fast-growing business.'
    },
    {
      id: 5, title: 'Product Photographer 📷',
      desc: 'Capture the shine and texture of our premium labels.',
      detail: 'Your shots will be seen across our website and catalogs. Help us dream up new campaign ideas.'
    }
  ];

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
      
      {/* HEADER */}
      <div style={{padding:'6rem 2rem 4rem', textAlign:'center', maxWidth:'900px', margin:'0 auto'}}>
        <div style={{display:'flex', justifyContent:'center', marginBottom:'20px'}}>
           <RevealText text="Shape the Future of Design." />
        </div>
        <motion.p 
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
          style={{color:'#666', fontSize:'1.1rem', lineHeight:'1.6'}}
        >
          At <b>AB Custom Labels</b>, we're building a movement of creativity. 
          Whether you're a designer, marketer, or maker, help us redefine how brands express themselves.
          <br/><br/>
          <b>Curious? Let’s create something bold, together.</b>
        </motion.p>
      </div>

      {/* JOB LIST */}
      <div style={{maxWidth:'1000px', margin:'0 auto', padding:'0 2rem 6rem'}}>
        {jobs.map((job, i) => (
          <motion.div 
            key={job.id}
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{delay: i * 0.1}}
            style={{
              background:'#fcfcfc', border:'1px solid #eee', borderRadius:'16px', padding:'2rem', marginBottom:'20px',
              display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'20px',
              boxShadow:'0 4px 20px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{flex:1, minWidth:'300px'}}>
              <h3 style={{fontSize:'1.5rem', marginBottom:'10px'}}>{job.title}</h3>
              <p style={{color:'#555', marginBottom:'10px', fontWeight:'500'}}>{job.desc}</p>
              <p style={{color:'#888', fontSize:'0.9rem', lineHeight:'1.5'}}>{job.detail}</p>
            </div>
            <MagneticBtn 
              onClick={() => setSelectedRole(job)}
              style={{padding:'12px 25px', width:'auto', fontSize:'0.9rem'}}
            >
              Apply Now
            </MagneticBtn>
          </motion.div>
        ))}
      </div>

      {/* APPLICATION MODAL */}
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
                  <h3>Application Sent!</h3>
                  <p style={{color:'#666'}}>We will review your profile and contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{marginBottom:'10px'}}>Apply for {selectedRole.title.split(' ')[0]}</h2>
                  <p style={{color:'#666', fontSize:'0.9rem', marginBottom:'25px'}}>Join the movement.</p>

                  <label style={{fontSize:'0.85rem', fontWeight:'bold'}}>Full Name</label>
                  <input name="name" required className="clean-input" placeholder="Your Name" />

                  <label style={{fontSize:'0.85rem', fontWeight:'bold'}}>Email / Contact</label>
                  <input name="email" required className="clean-input" placeholder="email@example.com" />

                  <label style={{fontSize:'0.85rem', fontWeight:'bold'}}>Link to CV / Portfolio / Work</label>
                  <div style={{display:'flex', alignItems:'center', background:'#f9f9f9', border:'1px solid #ddd', borderRadius:'10px', marginBottom:'15px'}}>
                    <div style={{padding:'0 15px', color:'#888'}}><FaLink/></div>
                    <input name="cvLink" required className="clean-input" style={{marginBottom:0, border:'none', background:'transparent'}} placeholder="Google Drive / Behance Link" />
                  </div>

                  <label style={{fontSize:'0.85rem', fontWeight:'bold'}}>Why do you want to join?</label>
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