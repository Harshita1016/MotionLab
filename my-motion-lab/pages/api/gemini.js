import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // System prompt to keep answers relevant to animation/motion/project
  const systemPrompt =
    "You are an expert assistant for a motion/animation web app. Always answer ONLY about animation, motion animation, CSS/JS animation, and related project content. If the user asks something unrelated, politely redirect them to animation/motion topics.";

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Gemini API key is missing." });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent([
      { role: "system", parts: [{ text: systemPrompt }] },
      { role: "user", parts: [{ text: prompt }] },
    ]);
    const response = await result.response;
    res.status(200).json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to fetch from Gemini API" });
  }
}
