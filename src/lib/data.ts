import { GoogleGenAI } from "@google/genai";

import { history } from "./shared.svelte";

export async function getGeminiResponse(message: string) {
  try {
    const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL_NAME;
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!MODEL_NAME) {
      throw new Error(
        "MODEL_NAME is not defined in your environment variables."
      );
    }

    if (!API_KEY) {
      throw new Error("API_KEY is not defined in your environment variables.");
    }

    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const chat = ai.chats.create({
      model: MODEL_NAME,
      history: history,
    });

    const response = await chat.sendMessage({
      message: message,
    });

    return response.text;
  } catch (err) {
    console.error(err);
    throw new Error("응답 실패");
  }
}
