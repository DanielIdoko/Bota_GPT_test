import { Router } from "express";
import { createChat, deleteChat, getAllChats } from "../controllers/chat.controller.js";

const chatRoute = Router();

// // GET all stored Chats
chatRoute.get('/chats', getAllChats)

// // Make POST request to ask AI question(s)
chatRoute.post('/ask_ai', createChat)

// Delete a single chat by id
chatRoute.delete('/delete-chat/:chatId', deleteChat)


export default chatRoute