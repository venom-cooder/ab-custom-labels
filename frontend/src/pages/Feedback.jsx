import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await axios.post(`${API_URL}/api/support`, { // Ensure /api/support route exists in backend
        type: 'Feedback',
        name: formData.get('name'),
        message: formData.get('message')
      });
      alert("Thank you for your feedback!");
      navigate('/');
    } catch (err) {
      alert("Error sending feedback. Please try again.");
    }
  };

  return (
    <div className="app-container" style={{justifyContent:'center', alignItems:'center', height:'80vh'}}>
      <div style={{background:'#111', padding:'40px', borderRadius:'20px', width:'90%', maxWidth:'500px', border:'1px solid #222'}}>
        <h1 style={{color:'var(--accent)', textAlign:'center', marginBottom:'10px'}}>We Value Your Feedback 💬</h1>
        <p style={{color:'#888', textAlign:'center', marginBottom:'30px'}}>Your thoughts help us grow.</p>
        
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Your Name (Optional)" className="clean-input" />
          <textarea name="message" required rows="5" placeholder="Share your experience..." className="clean-input" />
          <button type="submit" className="primary-btn" style={{width:'100%'}}>Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;