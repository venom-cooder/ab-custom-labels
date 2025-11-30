import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBriefcase, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';

const Career = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  
  // --- STATE ---
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/careers`);
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching careers", err);
        // Optional: Keep static fallback if backend is empty during dev
        setJobs([
          { 
            _id: '1', 
            title: 'Graphic Designer (Senior)', 
            type: 'Full Time', 
            location: 'Remote / Hybrid', 
            description: 'Expert in Adobe Illustrator and packaging design. Lead our creative team in developing premium label concepts.' 
          },
          { 
            _id: '2', 
            title: 'Print Operations Manager', 
            type: 'On-Site', 
            location: 'Vadodara, India', 
            description: 'Manage daily output of digital presses, ensure quality control, and handle inventory logistics.' 
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API_URL]);

  return (
    <div className="app-container">
      
      {/* 1. STANDARD HEADER */}
      <div className="page-header">
        <h1>Join the Team</h1>
        <p>We are always looking for creative designers, print specialists, and visionaries.</p>
      </div>

      {/* 2. JOBS GRID */}
      <div className="container" style={{maxWidth: '1000px', margin: '0 auto', paddingBottom: '80px', paddingLeft:'20px', paddingRight:'20px'}}>
        
        {loading ? (
          <p style={{textAlign: 'center', color: '#666'}}>Loading Openings...</p>
        ) : jobs.length === 0 ? (
          <div style={{textAlign: 'center', padding: '40px', background: '#f9fafb', borderRadius: '8px'}}>
            <p style={{color: '#555'}}>No specific openings right now, but we are always hiring talent.</p>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {jobs.map((job) => (
              <div key={job._id} className="strict-card" style={{flexDirection: 'row', alignItems: 'center', padding: '30px', height: 'auto', minHeight: 'auto'}}>
                 
                 {/* Job Icon */}
                 <div style={{
                   width: '60px', height: '60px', background: '#f3e8ff', color: 'var(--primary)', 
                   borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                   marginRight: '25px', flexShrink: 0
                 }}>
                    <FaBriefcase size={24} />
                 </div>

                 {/* Job Info */}
                 <div style={{flexGrow: 1}}>
                    <h3 style={{fontSize: '1.25rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)'}}>
                      {job.title}
                    </h3>
                    
                    <div style={{display: 'flex', gap: '15px', marginBottom: '10px', flexWrap: 'wrap'}}>
                      <span style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', color: '#666', background: '#f9fafb', padding: '4px 10px', borderRadius: '4px', border: '1px solid #eee'}}>
                        <FaMapMarkerAlt size={12}/> {job.location || 'Remote'}
                      </span>
                      <span style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', color: '#666', background: '#f9fafb', padding: '4px 10px', borderRadius: '4px', border: '1px solid #eee'}}>
                        <FaClock size={12}/> {job.type || 'Full Time'}
                      </span>
                    </div>

                    <p style={{color: '#555', fontSize: '0.95rem', lineHeight: '1.5', maxWidth: '700px'}}>
                      {job.description}
                    </p>
                 </div>

                 {/* Apply Button */}
                 <div style={{marginLeft: '20px'}}>
                   <a 
                     href={`mailto:careers@abcustomlabels.com?subject=Application for ${job.title}`}
                     className="primary-btn" 
                     style={{whiteSpace: 'nowrap', padding: '12px 24px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px'}}
                   >
                     Apply Now <FaArrowRight size={12}/>
                   </a>
                 </div>

              </div>
            ))}
          </div>
        )}

        {/* 3. GENERAL APPLICATION CTA */}
        <div style={{marginTop: '60px', padding: '40px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center', border: '1px solid #eee'}}>
           <FaEnvelope className="text-4xl text-gray-400 mx-auto mb-4" style={{display: 'block', margin: '0 auto 15px', opacity: 0.5}} size={40}/>
           <h3 style={{fontWeight: '700', fontSize: '1.2rem', marginBottom: '10px', color: 'var(--text-main)'}}>Don't see your role?</h3>
           <p style={{color: '#666', marginBottom: '20px'}}>
             We are always interested in meeting talented people. Send your portfolio to us directly.
           </p>
           <a href="mailto:careers@abcustomlabels.com" style={{color: 'var(--primary)', fontWeight: '700', textDecoration: 'none', borderBottom: '2px solid var(--primary)', paddingBottom: '2px'}}>
             careers@abcustomlabels.com
           </a>
        </div>

      </div>
    </div>
  );
};

export default Career;