import ChatModel from "../schema/Chat.js";
import { GEMINI_API_KEY } from "../config/env.js";
import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// desc - Get all chats
export const getAllChats = async (req, res) => {
  try {
    const chats = await ChatModel.findAll();
    if (chats) {
      res.status(200).json({
        data: chats || [],
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// Create chat
export const createChat = async (req, res) => {
  try {
    const { instructions, input } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [instructions, input],
    });

    const aiResponse = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error("AI returned no content");
    }

    await ChatModel.create({
      instructions,
      input,
      aiResponse,
    });

    res.status(200).json({
      success: true,
      message: "Chat successfully created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;

    const deleteRows = await ChatModel.destroy({
      where: { id: chatId },
    });

    if (deleteRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Chat was not found. Try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
