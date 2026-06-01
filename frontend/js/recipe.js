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

  createAndPopulateIngredientsSection(recipeOption) {
    // Create the section element
    const ingredientsSection = document.createElement("section");

    ingredientsSection.id = "idIngredientsSection";

    // Assign the CSS class already defined in CSS file
    ingredientsSection.classList.add("ingredients-section");

    // Add content later
    ingredientsSection.textContent = recipeData
  }
  createAndPopulateNutritionSection(recipeOption) {}
  createAndPopulateVideoSection(recipeOption) {}
  createAndPopulateStepsSection(recipeOption) {}
  createAndPopulateSocialMediaFeedbackSection(recipeOption) {}
  createAndPopulateSimilarDishesSection(recipeOption) {}
}
