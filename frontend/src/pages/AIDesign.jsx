import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMagic, FaArrowRight, FaCheckCircle, FaRedo, FaWhatsapp, FaPalette, FaShapes, FaFont, FaLightbulb, FaArrowLeft, FaImages, FaLayerGroup, FaIdCard, FaPenNib, FaTag, FaExpand, FaImage } from 'react-icons/fa';

const AIDesign = () => {
  const navigate = useNavigate();
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
    text: '',
    font: '',
    ratio: '1:1',     // Added ratio
    bgType: 'Plain',  // Added background type
    customPrompt: ''
  });

  // Options Configuration
  const categories = ['Label', 'Sticker', 'Logo', 'Business Card'];
  const shapes = ['Circle', 'Square', 'Rectangle', 'Die-Cut', 'Oval'];
  const colors = ['Gold', 'Black', 'Red', 'Blue', 'Green', 'White', 'Purple', 'Teal'];
  const ratios = ['1:1 (Square)', '4:3 (Standard)', '3:4 (Portrait)', '16:9 (Wide)'];
  const bgTypes = ['Plain Color', 'Photo Scene', 'Abstract Pattern'];
  
  const styles = [
    { name: 'Minimalist', desc: 'Clean lines, lots of whitespace, modern simple look.' },
    { name: 'Vintage', desc: 'Retro textures, old-school typography, classic feel.' },
    { name: 'Luxury', desc: 'Elegant, gold/silver accents, premium serif fonts.' },
    { name: 'Cyberpunk', desc: 'Neon colors, futuristic, high contrast, tech vibe.' },
    { name: 'Playful', desc: 'Bright colors, fun fonts, cartoonish elements.' },
    { name: 'Botanical', desc: 'Nature inspired, leaves, flowers, organic tones.' }
  ];

  const fonts = [
    { name: 'Serif', desc: 'Classic & Elegant (Times New Roman style)' },
    { name: 'Sans-Serif', desc: 'Modern & Clean (Arial/Helvetica style)' },
    { name: 'Script', desc: 'Handwritten & Fancy (Cursive style)' },
    { name: 'Bold Display', desc: 'Strong & Impactful (Poster style)' }
  ];

  const handleSelect = (key, value) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const generateDesign = async () => {
    if (!selections.text) return alert("Please enter your Brand Name or Text");
    
    setStep(6); // Go to Loading Screen (Step 6 based on new flow)
    setLoading(true);

    try {
      // Calculate dimensions based on ratio
      let width = 1024;
      let height = 1024;
      if (selections.ratio.includes('4:3')) { height = 768; }
      else if (selections.ratio.includes('3:4')) { width = 768; }
      else if (selections.ratio.includes('16:9')) { height = 576; }

      // Enhanced Prompt Construction for better color accuracy
      const bgPrompt = selections.bgType === 'Plain Color' 
        ? `solid ${selections.color} background, no background objects, clean background` 
        : `${selections.bgType} background matching ${selections.color} theme`;

      const enhancedPrompt = `Professional ${selections.style} ${selections.category} design. Shape: ${selections.shape}. Text: "${selections.text}" written clearly in ${selections.font} font. Primary Color: ${selections.color}. ${bgPrompt}. High quality product design, vector style, studio lighting, 4k resolution. ${selections.customPrompt}`;

      // Send modified selections to backend
      const payload = { 
        ...selections, 
        width, 
        height,
        customPrompt: enhancedPrompt // Override the custom prompt with our enhanced version
      };

      const res = await axios.post(`${API_URL}/api/ai/generate`, payload);
      
      if (res.data.success) {
        setResult(res.data);
        setStep(7); // Go to Result Screen
      } else {
        throw new Error("Generation failed");
      }
    } catch (err) {
      console.error("AI Generation Error:", err);
      alert("AI Generation failed. Please try again.");
      setStep(5); // Go back to last input step
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setSelections({ category: '', shape: '', color: '', style: '', text: '', font: '', ratio: '1:1', bgType: 'Plain', customPrompt: '' });
    setResult(null);
  };

  return (
    <div className="app-container" style={{ background: '#f4f6f8', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '3rem 1rem 1rem' }}>
        <h1 className="hero-title" style={{ fontSize: '2.5rem', color: '#111', marginBottom:'10px' }}>
          AB <span style={{ color: '#8B3DFF' }}>AI STUDIO</span>
        </h1>
        <p style={{ color: '#666' }}>Design your dream label in seconds using Real AI.</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        
        {/* PROGRESS BAR */}
        <div style={{display:'flex', gap:'5px', marginBottom:'30px'}}>
            {[1,2,3,4,5,6,7].map(num => (
                <div key={num} style={{flex:1, height:'6px', borderRadius:'3px', background: step >= num ? '#8B3DFF' : '#ddd', transition:'0.3s'}}></div>
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
            <div style={{marginTop:'30px'}}>
               <label className="ai-label">Brand Name / Text</label>
               <input 
                 className="clean-input" 
                 placeholder="Ex: Urban Coffee Co." 
                 value={selections.text}
                 onChange={(e) => handleSelect('text', e.target.value)}
               />
            </div>
            <button 
              className="primary-btn" 
              disabled={!selections.category || !selections.text}
              onClick={() => setStep(2)}
              style={{ width: '100%', marginTop: '20px', opacity: (selections.category && selections.text) ? 1 : 0.5 }}
            >
              Next Step <FaArrowRight />
            </button>
          </motion.div>
        )}

        {/* STEP 2: STYLE & SHAPE */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="ai-card">
            <h3>2. Define the Vibe</h3>
            
            <label className="ai-label"><FaMagic/> Choose Visual Style</label>
            <div className="ai-grid">
              {styles.map(s => (
                <button key={s.name} className={`ai-option ${selections.style === s.name ? 'active' : ''}`} onClick={() => handleSelect('style', s.name)} style={{textAlign:'left', padding:'15px'}}>
                  <div style={{fontWeight:'bold', marginBottom:'5px'}}>{s.name}</div>
                  <div style={{fontSize:'0.8rem', color:'#888', fontWeight:'400'}}>{s.desc}</div>
                </button>
              ))}
            </div>

            <label className="ai-label" style={{marginTop:'30px'}}><FaShapes/> Choose Shape</label>
            <div className="ai-chips">
              {shapes.map(s => (
                <button key={s} className={`chip ${selections.shape === s ? 'active' : ''}`} onClick={() => handleSelect('shape', s)}>{s}</button>
              ))}
            </div>

            <div style={{display:'flex', gap:'10px', marginTop:'30px'}}>
              <button className="secondary-btn" onClick={() => setStep(1)}><FaArrowLeft/> Back</button>
              <button className="primary-btn" disabled={!selections.style || !selections.shape} onClick={() => setStep(3)} style={{ flex:1 }}>Next Step <FaArrowRight /></button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: COLORS & FONTS */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="ai-card">
            <h3>3. Colors & Typography</h3>
            
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
              <div>
                <label className="ai-label"><FaPalette/> Background Color</label>
                <div className="ai-chips" style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
                   {colors.map(c => (
                     <button key={c} className={`chip ${selections.color === c ? 'active' : ''}`} onClick={() => handleSelect('color', c)} style={{fontSize:'0.8rem', padding:'5px'}}>
                       {c}
                     </button>
                   ))}
                </div>
              </div>
              <div>
                <label className="ai-label"><FaPalette/> Text Color</label>
                <div className="ai-chips" style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
                   {['Black', 'White', 'Gold', 'Silver'].map(c => (
                     <button key={c} className={`chip ${selections.textColor === c ? 'active' : ''}`} onClick={() => handleSelect('textColor', c)} style={{fontSize:'0.8rem', padding:'5px'}}>
                       {c}
                     </button>
                   ))}
                </div>
              </div>
            </div>

            <label className="ai-label" style={{marginTop:'30px'}}><FaFont/> Font Style</label>
            <div className="ai-grid">
              {fonts.map(f => (
                <button key={f.name} className={`ai-option ${selections.font === f.name ? 'active' : ''}`} onClick={() => handleSelect('font', f.name)} style={{textAlign:'left', padding:'15px'}}>
                  <div style={{fontWeight:'bold', marginBottom:'5px'}}>{f.name}</div>
                  <div style={{fontSize:'0.8rem', color:'#888', fontWeight:'400'}}>{f.desc}</div>
                </button>
              ))}
            </div>

            <div style={{display:'flex', gap:'10px', marginTop:'30px'}}>
              <button className="secondary-btn" onClick={() => setStep(2)}><FaArrowLeft/> Back</button>
              <button className="primary-btn" disabled={!selections.font} onClick={() => setStep(4)} style={{ flex:1 }}>Next Step <FaArrowRight /></button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: RATIO & BACKGROUND TYPE */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="ai-card">
            <h3>4. Dimensions & Scene</h3>

            <label className="ai-label"><FaExpand/> Aspect Ratio</label>
            <div className="ai-chips">
              {ratios.map(r => (
                <button key={r} className={`chip ${selections.ratio === r ? 'active' : ''}`} onClick={() => handleSelect('ratio', r)}>{r}</button>
              ))}
            </div>

            <label className="ai-label" style={{marginTop:'30px'}}><FaImage/> Background Type</label>
            <div className="ai-chips">
              {bgTypes.map(type => (
                <button key={type} className={`chip ${selections.bgType === type ? 'active' : ''}`} onClick={() => handleSelect('bgType', type)}>{type}</button>
              ))}
            </div>
            <p style={{fontSize:'0.8rem', color:'#666', marginTop:'10px'}}>
              * 'Plain Color' helps ensure the background matches your color choice exactly.
            </p>

            <div style={{display:'flex', gap:'10px', marginTop:'30px'}}>
              <button className="secondary-btn" onClick={() => setStep(3)}><FaArrowLeft/> Back</button>
              <button className="primary-btn" onClick={() => setStep(5)} style={{ flex:1 }}>Next Step <FaArrowRight /></button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: CUSTOM PROMPT (OPTIONAL) */}
        {step === 5 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="ai-card">
            <h3>5. Final Details (Optional)</h3>
            <p style={{color:'#666', fontSize:'0.9rem', marginBottom:'20px'}}>
              Have a specific vision? Describe it here to guide the AI.
            </p>

            <label className="ai-label"><FaLightbulb/> Your Custom Prompt</label>
            <textarea 
              className="clean-input" 
              rows="4"
              placeholder="Ex: A lion wearing a crown, surrounded by tropical leaves. Use gold textures." 
              value={selections.customPrompt}
              onChange={(e) => handleSelect('customPrompt', e.target.value)}
            />

            <div style={{display:'flex', gap:'10px', marginTop:'30px'}}>
                <button className="secondary-btn" onClick={() => setStep(4)}><FaArrowLeft/> Back</button>
                <div style={{flex:1, display:'flex', flexDirection:'column', gap:'5px'}}>
                  <button className="primary-btn" onClick={generateDesign} style={{width:'100%'}}>
                    <FaMagic /> Generate My Design
                  </button>
                  <span style={{fontSize:'0.75rem', color:'#666', textAlign:'center'}}>* AI generation takes 10-15 seconds</span>
                </div>
            </div>
          </motion.div>
        )}

        {/* STEP 6: LOADING */}
        {step === 6 && (
          <div style={{ textAlign: 'center', padding: '4rem', background:'white', borderRadius:'20px', border:'1px solid #eee' }}>
            <div className="loading-spinner"></div>
            <h2 style={{ marginTop: '20px', color: '#333', fontSize:'1.5rem' }}>Generating Photo...</h2>
            <p style={{ color: '#888', marginBottom: '10px' }}>Applying {selections.style} aesthetics to your {selections.category}</p>
            <p style={{ fontSize:'0.9rem', color:'#e67e22', fontWeight: '600', background: '#fff7ed', padding: '10px', borderRadius: '8px', display: 'inline-block' }}>
               Note: AI takes minimum 10-15 seconds to generate high-quality results. Please wait.
            </p>
            <p style={{ fontSize:'0.8rem', color:'#aaa', marginTop:'20px'}}>Powered by AB Custom AI</p>
          </div>
        )}

        {/* STEP 7: RESULT */}
        {step === 7 && result && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="ai-result-card">
            
            <div className="result-image-container">
              {/* DISPLAY THE REAL AI IMAGE FROM BACKEND */}
              <img src={result.imageUrl} alt="Generated Design" />
              <div className="score-badge">Quality Score: {result.rating}/100</div>
            </div>

            <div className="ai-analysis">
              <h4><FaCheckCircle color="green"/> AB Custom Labels Expert Analysis:</h4>
              <p>{result.suggestion}</p>
              <p style={{marginTop:'10px', fontSize:'0.9rem', color:'#555'}}>
                This design is AI generated with a score of <strong>{result.rating}/100</strong>.
              </p>
            </div>

            <div className="action-buttons" style={{flexDirection: 'column', gap: '15px'}}>
              <button 
                className="primary-btn" 
                style={{ background: '#25D366', border:'none', color:'white', width: '100%' }} 
                onClick={() => window.open(`https://wa.me/919243858944?text=I generated a design on your AI Studio. Link: ${result.imageUrl}. It scored ${result.rating}/100. I want AB Custom Labels to create a 100/100 perfection of this concept.`, '_blank')}
              >
                <FaWhatsapp /> Create a 100/100 by AB Custom Labels
              </button>
              
              <div style={{display: 'flex', gap: '10px'}}>
                 <button className="secondary-btn" style={{ flex: 1 }} onClick={reset}>
                   <FaRedo /> Regenerate
                 </button>
                 <button className="secondary-btn" style={{ flex: 1 }} onClick={() => navigate('/gallery/' + (selections.category.toLowerCase().includes('sticker') ? 'stickers' : 'logos'))}>
                   <FaPenNib /> Customize Older Product
                 </button>
              </div>
            </div>
            
            {/* NEW SECTION: View Our Collections */}
            <div style={{marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px'}}>
               <h3 style={{fontSize: '1.1rem', color: '#333', marginBottom: '15px', textAlign: 'center'}}>Or View Our Premium Collections</h3>
               <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center'}}>
                  <button className="category-rect-btn" onClick={()=>navigate('/gallery/stickers')} style={{padding: '10px 15px', minWidth: 'auto', fontSize: '0.8rem'}}><FaShapes/> Stickers</button>
                  <button className="category-rect-btn" onClick={()=>navigate('/gallery/labels')} style={{padding: '10px 15px', minWidth: 'auto', fontSize: '0.8rem'}}><FaTag/> Labels</button>
                  <button className="category-rect-btn" onClick={()=>navigate('/gallery/logos')} style={{padding: '10px 15px', minWidth: 'auto', fontSize: '0.8rem'}}><FaPenNib/> Logos</button>
                  <button className="category-rect-btn" onClick={()=>navigate('/gallery/cards')} style={{padding: '10px 15px', minWidth: 'auto', fontSize: '0.8rem'}}><FaIdCard/> Cards</button>
               </div>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
};

export default AIDesign;