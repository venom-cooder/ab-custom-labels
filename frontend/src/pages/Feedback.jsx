import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Feedback = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await axios.post(`${API_URL}/api/support`, {
        type: 'Feedback',
        message: formData.get('message'),
        name: formData.get('name')
      });
      alert("Thank you for your feedback!");
      navigate('/');
    } catch (err) { alert("Error sending feedback"); }
  };

  return (
    <div className="app-container">
      <nav><div className="logo" onClick={()=>navigate('/')}>AB CUSTOM.</div></nav>
      <div className="content-page" style={{display:'flex', justifyContent:'center'}}>
        <div className="form-container">
          <h1 className="form-title">We Value Your Feedback 💬</h1>
          <p style={{textAlign:'center'}}>Your thoughts help us grow. Share your experience or suggest how we can serve you better.</p>
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Your Name (Optional)" className="clean-input" />
            <textarea name="message" rows="5" required placeholder="Write your feedback here..." className="clean-input"/>
            <button className="primary-btn" style={{width:'100%'}}>Submit Feedback</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Feedback;