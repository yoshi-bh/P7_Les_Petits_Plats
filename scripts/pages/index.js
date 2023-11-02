async function getData() {
	const response = await fetch("./data/recipes.json");
	const data = await response.json();

	return data.recipes;
}

// function createRecipesElem(recipesData) {
// 	return Array.from(recipesData, (recipe) => new RecipeCard(recipe));
// }

function displayNoResult() {
	console.log("NO RESULT!!!");
	document.querySelector(".article-grid").innerHTML = "";
	const noResultContainer = document.querySelector(".no-result-container");
	const inputValue = document.querySelector("#main-search").value;

	noResultContainer.innerHTML = `<p>Aucune recette ne contient '${inputValue}' vous pouvez chercher «tarte aux pommes», «poisson», etc.</p>`;
}

function displayRecipes(recipesData) {
	document.querySelector(".no-result-container").innerHTML = "";
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
	displayRecipes(recipesData);
	initDropdownMenus();
	updateIngredientsOpt(recipesData);
	updateAppliancesOpt(recipesData);
	updateUstensilsOpt(recipesData);
	// displayTags()

	initSrchFunct(recipesData);
}

init();
