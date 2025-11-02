// listModels.js
import fetch from "node-fetch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // safer than hardcoding

async function listModels() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Available Gemini Models:");
    data.models.forEach((model) => console.log(`- ${model.name}`));
  } catch (err) {
    console.error("Error fetching models:", err.message);
  }
}

listModels();
