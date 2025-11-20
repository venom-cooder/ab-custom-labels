import React from 'react';
import { motion } from 'framer-motion';
import MagneticBtn from '../components/anim/MagneticBtn';

const Career = () => {
  return (
    <div className="app-container" style={{justifyContent:'center', alignItems:'center', textAlign:'center'}}>
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} style={{maxWidth:'600px', padding:'20px'}}>
        <h1 style={{fontSize:'3rem', marginBottom:'20px'}}>Join the <span style={{color:'#ccc'}}>Crew.</span></h1>
        <p style={{color:'#666', fontSize:'1.2rem', marginBottom:'40px'}}>
          We are always looking for creative designers and production specialists in Jabalpur/Katni.
        </p>
        <div style={{background:'#f8f8f8', padding:'30px', borderRadius:'20px', border:'1px solid #eee'}}>
          <h3>Current Openings</h3>
          <p style={{margin:'20px 0'}}>• Graphic Designer (Intern/Full-time)</p>
          <p style={{margin:'20px 0'}}>• Social Media Manager</p>
          <MagneticBtn 
            onClick={() => window.open('mailto:ab.customlabels@gmail.com', '_blank')}
            style={{width:'100%', marginTop:'20px'}}
          >
            Send CV to Email
          </MagneticBtn>
        </div>
      </motion.div>
    </div>
  );
};

export default Career;