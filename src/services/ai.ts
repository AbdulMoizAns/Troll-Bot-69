import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT } from '../prompt';

// Initialize the SDK. It will pick up the API key from the environment.
// Note: In Vite, we use import.meta.env for client-side env vars, but the platform
// injects process.env.GEMINI_API_KEY via the vite config define.
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });

let chatSession: any = null;

export const initChat = () => {
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 1.0,
    },
  });
  return chatSession;
};

export const sendMessage = async (message: string, mode: string) => {
  if (!chatSession) {
    initChat();
  }
  
  try {
    // Prepend the current mode to the message invisibly to guide the AI
    const contextualMessage = `[CURRENT MODE: ${mode}]\nUser: ${message}`;
    const response = await chatSession.sendMessage({ message: contextualMessage });
    return response.text;
  } catch (error: any) {
    console.error("Error sending message to Gemini:", error);
    if (error.message?.includes('SAFETY')) {
      return "⚠️ SYSTEM OVERRIDE: Your request triggered the ultimate safety filters. Even Dark Pro Bot 69 has limits set by the universe. Try something slightly less radioactive. ☢️";
    }
    return "❌ ERROR 404: Bot brain fried. Please try again later.";
  }
};
