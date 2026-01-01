import ChatModel from "../schema/Chat.js";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "../config/env.js";

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// desc - Get all chats
export const getAllChats = async (req, res) => {
  try {
    const chats = await ChatModel.findAll();
    res.status(200).json({
      data: chats || [],
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// Create chat
export const createChat = async (req, res) => {
  try {
    const { instructions, input } = req.body;

    if (!input || !instructions) {
      res.status(400).json({
        success: false,
        error: "Please provide the instructions (business data) and input",
      });
    }

    await ChatModel.create({
      instructions,
      input,
    });

    const response = await client.responses.create({
      model: "gpt-4o",
      instructions: instructions,
      input: input,
    });

    res.status(200).json({
      success: true,
      data: "Response: " + response.output_text,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
