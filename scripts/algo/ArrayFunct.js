let recipes;

let filteredRecipes = [];
let ingredients = [];
let appliances = [];
let ustensils = [];

function sanitizeString(str) {
	str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
	return str.trim().toLowerCase();
}

function filterOptions() {
	const inputValue = sanitizeString(
		document.querySelector("#main-search").value
	);

	filteredRecipes = recipes.filter(
		(recipe) =>
			recipe.name.toLowerCase().includes(inputValue) ||
			recipe.description.toLowerCase().includes(inputValue) ||
			recipe.ingredients.some((ingredient) =>
				ingredient.ingredient.toLowerCase().includes(inputValue)
			)
	);
}

function addTag(newTag, type) {
	document.querySelector(`#${type}`).value = "";
	switch (type) {
		case "ingredient":
			ingredients.push(newTag);
			break;
		case "appliance":
			appliances.push(newTag);
			break;
		case "ustensil":
			ustensils.push(newTag);
			break;
	}
	search();
}

function removeTag(elem, type) {
	document.querySelector(`#${type}`).value = "";
	switch (type) {
		case "ingredient":
			ingredients.splice(ingredients.indexOf(elem), 1);
			break;
		case "appliance":
			appliances.splice(appliances.indexOf(elem), 1);
			break;
		case "ustensil":
			ustensils.splice(ustensils.indexOf(elem), 1);
			break;
	}
	search();
}

function filterIngredients() {
	ingredients.forEach(
		(ingredientTag) =>
			(filteredRecipes = filteredRecipes.filter((fRecipe) =>
				fRecipe.ingredients.some(
					(ingredient) =>
						ingredient.ingredient.toLowerCase() === ingredientTag.toLowerCase()
				)
			))
	);
}

function filterAppliances() {
	appliances.forEach(
		(applianceTag) =>
			(filteredRecipes = filteredRecipes.filter(
				(fRecipe) =>
					fRecipe.appliance.toLowerCase() === applianceTag.toLowerCase()
			))
	);
}

function filterUstensils() {
	ustensils.forEach(
		(ustensilTag) =>
			(filteredRecipes = filteredRecipes.filter((fRecipe) =>
				fRecipe.ustensils.some(
					(ustensil) => ustensil.toLowerCase() === ustensilTag.toLowerCase()
				)
			))
	);
}

function filterTags() {
	filterIngredients();
	filterAppliances();
	filterUstensils();
}

function search() {
	if (document.querySelector("#main-search").value.length >= 3) filterOptions();
	else filteredRecipes = new Array(...recipes);
	filterTags();
	if (filteredRecipes.length <= 0) {
		displayNoResult();
		filteredRecipes = new Array(...recipes);
	} else {
		displayRecipes(filteredRecipes);
	}
	resetTags();
	displayTags(ingredients, "ingredient");
	displayTags(appliances, "appliance");
	displayTags(ustensils, "ustensil");
	updateIngredientsOpt(filteredRecipes, ingredients);
	updateAppliancesOpt(filteredRecipes, appliances);
	updateUstensilsOpt(filteredRecipes, ustensils);
}

function updtIngrOpt() {
	updateIngredientsOpt(
		filteredRecipes,
		ingredients,
		document.querySelector("#ingredient").value
	);
}
function updtApplOpt() {
	updateAppliancesOpt(
		filteredRecipes,
		appliances,
		document.querySelector("#appliance").value
	);
}
function updtUstlOpt() {
	updateUstensilsOpt(
		filteredRecipes,
		ustensils,
		document.querySelector("#ustensil").value
	);
}

function checkSrchUpdate() {
	const input = document.querySelector("#main-search");

	search();
}

function initSrchFunct(recipesData) {
	recipes = recipesData;
	filteredRecipes = new Array(...recipes);
	filterTags();

	document.querySelector("#main-search").addEventListener("input", search);
}
