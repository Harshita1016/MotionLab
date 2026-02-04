'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function fetchGeminiResponse(userPrompt) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("Missing Google Generative AI API Key");
  }

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const systemInstruction = `You are a helpful and friendly Motion Design Assistant.

Your goal is to help users with animation code and concepts in the SIMPLEST way possible.

### IMPORTANT OUTPUT RULES:
1. **PLAIN TEXT ONLY**: Do NOT use Markdown formatting like **bold**, *italics*, or ## headers in your explanations. Write just like a normal text message.
2. **CLEAR & SHORT**: Keep explanations very short and easy to understand. Avoid technical jargon if possible.
3. **CODE BLOCKS**: You CAN use markdown for code blocks (e.g. \`\`\`css ... \`\`\`), but the text around it must be plain.

### IF USER ASKS FOR CODE:
1. Say "Here is the code:"
2. Provide the code block.
3. Briefly explain how to use it in 1-2 sentences.

### IF USER ASKS A QUESTION:
Answer directly and simply. Imagine you are explaining to a beginner.

### TONE:
Friendly, encouraging, and direct.

User's prompt: ${userPrompt}
`;

  try {
    const result = await model.generateContent(systemInstruction);
    const response = await result.response;
    const text = response.text();

    // Clean up if there are markdown code blocks
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // The previous implementation tried to JSON parse a likely non-JSON response.
    // The prompt asks for animation code/explanation, not specifically JSON.
    // However, the original code had `return JSON.parse(cleanText)`.
    // Looking at `AIAssistantSection.jsx`, it expects text, and tries to match code blocks within it.
    // So returning raw text is probably safer unless the prompt specifically requests JSON.
    // The prompt does NOT strictly enforce JSON output structure.
    // So I will return the text directly. 
    return text;

  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
}

