/**
 * recipe.js - this is responsible for building the recipe html page
 * using the recipe realted information retrieved from the backend
 */
class RecipePageBuilder {
  constructor(recipeString) {
    this.recipe = JSON.parse(recipeString);
    this.mainSection = document.getElementById("idMainSection");
  }

  createAndPopulateAboutDishSection() {
    const aboutDishSection = document.createElement("section");
    aboutDishSection.id = "idAboutDishSection";
    aboutDishSection.classList.add("about-dish-section");
    aboutDishSection.textContent = this.recipe.aboutDish;
    this.mainSection.appendChild(aboutDishSection);
  }

  createAndPopulateIngredientsSection() {
    const ingredientsSection = document.createElement("section");
    ingredientsSection.id = "idIngredientsSection";
    ingredientsSection.classList.add("ingredients-section");
    const ingredientList = document.createElement("ul");

    for (const recipeOption of this.recipe.recipeOptions) {
      if(recipeOption.optionId === "easy") {
      for (const [key, ingredient] of Object.entries(
        recipeOption.ingredients,
      )) {
        const ingredientDetails = `${key} - ${ingredient.quantity}${ingredient.unit}`;
        const li = document.createElement("li");
        li.textContent = ingredientDetails;
        ingredientList.appendChild(li);
      }
      break;
    }
    }
    ingredientsSection.appendChild(ingredientList);
    this.mainSection.appendChild(ingredientsSection);
  }
  createAndPopulateNutritionSection(recipeOption) {}
  createAndPopulateVideoSection(recipeOption) {}
  createAndPopulateStepsSection(recipeOption) {}
  createAndPopulateSocialMediaFeedbackSection(recipeOption) {}
  createAndPopulateSimilarDishesSection(recipeOption) {}
}
