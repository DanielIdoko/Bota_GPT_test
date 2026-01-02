import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import { connectToDB } from "./database/db.js";
import chatRoute from "./routes/chat.route.js";

const app = express();

app.use(cors());

app.use(express.json({ extended: false }));

app.use("/api/v1/chat", chatRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bota_GPT_Test",
  });
});

app.listen(PORT, async () => {
  console.log(`App running on http://localhost:${PORT}`);
  await connectToDB();
});
