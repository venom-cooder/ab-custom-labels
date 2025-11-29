import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaMagic, FaArrowRight, FaCheckCircle, FaRedo, FaWhatsapp, FaPalette, FaShapes, FaFont } from 'react-icons/fa';

const AIDesign = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Form State
  const [selections, setSelections] = useState({
    category: '',
    shape: '',
    color: '',
    style: '',
    text: ''
  });

  // Options
  const categories = ['Label', 'Sticker', 'Logo', 'Business Card'];
  const shapes = ['Circle', 'Square', 'Rectangle', 'Die-Cut', 'Oval'];
  const colors = ['Gold', 'Black', 'Red', 'Blue', 'Green', 'White', 'Purple', 'Teal'];
  const styles = ['Minimalist', 'Luxury', 'Vintage', 'Cyberpunk', 'Playful', 'Professional', 'Botanical'];

  const handleSelect = (key, value) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const generateDesign = async () => {
    if (!selections.text) return alert("Please enter your Brand Name or Text");
    
    setStep(3); // Go to Loading Screen
    setLoading(true);

    try {
      // --- REAL AI REQUEST ---
      // We send the user's choices to our backend
      const res = await axios.post(`${API_URL}/api/ai/generate`, selections);
      
      // The backend returns: { imageUrl, rating, suggestion }
      if (res.data.success) {
        setResult(res.data);
        setStep(4); // Go to Result Screen
      } else {
        throw new Error("Generation failed");
      }
    } catch (err) {
      console.error("AI Generation Error:", err);
      alert("AI Generation failed. Please try again.");
      setStep(2); // Go back to customization
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setSelections({ category: '', shape: '', color: '', style: '', text: '' });
    setResult(null);
  };

  return (
    <div className="app-container" style={{ background: '#fff', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '3rem 1rem 1rem' }}>
        <h1 className="hero-title" style={{ fontSize: '2.5rem', color: '#000', marginBottom:'10px' }}>
          AB <span style={{ color: '#8B3DFF' }}>AI STUDIO</span>
        </h1>
        <p style={{ color: '#666' }}>Design your dream label in seconds using Real AI.</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        
        {/* PROGRESS BAR */}
        <div style={{display:'flex', gap:'5px', marginBottom:'30px'}}>
            {[1,2,3,4].map(num => (
                <div key={num} style={{flex:1, height:'6px', borderRadius:'3px', background: step >= num ? '#8B3DFF' : '#eee', transition:'0.3s'}}></div>
            ))}
        </div>

        {/* STEP 1: CATEGORY */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="ai-card">
            <h3>1. What do you want to create?</h3>
            <div className="ai-grid">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`ai-option ${selections.category === cat ? 'active' : ''}`}
                  onClick={() => handleSelect('category', cat)}
                  style={{zIndex: 10, position: 'relative'}}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button 
              className="primary-btn" 
              disabled={!selections.category}
              onClick={() => setStep(2)}
              style={{ width: '100%', marginTop: '20px', opacity: selections.category ? 1 : 0.5 }}
            >
              Next Step <FaArrowRight />
            </button>
          </motion.div>
        )}

        {/* STEP 2: CUSTOMIZE */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="ai-card">
            <h3>2. Customize your {selections.category}</h3>
            
            <div style={{marginBottom: '25px'}}>
                <label className="ai-label">Brand Name / Text</label>
                <input 
                  className="clean-input" 
                  placeholder="Ex: Urban Coffee Co." 
                  value={selections.text}
                  onChange={(e) => handleSelect('text', e.target.value)}
                />
            </div>

            <label className="ai-label"><FaShapes/> Choose Shape</label>
            <div className="ai-chips">
              {shapes.map(s => (
                <button key={s} className={`chip ${selections.shape === s ? 'active' : ''}`} onClick={() => handleSelect('shape', s)}>{s}</button>
              ))}
            </div>

            <label className="ai-label"><FaPalette/> Primary Color</label>
            <div className="ai-chips">
              {colors.map(c => (
                <button key={c} className={`chip ${selections.color === c ? 'active' : ''}`} onClick={() => handleSelect('color', c)} style={{borderLeft: `5px solid ${c.toLowerCase()}`}}>{c}</button>
              ))}
            </div>

             <label className="ai-label"><FaFont/> Visual Style</label>
            <div className="ai-chips">
              {styles.map(s => (
                <button key={s} className={`chip ${selections.style === s ? 'active' : ''}`} onClick={() => handleSelect('style', s)}>{s}</button>
              ))}
            </div>

            <div style={{display:'flex', gap:'10px', marginTop:'30px'}}>
                <button className="secondary-btn" onClick={() => setStep(1)}>Back</button>
                <button className="primary-btn" onClick={generateDesign} style={{flex:1}}>
                <FaMagic /> Generate Magic
                </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: LOADING */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '4rem', background:'white', borderRadius:'20px', border:'1px solid #eee' }}>
            <div className="loading-spinner"></div>
            <h3 style={{ marginTop: '20px', color: '#333' }}>Dreaming up your design...</h3>
            <p style={{ color: '#888' }}>Applying {selections.style} aesthetics...</p>
            <p style={{ fontSize:'0.8rem', color:'#aaa', marginTop:'10px'}}>Powered by Generative AI</p>
          </div>
        )}

        {/* STEP 4: RESULT */}
        {step === 4 && result && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="ai-result-card">
            <div className="result-image-container">
              {/* DISPLAY THE REAL AI IMAGE FROM BACKEND */}
              <img src={result.imageUrl} alt="Generated Design" />
              <div className="score-badge">Quality Score: {result.rating}/100</div>
            </div>

            <div className="ai-analysis">
              <h4><FaCheckCircle color="green"/> Expert Suggestion:</h4>
              <p>{result.suggestion}</p>
            </div>

            <div className="action-buttons">
              <button 
                className="primary-btn" 
                style={{ background: '#25D366', flex: 1, border:'none', color:'white' }} 
                onClick={() => window.open(`https://wa.me/919243858944?text=I generated a ${selections.style} ${selections.category} design on your AI Studio. Link: ${result.imageUrl}. Can we proceed with this idea?`, '_blank')}
              >
                <FaWhatsapp /> Order This Idea
              </button>
              <button className="secondary-btn" style={{ flex: 1 }} onClick={reset}>
                <FaRedo /> Create Another
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default AIDesign;