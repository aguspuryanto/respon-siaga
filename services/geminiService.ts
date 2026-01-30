
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeDisasterReport = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following disaster report and extract structured data: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            disasterType: { type: Type.STRING },
            impactLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Catastrophic'] },
            suggestedStatus: { type: Type.STRING, enum: ['PENDING', 'ACTIVE', 'CRITICAL'] },
            resourceRequirements: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            priorityScore: { type: Type.NUMBER, description: 'Score from 1 to 10' }
          },
          required: ['disasterType', 'impactLevel', 'suggestedStatus', 'resourceRequirements']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return null;
  }
};
