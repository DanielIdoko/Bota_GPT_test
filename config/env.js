import { config } from "dotenv";

config({
  path: "./.env",
});

export const { PORT, DB_PASSWORD, DB_USERNAME, GEMINI_API_KEY } = process.env;
