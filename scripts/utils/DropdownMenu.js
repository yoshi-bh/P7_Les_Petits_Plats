function updateIngredientsOpt(recipesData, recipesTag, filter = "") {
	let options = [];
	let optionsElems = "";

	console.log(filter);
	console.log(recipesData);

	for (let recipe of recipesData) {
		for (let ingredient of recipe.ingredients) {
			let isFilter = ingredient.ingredient
				.toLowerCase()
				.includes(filter.toLowerCase());
			console.log(ingredient.ingredient + " --> " + isFilter);
			if (!options.includes(ingredient.ingredient.toLowerCase()) && isFilter) {
				options.push(ingredient.ingredient.toLowerCase());
				optionsElems += `<li onclick=addTag('${ingredient.ingredient}', 'ingredient')>${ingredient.ingredient}</li>`;
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
	el.addEventListener("input", function (e) {
		switch (type) {
			case "ingredient":
				updtIngrOpt(el.value);
				break;
			case "appliance":
				updateappliancesOpt();
				break;
			case "ustensil":
				updateustensilsOpt();
				break;
		}
		// if (el.)
		// addTag(el.value, type);
		// el.value = "";
	});
}

function initDropdownMenus() {
	const ingredientInput = document.querySelector("#ingredient");
	const applianceInput = document.querySelector("#appliance");
	const ustensilInput = document.querySelector("#ustensil");

	AddInputListener(ingredientInput, "ingredient");
	AddInputListener(applianceInput, "appliance");
	AddInputListener(ustensilInput, "ustensil");
}
