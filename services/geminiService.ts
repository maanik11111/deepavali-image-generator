import { GoogleGenAI, Modality } from "@google/genai";
import type { ImageFile } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSinglePersonPrompt = () => `Generate a photorealistic image based on the person or people in the provided photo, showing them celebrating Deepavali. If there is one person, dress them in traditional Indian attire (a stylish kurtha for a male, or a beautiful chudidar for a female) holding a lit 'diya' (oil lamp). If there is a couple, dress them in complementary traditional Indian attire and have them jointly hold a single lit 'diya'. In either case, they should have warm, happy expressions. The background should be a festive home interior, softly lit and decorated with fairy lights and marigold garlands for Deepavali. The final image should be a high-quality portrait focused on the subject(s).`;

const getCouplePrompt = () => `Generate a photorealistic, high-quality image of this couple celebrating Deepavali together. The male should be wearing a stylish, traditional Indian kurtha, and the female should be wearing a beautiful, traditional chudidar. They should be standing side-by-side, smiling warmly at the camera. Both individuals should be given equal prominence in the frame. Together, their hands should be holding a single lit 'diya' (oil lamp). The background should be a festive home interior, softly lit and decorated with fairy lights and marigold garlands for Deepavali. The final image should be a well-composed portrait focusing on the couple's happy celebration.`;


export const generateDeepavaliImage = async (
  image1: ImageFile,
  image2: ImageFile | null
): Promise<string> => {
  const isCouple = image2 !== null;
  const prompt = isCouple ? getCouplePrompt() : getSinglePersonPrompt();

  const imageParts = [
    { inlineData: { data: image1.base64, mimeType: image1.mimeType } },
  ];

  if (isCouple && image2) {
    imageParts.push({ inlineData: { data: image2.base64, mimeType: image2.mimeType } });
  }

  const contents = {
    parts: [{ text: prompt }, ...imageParts],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: contents,
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    throw new Error("No image data found in the API response.");

  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image. Please check the console for more details.");
  }
};