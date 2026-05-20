import fs from "node:fs";
import path from "node:path";
import Busboy from "busboy";
import { detectDish } from "../services/dishDetectionService.js";
import { findRecipeByDishId } from "../services/recipeService.js";

export function analyzeDishController(req, res) {
  const uploadDirectory = "./uploads";
  const dishImagePath = path.join(uploadDirectory, "dish.jpg");

  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
  }

  const busboy = Busboy({
    headers: req.headers,
  });

  busboy.on("file", (fieldName, file, fileInfo) => {
    console.log("Receiving file field:", fieldName);
    console.log("Original filename:", fileInfo.filename);
    console.log("MIME type:", fileInfo.mimeType);

    if (fieldName !== "dishImage") {
      file.resume();
      return;
    }

    const writeStream = fs.createWriteStream(dishImagePath);

    file.pipe(writeStream);

    writeStream.on("finish", () => {
      fileSaved = true;
      console.log("Image saved as:", dishImagePath);
    });
  });

  let fileSaved = false;

  busboy.on("finish", async () => {
    try {
      if (!fileSaved) {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            error: "No image uploaded",
          }),
        );
        return;
      }

      const dish = await detectDish();

      const recipe = findRecipeByDishId(dish);

      if (recipe === undefined) {
        res.statusCode = 404;
        res.end(
          JSON.stringify({
            error: "Dish not found",
          }),
        );
        return;
      }

      const response = {
        dish: dish,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
      };

      res.statusCode = 200;
      res.end(JSON.stringify(response));
    } catch (error) {
      console.error("Analyze dish error:", error);

      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "Failed to analyze dish",
        }),
      );
    }
  });

  busboy.on("error", (error) => {
    console.error("Upload error:", error);

    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error: "Image upload failed",
      }),
    );
  });

  req.pipe(busboy);
}
