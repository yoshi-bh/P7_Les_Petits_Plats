async function getData() {
	const response = await fetch("./data/recipes.json");
	const data = await response.json();

	return data.recipes;
}

// function createRecipesElem(recipesData) {
// 	return Array.from(recipesData, (recipe) => new RecipeCard(recipe));
// }

function displayRecipes(recipesData, filter = []) {
	const nbRecipesElem = document.querySelector(".tag-search-container h2");
	const recipesGrid = document.querySelector(".article-grid");

	nbRecipesElem.textContent = `${recipesData.length} recettes`;
	recipesGrid.innerHTML = "";
	for (let elem of recipesData) {
		recipesGrid.appendChild(new RecipeCard(elem).createRecipeCardElem());
	}
}

async function init() {
	// fetch data from JSON and build DOM elements
	const recipesData = await getData();
	// const recipesElem = Array.from(
	// 	recipesData,
	// 	(recipe) => new RecipeCard(recipe)
	// );

	// Update Display
	// displayRecipes(recipesData);
	initDropdownMenus();
	// updateIngredientsOpt(recipesElem);
	// updateAppliancesOpt(recipesElem);
	// updateUstensilsOpt(recipesElem);
	// displayTags()

	initSrchFunct(recipesData);
}

init();
