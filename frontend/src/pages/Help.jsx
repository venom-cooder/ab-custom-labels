import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Help = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await axios.post(`${API_URL}/api/support`, {
        type: 'Help',
        name: formData.get('name'),
        contact: formData.get('contact'),
        message: formData.get('issue')
      });
      alert("Issue reported. We will contact you shortly.");
      navigate('/');
    } catch (err) { alert("Error reporting issue"); }
  };

  return (
    <div className="app-container">
      <nav><div className="logo" onClick={()=>navigate('/')}>AB CUSTOM.</div></nav>
      <div className="content-page" style={{display:'flex', justifyContent:'center'}}>
        <div className="form-container">
          <h1 className="form-title">Report an Issue 🛠️</h1>
          <form onSubmit={handleSubmit}>
            <input name="name" required placeholder="Your Name" className="clean-input" />
            <input name="contact" required placeholder="WhatsApp/Phone" className="clean-input" />
            <textarea name="issue" rows="5" required placeholder="Describe your issue..." className="clean-input"/>
            <button className="primary-btn" style={{width:'100%'}}>Submit Ticket</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};
export default Help;