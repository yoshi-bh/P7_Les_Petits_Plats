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

	filteredRecipes = [];
	for (let recipe of recipes) {
		if (
			recipe.name.toLowerCase().includes(inputValue) ||
			recipe.description.toLowerCase().includes(inputValue)
		) {
			filteredRecipes.push(recipe);
		} else {
			for (let ingredient of recipe.ingredients) {
				if (ingredient.ingredient.toLowerCase().includes(inputValue)) {
					filteredRecipes.push(recipe);
					break;
				}
			}
		}
	}
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

function filterIngredients(i) {
	if (ingredients.length === 0) {
		return true;
	}
	let hasMatch = false;
	for (let ingredientTag of ingredients) {
		for (let ingredient of filteredRecipes[i].ingredients) {
			if (ingredient.ingredient.toLowerCase() === ingredientTag.toLowerCase()) {
				hasMatch = true;
				break;
			}
		}
		if (!hasMatch) {
			filteredRecipes.splice(i, 1);
			return false;
		}
		hasMatch = false;
	}
	return true;
}

function filterAppliances(i) {
	if (appliances.length === 0) {
		return true;
	}
	for (let applianceTag of appliances) {
		if (
			filteredRecipes[i].appliance.toLowerCase() === applianceTag.toLowerCase()
		) {
			return true;
		}
	}
	filteredRecipes.splice(i, 1);
	return false;
}

function filterUstensils(i) {
	if (ustensils.length === 0) {
		return true;
	}
	for (let ustensilTag of ustensils) {
		let hasMatch = false;
		for (let ustensil of filteredRecipes[i].ustensils) {
			if (ustensil.toLowerCase() === ustensilTag.toLowerCase()) {
				hasMatch = true;
				break;
			}
		}
		if (!hasMatch) {
			filteredRecipes.splice(i, 1);
			return false;
		}
		hasMatch = false;
	}
	return true;
}

function filterTags() {
	for (let i = filteredRecipes.length; i; i--) {
		if (!filterIngredients(i - 1)) {
			// skiping to next recipe INGR missing
			continue;
		}
		if (!filterAppliances(i - 1)) {
			// skiping to next recipe APPL missing
			continue;
		}
		if (!filterUstensils(i - 1)) {
			// skiping to next recipe USTN missing
			continue;
		}
	}
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
