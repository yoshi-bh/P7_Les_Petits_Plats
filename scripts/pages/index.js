async function getData() {
	const response = await fetch("./data/recipes.json");
	const data = await response.json();

	return data.recipes;
}

// function createRecipesElem(recipesData) {
// 	return Array.from(recipesData, (recipe) => new RecipeCard(recipe));
// }

function displayRecipes(recipesElem, filter = []) {
	const nbRecipesElem = document.querySelector(".tag-search-container h2");
	const recipesGrid = document.querySelector(".article-grid");

	nbRecipesElem.textContent = `${recipesElem.length} recettes`;
	recipesGrid.innerHTML = "";
	for (let elem of recipesElem) {
		recipesGrid.appendChild(elem.createRecipeCardElem());
	}
}

async function init() {
	// fetch data from JSON and build DOM elements
	const recipesData = await getData();
	const recipesElem = Array.from(
		recipesData,
		(recipe) => new RecipeCard(recipe)
	);

	// Update Display
	displayRecipes(recipesElem);
}

init();
