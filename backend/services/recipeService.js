import recipes from "../data/recipes.json" with { type: "json" };

export function findRecipeByDishId(dishId) {
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].dishId === dishId) {
      return {
        ingredients: recipes[i].ingredients,
        steps: recipes[i].steps,
      };
    }
  }
}
