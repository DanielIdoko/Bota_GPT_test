import { config } from "dotenv";

config({
  path: "./.env",
});

export const { PORT, DB_PASSWORD, DB_USERNAME } = process.env;
