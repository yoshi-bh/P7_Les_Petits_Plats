function updateIngredientsOpt(recipesData) {
	let options = [];
	let optionsElems;

	for (let recipe of recipesData) {
		for (let ingredient of recipe.ingredients) {
			if (!options.includes(ingredient.ingredient.toLowerCase())) {
				options.push(ingredient.ingredient.toLowerCase());
				optionsElems += `<option value="${ingredient.ingredient}"></option>`;
			}
		}
	}
	const datalistElem = document.querySelector("#ingredients");
	datalistElem.innerHTML = optionsElems;
}

function updateAppliancesOpt(recipesData) {
	let options = [];
	let optionsElems;

	for (let recipe of recipesData) {
		if (!options.includes(recipe.appliance.toLowerCase())) {
			options.push(recipe.appliance.toLowerCase());
			optionsElems += `<option value="${recipe.appliance}"></option>`;
		}
	}
	const datalistElem = document.querySelector("#appliances");
	datalistElem.innerHTML = optionsElems;
}

function updateUstensilsOpt(recipesData) {
	let options = [];
	let optionsElems;

	for (let recipe of recipesData) {
		for (let ustensil of recipe.ustensils) {
			if (!options.includes(ustensil.toLowerCase())) {
				options.push(ustensil.toLowerCase());
				optionsElems += `<option value="${ustensil}"></option>`;
			}
		}
	}
	const datalistElem = document.querySelector("#ustensils");
	datalistElem.innerHTML = optionsElems;
}

function AddInputListener(el, type) {
	el.addEventListener("change", function (e) {
		// timer = setTimeout(function () {
		// console.log(el.value);
		addTag(el.value, type);
		el.value = "";
		// }, 1);
	});
	// el.addEventListener("blur", function (e) {
	// 	clearTimeout(timer);
	// });
}

function initDropdownMenus() {
	const ingredientInput = document.querySelector("#ingredient");
	const applianceInput = document.querySelector("#appliance");
	const ustensilInput = document.querySelector("#ustensil");

	AddInputListener(ingredientInput, "ingredient");
	AddInputListener(applianceInput, "appliance");
	AddInputListener(ustensilInput, "ustensil");
}
