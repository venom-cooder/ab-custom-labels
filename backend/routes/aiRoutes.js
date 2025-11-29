const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST: Generate Design
router.post('/generate', async (req, res) => {
  const { category, shape, color, style, text } = req.body;

  // Construct the Prompt
  const prompt = `A high-quality, professional ${category} design. 
  Shape: ${shape}. 
  Primary Color: ${color}. 
  Style: ${style}. 
  Text on design: "${text}". 
  Vector illustration style, clean background, studio lighting, high resolution product label design.`;

  try {
    // 1. CALL GOOGLE IMAGEN (Or OpenAI/Stability if you prefer)
    // For now, I will simulate a successful response so it works instantly for you.
    // To make this real, you would uncomment the API call below and add your GEMINI_API_KEY to .env
    
    /*
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${process.env.GEMINI_API_KEY}`,
      { instances: [{ prompt: prompt }], parameters: { sampleCount: 1 } }
    );
    const imageBase64 = response.data.predictions[0].bytesBase64Encoded;
    const imageUrl = `data:image/png;base64,${imageBase64}`;
    */

    // MOCK RESPONSE (So you can test the UI immediately without paying for API)
    // Returns a relevant placeholder based on color
    const mockImages = {
      'Red': 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=500&auto=format&fit=crop',
      'Blue': 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=500&auto=format&fit=crop',
      'Green': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop',
      'Gold': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop',
      'Black': 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=500&auto=format&fit=crop'
    };

    const mockUrl = mockImages[color] || mockImages['Gold'];

    // 2. GENERATE FAKE "AI ANALYSIS"
    const score = Math.floor(Math.random() * (98 - 85) + 85); // Random score between 85-98
    const suggestions = [
      "This design has high contrast. We recommend a 'Matte Finish' to reduce glare.",
      "The fine details here would look amazing with 'Gold Foil' stamping.",
      "For this shape, our 'Waterproof Vinyl' is the best durability choice.",
      "Great color choice! A 'Glossy Coat' will make this pop on shelves."
    ];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

    // Return Data
    res.json({
      success: true,
      imageUrl: mockUrl, // Replace with real AI url later
      rating: score,
      suggestion: randomSuggestion
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI Generation Failed", error: err.message });
  }
});

module.exports = router;