import React from 'react';
import { useNavigate } from 'react-router-dom';


const Privacy = () => {
  const navigate = useNavigate();
  return (
    <div className="app-container">
      <nav><div className="logo" onClick={()=>navigate('/')}>AB CUSTOM.</div></nav>
      <div className="content-page">
        <h1>Privacy Policy</h1>
        <p>Last updated May 27, 2025</p>
        <p>This Privacy Notice for <b>AB Custom Labels pvt.ltd</b> ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our Services.</p>
        
        <h3>Summary of Key Points</h3>
        <p><b>What personal information do we process?</b> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</p>
        
        <p><b>Do we process any sensitive personal information?</b> We do not process sensitive personal information.</p>
        
        <p><b>Do we collect any information from third parties?</b> We do not collect any information from third parties.</p>
        
        <p>If you still have any questions or concerns, please contact us at <b>ab.customlabels@gmail.com</b>.</p>
      </div>
      
    </div>
  );
};
export default Privacy;