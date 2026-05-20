import recipes from "../data/recipes.json" with { type: "json" };

export function findRecipeByDishId(dishName) {
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].dishName === dishName) {
      return {
        ingredients: recipes[i].ingredients,
        steps: recipes[i].steps,
      };
    }
  }
}
