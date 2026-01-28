
import { GoogleGenAI } from "@google/genai";
import { SimplificationLevel } from "../types";

export const simplifyTopic = async (topic: string, level: SimplificationLevel): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  let systemInstruction = "";
  
  switch (level) {
    case SimplificationLevel.KINDERGARTEN:
      systemInstruction = "You are an expert at explaining complex things to a 5-year-old. Use analogies about toys, candy, playgrounds, or animals. Keep sentences short. No jargon. Be very encouraging.";
      break;
    case SimplificationLevel.GOLDEN_RETRIEVER:
      systemInstruction = "Explain this as if you are talking to a very good dog. Use lots of excitement, mention treats, walks, and belly rubs to make your points. Keep it extremely simple and high energy.";
      break;
    case SimplificationLevel.EMOJI_ONLY:
      systemInstruction = "Explain this complex topic using ONLY emojis. No words allowed. Try to tell a story or process through the sequence of icons.";
      break;
    case SimplificationLevel.STORY_TIME:
      systemInstruction = "Turn this complex problem into a 2-paragraph magical fairytale. There should be a hero, a challenge, and a happy resolution that mirrors the actual concept.";
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain the following topic or problem: "${topic}"`,
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    return response.text || "I'm sorry, I couldn't find a way to make that simple enough. Maybe it's magic?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to simplify. The problem might be too complex even for a super-brain!");
  }
};
