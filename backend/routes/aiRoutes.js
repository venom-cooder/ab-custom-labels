const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// POST: Generate AI Design & Analysis
router.post('/generate', async (req, res) => {
  // Accepting new detailed parameters
  const { category, shape, bgColor, textColor, font, style, text, customPrompt } = req.body;

  try {
    // --- 1. IMAGE GENERATION (Pollinations.ai) ---
    // Constructing a hyper-detailed prompt based on user inputs
    const basePrompt = `Professional ${style} style ${category} design, ${shape} shape. Background color: ${bgColor}. Text color: ${textColor}. Font style: ${font}. Text: "${text}".`;
    
    // Add custom user details if provided
    const additionalDetails = customPrompt ? `Additional details: ${customPrompt}.` : "";
    
    const finalImagePrompt = `${basePrompt} ${additionalDetails} high quality product label, vector style, studio lighting, clean lines, 4k resolution, no watermarks.`;
    
    const randomSeed = Math.floor(Math.random() * 10000);
    const encodedPrompt = encodeURIComponent(finalImagePrompt);
    
    // Pollinations URL
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${randomSeed}&nologo=true`;

    // --- 2. EXPERT ANALYSIS (Google Gemini API) ---
    let rating = 88;
    let suggestion = `Great choice of ${bgColor} and ${textColor}! This ${style} look pairs well with our premium finishes.`;

    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const analysisPrompt = `
          You are a professional Printing & Brand Design Expert at 'AB Custom Labels'.
          A user wants a ${category} with these specs:
          - Style: ${style}
          - Shape: ${shape}
          - Colors: ${bgColor} (Background) & ${textColor} (Text)
          - Font: ${font}
          - User Vision: "${customPrompt}"

          1. Give a quality score out of 100 (be generous but realistic, 85-99).
          2. Give ONE short, specific professional printing suggestion (e.g., "Use Gold Foil for the text," "Glossy lamination recommended for durability," "Use waterproof vinyl for this shape").

          Return ONLY a JSON object: { "rating": number, "suggestion": "string" }
        `;

        const result = await model.generateContent(analysisPrompt);
        const response = await result.response;
        const textResponse = response.text();
        const jsonStr = textResponse.replace(/```json|```/g, '').trim();
        const aiData = JSON.parse(jsonStr);
        
        if (aiData.rating) rating = aiData.rating;
        if (aiData.suggestion) suggestion = aiData.suggestion;
        
      } catch (aiError) {
        console.error("Gemini AI Error:", aiError.message);
      }
    }

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