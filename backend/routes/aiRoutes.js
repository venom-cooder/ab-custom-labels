const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// POST: Generate AI Design & Analysis
router.post('/generate', async (req, res) => {
  const { category, shape, color, style, text } = req.body;

  try {
    // --- 1. IMAGE GENERATION (Free & Unlimited via Pollinations) ---
    // This creates a Real AI Image instantly without an API Key.
    // We construct a detailed prompt to get a high-quality result.
    const imagePrompt = `Professional ${style} style ${category} design, ${shape} shape, dominant color ${color}, text "${text}" written clearly, high quality product label, vector style, studio lighting, white background, 4k, clean design`;
    
    // We add a random seed to ensure a new unique image every time
    const randomSeed = Math.floor(Math.random() * 10000);
    const encodedPrompt = encodeURIComponent(imagePrompt);
    
    // Pollinations URL structure
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${randomSeed}&nologo=true`;

    // --- 2. EXPERT ANALYSIS (Google Gemini API) ---
    // This acts as the "Brain" to give professional advice.
    let rating = 88; // Fallback default if API key is missing or fails
    let suggestion = `Great choice of ${color}! A ${style} look usually pairs well with a matte finish.`; // Fallback

    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Use gemini-1.5-flash for speed and free tier availability
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const analysisPrompt = `
          You are a professional Printing & Brand Design Expert at 'AB Custom Labels'.
          A user wants a ${category} with these specs:
          - Shape: ${shape}
          - Color: ${color}
          - Style: ${style}
          - Text: "${text}"

          1. Give a quality score out of 100 (be generous but realistic, between 85-99).
          2. Give ONE short, specific professional printing suggestion (e.g., "Use Gold Foil for the text," "Glossy lamination recommended for durability," "Use waterproof vinyl for this shape").

          Return ONLY a JSON object: { "rating": number, "suggestion": "string" }
        `;

        const result = await model.generateContent(analysisPrompt);
        const response = await result.response;
        const textResponse = response.text();
        
        // Clean up markdown if Gemini adds it (e.g. ```json ... ```)
        const jsonStr = textResponse.replace(/```json|```/g, '').trim();
        const aiData = JSON.parse(jsonStr);
        
        if (aiData.rating) rating = aiData.rating;
        if (aiData.suggestion) suggestion = aiData.suggestion;
        
      } catch (aiError) {
        console.error("Gemini AI Error (Falling back to defaults):", aiError.message);
        // We continue without crashing so the user still gets their image
      }
    }

    // --- 3. SEND RESPONSE TO FRONTEND ---
    res.json({
      success: true,
      imageUrl: imageUrl,
      rating: rating,
      suggestion: suggestion
    });

  } catch (err) {
    console.error("Generation Route Error:", err);
    res.status(500).json({ message: "Failed to generate design", error: err.message });
  }
});

module.exports = router;