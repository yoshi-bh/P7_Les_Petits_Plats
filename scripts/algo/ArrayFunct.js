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
	console.log("updating tag: " + type);
	console.log(newTag);
	search();
}

function removeTag(elem, type) {
	console.log(type);
	switch (type) {
		case "ingredient":
			ingredients.splice(ingredients.indexOf(elem), 1);
			console.log(ingredients);
			break;
		case "appliance":
			appliances.splice(appliances.indexOf(elem), 1);
			console.log(appliances);
			break;
		case "ustensil":
			ustensils.splice(ustensils.indexOf(elem), 1);
			console.log(ustensils);
			break;
	}
	// console.log(tags);
	// tags = tags.filter(
	// 	(tag) => tag !== elem.parentNode.querySelector("p").innerHTML
	// );
	// console.log(tags);

	// elem.parentNode.remove();
	search();
}

function filterIngredients(i) {
	if (ingredients.length === 0) {
		return true;
	}
	let hasMatch = false;
	for (let ingredientTag of ingredients) {
		// console.log("filtering for " + ingredientTag);
		// console.log(filteredRecipes[i]);
		// console.log(ingredients);
		for (let ingredient of filteredRecipes[i].ingredients) {
			// console.log(`${ingredient.ingredient} VS ${ingredientTag}`);
			if (ingredient.ingredient.toLowerCase() === ingredientTag.toLowerCase()) {
				console.log("found a match!");
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
	console.log("filtering Appliances");
	for (let applianceTag of appliances) {
		// for (let appliance of filteredRecipes[i].appliances) {
		// console.log(`${appliance.appliance} VS ${applianceTag}`);
		if (
			filteredRecipes[i].appliance.toLowerCase() === applianceTag.toLowerCase()
		) {
			console.log("found a match!");
			return true;
		}
		// }
	}
	filteredRecipes.splice(i, 1);
	return false;
}

function filterUstensils(i) {
	if (ustensils.length === 0) {
		return true;
	}
	console.log("filtering Ustensils");
	for (let ustensilTag of ustensils) {
		let hasMatch = false;
		for (let ustensil of filteredRecipes[i].ustensils) {
			// console.log(`${ustensil.ustensil} VS ${ustensilTag}`);
			if (ustensil.toLowerCase() === ustensilTag.toLowerCase()) {
				console.log("found a match!");
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
			console.log("skiping to next recipe INGR missing");
			continue;
		}
		if (!filterAppliances(i - 1)) {
			console.log("skiping to next recipe APPL missing");
			continue;
		}
		if (!filterUstensils(i - 1)) {
			console.log("skiping to next recipe USTN missing");
			continue;
		}
	}
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
