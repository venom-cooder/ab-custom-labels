import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMagic, FaArrowRight, FaCheckCircle, FaRedo, FaWhatsapp, FaPalette, FaShapes, FaFont } from 'react-icons/fa';

// Images for simulation (You can add more from your public/images folder)
const MOCK_RESULTS = {
  'Red': 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=500&auto=format&fit=crop',
  'Blue': 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=500&auto=format&fit=crop',
  'Green': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop',
  'Gold': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop',
  'Black': 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=500&auto=format&fit=crop',
  'White': 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=500&auto=format&fit=crop'
};

const AIDesign = () => {
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
  const colors = ['Gold', 'Black', 'Red', 'Blue', 'Green', 'White'];
  const styles = ['Minimalist', 'Luxury', 'Vintage', 'Cyberpunk', 'Playful'];

  const handleSelect = (key, value) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const generateDesign = () => {
    if (!selections.text) return alert("Please enter your Brand Name or Text");
    
    setStep(3); // Loading
    setLoading(true);

    // SIMULATE AI GENERATION (Works 100% of the time)
    setTimeout(() => {
      const mockUrl = MOCK_RESULTS[selections.color] || MOCK_RESULTS['Gold'];
      
      setResult({
        imageUrl: mockUrl,
        rating: Math.floor(Math.random() * (99 - 88) + 88), // Random high score
        suggestion: `Great choice of ${selections.color}! For this ${selections.style} look, we recommend a Matte UV finish to make the text pop.`
      });
      
      setLoading(false);
      setStep(4); // Result
    }, 2000);
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
        <p style={{ color: '#666' }}>Design your dream label in seconds.</p>
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
                  style={{zIndex: 10, position: 'relative'}} // Fix click issue
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
            
            <div className="form-group">
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
            <h3 style={{ marginTop: '20px', color: '#333' }}>Designing...</h3>
            <p style={{ color: '#888' }}>Applying {selections.style} aesthetics to your {selections.category}</p>
          </div>
        )}

        {/* STEP 4: RESULT */}
        {step === 4 && result && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="ai-result-card">
            <div className="result-image-container">
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
                onClick={() => window.open(`https://wa.me/919243858944?text=I generated a ${selections.style} ${selections.category} design on your AI Studio. Can we proceed with this idea?`, '_blank')}
              >
                <FaWhatsapp /> Order This Design
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