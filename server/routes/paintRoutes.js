import express from "express";
import * as dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.route("/").get((req, res) => {
  res.send("Hello from Gemini Image API!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "'prompt' is required" });
    }

    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash-exp-image-generation",
        contents: prompt,
        config: {
          responseModalities: ["Text", "Image"],
        },
      });

    const parts = response?.candidates?.[0]?.content?.parts;

    const imagePart = parts?.find((part) => part.inlineData?.data);
    const base64Image = imagePart?.inlineData?.data;

    if (!base64Image) {
      return res.status(500).json({ error: "Image data not returned" });
    }

    res.status(200).json({ photo: base64Image }); // frontend expects base64
  } catch (error) {
    console.error("Gemini Image API error:", error.message || error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

export default router;
