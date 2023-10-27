class RecipeCard {
	constructor(recipe) {
		this._id = recipe.id;
		this._image = recipe.image;
		this._name = recipe.name;
		this._servings = recipe.servings;
		this._ingredients = recipe.ingredients;
		this._time = recipe.time;
		this._description = recipe.description;
		this._appliance = recipe.appliance;
		this._ustensils = recipe.ustensils;
	}

	get name() {
		return this._name;
	}

	createRecipeCardElem() {
		const recipeCardElem = document.createElement("article");
		recipeCardElem.className = "card";
		let ingredientsElemList = "";

		for (let ingredientObj of this._ingredients) {
			ingredientsElemList += `<div class="ingredient-container">
                                <p>${ingredientObj.ingredient}</p>
                                <p>${ingredientObj.quantity}${ingredientObj.unit}</p>
                              </div>`;
		}

		const recipeCardContent = `<div class="img-container">
                                <img src="./assets/img/recettes/${this._image}" alt="${this._name}" />
                              </div>
                              <div class="text-container">
                                <h3>${this._name}</h3>
                                <h4>RECETTE</h4>
                                <p class="description">
                                  ${this._description}
                                </p>
                                <h4>Ingrédients</h4>
																<div class="ingredients-grid">
                                	${ingredientsElemList}
																</div>
                              </div>`;
		recipeCardElem.innerHTML = recipeCardContent;
		return recipeCardElem;
	}
}
