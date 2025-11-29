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

  // Options Configuration
  const categories = ['Label', 'Sticker', 'Logo', 'Visiting Card'];
  const shapes = ['Circle', 'Square', 'Rectangle', 'Die-Cut', 'Oval'];
  const colors = ['Gold', 'Black', 'Red', 'Blue', 'Green', 'White'];
  const styles = ['Minimalist', 'Luxury', 'Vintage', 'Cyberpunk', 'Playful'];

  const handleSelect = (key, value) => {
    setSelections({ ...selections, [key]: value });
  };

  const generateDesign = async () => {
    if (!selections.text) return alert("Please enter your Brand Name or Text");
    
    setStep(3); // Go to Loading Screen
    setLoading(true);

    try {
      // Call our backend AI route
      const res = await axios.post(`${API_URL}/api/ai/generate`, selections);
      setResult(res.data);
      setLoading(false);
      setStep(4); // Go to Result Screen
    } catch (err) {
      console.error(err);
      alert("AI Generation failed. Please try again.");
      setStep(2); // Go back to customization
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setSelections({ category: '', shape: '', color: '', style: '', text: '' });
    setResult(null);
  };

  return (
    <div className="app-container" style={{ background: '#f8f9fa', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '4rem 1rem 2rem' }}>
        <h1 className="hero-title" style={{ fontSize: '2.5rem', color: '#111' }}>
          AB <span style={{ color: 'var(--primary)' }}>AI STUDIO</span>
        </h1>
        <p style={{ color: '#666' }}>Design your dream label in seconds using Artificial Intelligence.</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        
        {/* STEP 1: CATEGORY SELECTION */}
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="ai-card"
          >
            <h3>1. What do you want to create?</h3>
            <div className="ai-grid">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`ai-option ${selections.category === cat ? 'active' : ''}`}
                  onClick={() => handleSelect('category', cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button 
              className="primary-btn" 
              disabled={!selections.category}
              onClick={() => setStep(2)}
              style={{ width: '100%', marginTop: '20px' }}
            >
              Next <FaArrowRight />
            </button>
          </motion.div>
        )}

        {/* STEP 2: CUSTOMIZATION DETAILS */}
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            className="ai-card"
          >
            <h3>2. Customize the look</h3>
            
            {/* Brand Name Input */}
            <label className="ai-label">Brand Name / Text</label>
            <input 
              className="clean-input" 
              placeholder="Ex: Urban Coffee Co." 
              value={selections.text}
              onChange={(e) => handleSelect('text', e.target.value)}
            />

            {/* Shape Selection */}
            <label className="ai-label"><FaShapes/> Choose Shape</label>
            <div className="ai-chips">
              {shapes.map(s => (
                <span 
                  key={s} 
                  className={`chip ${selections.shape === s ? 'active' : ''}`} 
                  onClick={() => handleSelect('shape', s)}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Color Selection */}
            <label className="ai-label"><FaPalette/> Primary Color</label>
            <div className="ai-chips">
              {colors.map(c => (
                <span 
                  key={c} 
                  className={`chip ${selections.color === c ? 'active' : ''}`} 
                  onClick={() => handleSelect('color', c)}
                >
                  {c}
                </span>
              ))}
            </div>

             {/* Visual Style Selection */}
             <label className="ai-label"><FaFont/> Visual Style</label>
            <div className="ai-chips">
              {styles.map(s => (
                <span 
                  key={s} 
                  className={`chip ${selections.style === s ? 'active' : ''}`} 
                  onClick={() => handleSelect('style', s)}
                >
                  {s}
                </span>
              ))}
            </div>

            <button 
              className="primary-btn" 
              onClick={generateDesign}
              style={{ width: '100%', marginTop: '30px' }}
            >
              <FaMagic /> Generate Design
            </button>
          </motion.div>
        )}

        {/* STEP 3: LOADING STATE */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div className="loading-spinner"></div>
            <h3 style={{ marginTop: '20px', color: '#333' }}>Designing your {selections.category}...</h3>
            <p style={{ color: '#888' }}>Applying {selections.style} aesthetics...</p>
          </div>
        )}

        {/* STEP 4: RESULT & ANALYSIS */}
        {step === 4 && result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="ai-result-card"
          >
            <div className="result-image-container">
              <img src={result.imageUrl} alt="Generated Design" />
              <div className="score-badge">
                AI Score: {result.rating}/100
              </div>
            </div>

            <div className="ai-analysis">
              <h4><FaCheckCircle color="green"/> AB Custom Labels Expert Analysis:</h4>
              <p>{result.suggestion}</p>
            </div>

            <div className="action-buttons">
              <button 
                className="primary-btn" 
                style={{ background: '#25D366', flex: 1 }} 
                onClick={() => window.open(`https://wa.me/919243858944?text=I generated a ${selections.style} ${selections.category} design on your AI Studio. Can we proceed with this idea?`, '_blank')}
              >
                <FaWhatsapp /> Order This Idea
              </button>
              <button className="secondary-btn" style={{ flex: 1 }} onClick={reset}>
                <FaRedo /> Create Another
              </button>
            </div>
            
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#999', marginTop: '20px' }}>
              *Tap "Create Another" to regenerate variations.
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default AIDesign;