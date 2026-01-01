import { Router } from "express";
import { createChat, getAllChats } from "../controllers/chat.controller.js";

const chatRoute = Router();

// // GET all stored Chats
chatRoute.get('/chats', getAllChats)

// // Make POST request to ask AI question(s)
chatRoute.post('/ask_ai', createChat)


export default chatRoute