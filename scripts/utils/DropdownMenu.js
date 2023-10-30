function updateIngredientsOpt(recipesElem) {
	let options = [];
	let optionsElems;

	for (let recipe of recipesElem) {
		for (let ingredient of recipe._ingredients) {
			if (!options.includes(ingredient.ingredient)) {
				options.push(ingredient.ingredient);
				optionsElems += `<option value="${ingredient.ingredient}"></option>`;
			}
		}
	}
	const datalistElem = document.querySelector("#ingredients");
	datalistElem.innerHTML = optionsElems;
}

function updateAppliancesOpt(recipesElem) {
	let options = [];
	let optionsElems;

	for (let recipe of recipesElem) {
		if (!options.includes(recipe._appliance)) {
			options.push(recipe._appliance);
			optionsElems += `<option value="${recipe._appliance}"></option>`;
		}
	}
	const datalistElem = document.querySelector("#appliances");
	datalistElem.innerHTML = optionsElems;
}

function updateUstensilsOpt(recipesElem) {
	let options = [];
	let optionsElems;

	for (let recipe of recipesElem) {
		for (let ustensil of recipe._ustensils) {
			if (!options.includes(ustensil)) {
				options.push(ustensil);
				optionsElems += `<option value="${ustensil}"></option>`;
			}
		}
	}
	const datalistElem = document.querySelector("#ustensils");
	datalistElem.innerHTML = optionsElems;
}

function AddInputListener(el, type) {
	el.addEventListener("change", function (e) {
		timer = setTimeout(function () {
			// console.log(el.value);
			addTag(el.value, type);
      el.value = "";
		}, 1);
	});
	el.addEventListener("blur", function (e) {
		clearTimeout(timer);
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
