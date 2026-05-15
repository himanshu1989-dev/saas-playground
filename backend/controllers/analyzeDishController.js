import { detectDish } from "../services/dishDetectionService.js";
import { findRecipeByDishId } from "../services/recipeService.js";

function analyzeDishController(req, res) {
    const dish = detectDish();
    const recipe = findRecipeByDishId(dish);
    if (recipe === undefined)
    {
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
        steps: recipe.steps
    }
    res.statusCode = 200;
    res.end(JSON.stringify(response));
}