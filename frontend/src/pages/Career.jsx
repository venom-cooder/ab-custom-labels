import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight, FaTimes, FaCheckCircle, FaLink, FaPaperPlane } from 'react-icons/fa';

const Career = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  
  // --- STATE ---
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedRole, setSelectedRole] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- STATIC CONTENT (From Your Reference) ---
  const staticJobs = [
    {
      _id: 'static-1', 
      title: 'Creative Designer 🎨',
      type: 'Full Time',
      location: 'Remote / Hybrid',
      desc: 'Turn blank canvases into bold brand statements.',
      detail: 'Love design and detail? Use your creativity to craft stunning labels, stickers, and logos that people will hold in their hands. Work with a brand that values original ideas and creative freedom. If you’ve got Canva or Illustrator skills, this is your chance to shine.'
    },
    {
      _id: 'static-2', 
      title: 'Social Media Manager 🧑‍💼',
      type: 'Part Time',
      location: 'Remote',
      desc: 'Lead our online voice and create scroll-stopping content.',
      detail: 'You’ll lead our Instagram, Reels, and Stories to showcase our custom labels to the world. Freedom to experiment, learn trends, and grow a real business’s online voice.'
    },
    {
      _id: 'static-3', 
      title: 'Sales Growth Executive 📈',
      type: 'Commission Based',
      location: 'On-Field',
      desc: 'Turn conversations into conversions. Earn commission.',
      detail: 'Connect with cafes, event planners, and gift shops to close deals. The more you help us grow, the more you earn. Simple and smart.'
    },
    {
      _id: 'static-4', 
      title: 'Website Design Intern 💻',
      type: 'Internship',
      location: 'Remote',
      desc: 'Manage our digital presence and product visuals.',
      detail: 'We need someone to manage our listings, product photos, and descriptions. No coding needed, just attention to detail and love for product display.'
    },
    {
      _id: 'static-5', 
      title: 'Product Photographer 📷',
      type: 'Contract',
      location: 'Vadodara',
      desc: 'Capture the shine, texture, and perfection of our work.',
      detail: 'Your shots will be seen across our website, catalogs, and social media. Perfect for someone who sees details others don’t.'
    }
  ];

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/careers`);
        if (res.data && Array.isArray(res.data)) {
           // Merge backend jobs with static jobs
           setJobs([...staticJobs, ...res.data]);
        } else {
           setJobs(staticJobs);
        }
      } catch (err) {
        console.error("Error fetching careers", err);
        setJobs(staticJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [API_URL]);

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
      whyJoin: formData.get('whyJoin'),
      date: new Date().toLocaleString()
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
      
      {/* 1. HERO SECTION (Static BG + Centered Text) */}
      <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop")', // Team collaboration image
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.4)', zIndex: 0
        }}></div>

        {/* Content */}
        <div className="container" style={{
          position: 'relative', zIndex: 1, height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          textAlign: 'center', padding: '0 20px'
        }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'white', marginBottom: '20px', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
            JOIN THE <span style={{ color: 'var(--accent)' }}>TEAM</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#eee', maxWidth: '700px', lineHeight: '1.6', textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
            Shape the Future of Label Design With Us. We're more than a design brand — we're building a movement of creativity, customisation, and craft.
          </p>
        </div>
      </div>

      {/* 2. INTRO TEXT */}
      <div style={{padding:'4rem 2rem', textAlign:'center', maxWidth:'900px', margin:'0 auto'}}>
        <h2 style={{fontSize:'2rem', fontWeight:'800', marginBottom:'20px', color:'var(--text-main)'}}>
          Curious? Let’s create something bold.
        </h2>
        <p style={{color:'#666', fontSize:'1.1rem', lineHeight:'1.6'}}>
          Whether you're a designer, marketer, or maker, your passion can help us redefine how businesses express themselves.
          <br/>
          There are lots of opportunities here. <b>Would you like to try?</b>
        </p>
      </div>

      {/* 3. JOB LISTINGS GRID */}
      <div className="container" style={{maxWidth: '1200px', margin: '0 auto', paddingBottom: '80px', paddingLeft:'20px', paddingRight:'20px'}}>
        
        {loading ? (
          <p style={{textAlign: 'center', color: '#666'}}>Loading Openings...</p>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px'}}>
            {jobs.map((job) => (
              <div 
                key={job._id} 
                className="strict-card" 
                style={{
                  padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', 
                  justifyContent: 'space-between', alignItems: 'flex-start', textAlign: 'left'
                }}
              >
                 <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '15px'}}>
                      <h3 style={{fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)'}}>
                        {job.title}
                      </h3>
                      {job.type && (
                        <span style={{fontSize: '0.75rem', background: '#f3e8ff', color: 'var(--primary)', padding: '4px 8px', borderRadius: '4px', fontWeight: '600'}}>
                          {job.type}
                        </span>
                      )}
                    </div>
                    
                    <p style={{color: 'var(--primary)', fontWeight: '600', fontSize: '0.95rem', marginBottom: '10px'}}>
                      {job.desc}
                    </p>
                    <p style={{color: '#666', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px'}}>
                      {job.detail || job.description}
                    </p>
                 </div>

                 <button 
                   onClick={() => setSelectedRole(job)}
                   className="primary-btn" 
                   style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}
                 >
                   Apply Now <FaArrowRight size={12}/>
                 </button>
              </div>
            ))}
          </div>
        )}

        {/* General Application Fallback */}
        <div style={{marginTop: '60px', padding: '40px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center', border: '1px solid #eee'}}>
           <FaEnvelope className="text-4xl text-gray-400 mx-auto mb-4" style={{display: 'block', margin: '0 auto 15px', opacity: 0.5}} size={40}/>
           <h3 style={{fontWeight: '700', fontSize: '1.2rem', marginBottom: '10px', color: 'var(--text-main)'}}>Don't see your role?</h3>
           <p style={{color: '#666', marginBottom: '20px'}}>
             Send your portfolio to us anyway.
           </p>
           <a href="mailto:ab.customlabels@gmail.com" style={{color: 'var(--primary)', fontWeight: '700', textDecoration: 'none'}}>
             careers@abcustomlabels.com
           </a>
        </div>

      </div>

      {/* --- APPLICATION MODAL --- */}
      <AnimatePresence>
        {selectedRole && (
          <div 
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(0,0,0,0.85)', zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(5px)'
            }}
            onClick={() => setSelectedRole(null)}
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
              <button onClick={() => setSelectedRole(null)} style={{position:'absolute', top:15, right:15, border:'none', background:'transparent', cursor:'pointer'}}>
                <FaTimes size={20} color="#888"/>
              </button>

              {success ? (
                <div style={{textAlign: 'center', padding: '40px 0'}}>
                  <div style={{width: '70px', height: '70px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
                     <FaCheckCircle size={35} />
                  </div>
                  <h3 style={{color:'var(--text-main)', marginBottom:'10px'}}>Application Sent!</h3>
                  <p style={{color:'#666'}}>We will review your profile and contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{marginBottom:'5px', color:'var(--text-main)', fontSize:'1.5rem'}}>Apply Now</h2>
                  <p style={{color:'var(--primary)', fontWeight:'600', marginBottom:'25px', fontSize:'0.9rem'}}>
                    Role: {selectedRole.title}
                  </p>

                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px', marginBottom:'15px'}}>
                    <div>
                      <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Full Name</label>
                      <input name="name" required className="clean-input" placeholder="Your Name" style={{background:'#f8f9fa'}}/>
                    </div>
                    <div>
                      <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Email / Phone</label>
                      <input name="email" required className="clean-input" placeholder="Contact Info" style={{background:'#f8f9fa'}}/>
                    </div>
                  </div>

                  <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Link to CV / Portfolio</label>
                  <div style={{display:'flex', alignItems:'center', background:'#f8f9fa', border:'1px solid #ccc', borderRadius:'4px', marginBottom:'15px'}}>
                    <div style={{padding:'0 15px', color:'#888'}}><FaLink/></div>
                    <input name="cvLink" required className="clean-input" style={{marginBottom:0, border:'none', background:'transparent', boxShadow:'none'}} placeholder="Google Drive / Behance Link" />
                  </div>

                  <label style={{fontSize:'0.75rem', fontWeight:'700', textTransform:'uppercase', color:'#888', marginBottom:'5px', display:'block'}}>Why do you want to join?</label>
                  <textarea name="whyJoin" className="clean-input" rows="3" placeholder="Tell us in one sentence..." style={{background:'#f8f9fa'}}/>

                  <button type="submit" className="primary-btn" style={{width:'100%', marginTop:'10px', display:'flex', justifyContent:'center', gap:'10px'}} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : <><FaPaperPlane/> Submit Application</>}
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