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
	console.log("searching...........");
	console.log(filteredRecipes);
	console.log(recipes);
	filterTags();
	if (filteredRecipes.length <= 0) {
		displayNoResult();
		filteredRecipes = new Array(...recipes);
	} else {
		console.log("ELSE");
		console.log(filteredRecipes);
		displayRecipes(filteredRecipes);
	}
	resetTags();
	displayTags(ingredients, "ingredient");
	displayTags(appliances, "appliance");
	displayTags(ustensils, "ustensil");
	updateIngredientsOpt(filteredRecipes, ingredients);
	// updateIngredientsOpt(filteredRecipes);
	updateAppliancesOpt(filteredRecipes, appliances);
	updateUstensilsOpt(filteredRecipes, ustensils);
}

function updtIngrOpt(filter) {
	updateIngredientsOpt(filteredRecipes, ingredients, filter);
}
function updtApplOpt(filter) {
	updateAppliancesOpt(filteredRecipes, appliances, filter);
}
function updtUstlOpt(filter) {
	updateUstensilsOpt(filteredRecipes, ustensils, filter);
}

function checkSrchUpdate() {
	const input = document.querySelector("#main-search");

	if (
		input.value.length < 3 &&
		[...ingredients, ...appliances, ...ustensils].length === 0
	) {
		console.log("not long enough!");
		return;
	} else {
		search();
	}
}

function initSrchFunct(recipesData) {
	recipes = recipesData;
	filterTags();

	document
		.querySelector("#main-search")
		.addEventListener("input", checkSrchUpdate);
}
