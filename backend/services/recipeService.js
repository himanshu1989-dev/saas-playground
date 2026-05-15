export function findRecipeByDishId(dishId) {
    const recipes = require("../data/recipes.json");
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].dishId === dishId) {
            return {
                ingredients: recipes[i].ingredients,
                steps: recipes[i].steps,
            };
        }
    }
}