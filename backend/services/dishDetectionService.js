import fs from "node:fs";
import OpenAI from "openai";

export async function detectDish() {
  console.log("Starting dish detection...");
  const openAi = new OpenAI();

  const dishImagePath = "../uploads/dish.jpg";
  if (!fs.existsSync(dishImagePath)) {
    throw new Error("Dish image not found at path: " + dishImagePath);
  }

  const base64Image = fs.readFileSync(dishImagePath, "base64");

  const prompt = `
Identify the dish in this image.

Return valid JSON only using this exact structure:

{
  "dishes": [
    {
      "dishName": "",
      "confidence": 0,
      "cuisine": ""
    }
  ],
  "visibleIngredients": []
}

Field meaning:
- dishes: array of 2 or more likely dish candidates
- dishName: the most likely full dish name
- confidence: number from 1 to 100 indicating confidence that the dishName is correct
- cuisine: specific cuisine when possible, such as "North Indian", "South Indian", "Punjabi", "Gujarati", "Chinese", "Thai", "Italian", "Mexican", "Tex-Mex"
- visibleIngredients: ingredients visually visible in the image, such as "paneer", "rice", "bread", "chicken", "tomato", "cheese"

Rules:
- Return 2 or more dish candidates.
- Sort dishes by confidence, highest first.
- Do not use ingredient-only names unless the exact dish cannot be determined.
- Do not include markdown.
- Do not wrap the response in a code block.
- Return JSON only.
`.trim();

  const response = await openAi.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: prompt },
          {
            type: "input_image",
            image_url: `data:image/jpeg;base64,${base64Image}`,
            detail: "low",
          },
        ],
      },
    ],
  });

  const detectedDish = JSON.parse(response.output_text);

  if (
    !detectedDish ||
    !detectedDish.dishes ||
    !detectedDish.dishes[0] ||
    !detectedDish.dishes[0].dishName
  ) {
    return "Unknown dish";
  }

  return detectedDish.dishes[0].dishName;
}
