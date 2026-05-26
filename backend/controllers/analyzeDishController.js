import fs from "node:fs";

import { detectDish } from "../services/dishDetectionService.js";
import { findRecipeByDishId } from "../services/recipeService.js";

function deleteTemporaryDishImage(dishImagePath) {
  fs.unlink(dishImagePath, (error) => {
    if (error) {
      console.error("Failed to delete temporary dish image:", error);
      return;
    }

    console.log("Temporary dish image deleted:", dishImagePath);
  });
}

export async function analyzeDishController(req, res) {
  const dishImagePath = "./uploads/dish.jpg";

  try {
    if (!fs.existsSync(dishImagePath)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          error: "No uploaded dish image found. Please upload an image first.",
        }),
      );
      return;
    }

    const dish = await detectDish();

    const recipe = findRecipeByDishId(dish);

    if (recipe === undefined) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          error: "Dish not found",
        }),
        () => {
          deleteTemporaryDishImage(dishImagePath);
        },
      );
      return;
    }

    const response = {
      dish: dish,
      aboutDish: recipe.aboutDish,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      nutritionSummary: recipe.nutritionSummary,
      videoUrl: recipe.videoUrl,
    };

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response), () => {
      deleteTemporaryDishImage(dishImagePath);
    });
  } catch (error) {
    console.error("Analyze dish error:", error);

    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: "Failed to analyze dish",
      }),
      () => {
        if (fs.existsSync(dishImagePath)) {
          deleteTemporaryDishImage(dishImagePath);
        }
      },
    );
  }
}