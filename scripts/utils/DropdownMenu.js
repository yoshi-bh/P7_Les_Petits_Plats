function updateIngredientsOpt(recipesData, recipesTag = [], filter = "") {
	const datalistElem = document.querySelector("#ingredients");
	datalistElem.innerHTML = "";
	let options = [];
	let newRecipesTag = [];

	for (let rTag of recipesTag) {
		newRecipesTag.push(rTag.toLowerCase());
		let li = document.createElement("li");
		li.className = "clickable dropdown-tag";
		li.innerHTML = `${rTag}<img class='close-btn' src='../../assets/img/dropdown-tag-close-btn.svg'>`;
		li.onclick = () => removeTag(rTag, "ingredient");
		datalistElem.appendChild(li);
	}
	for (let recipe of recipesData) {
		for (let ingredient of recipe.ingredients) {
			if (
				!options.includes(ingredient.ingredient.toLowerCase()) &&
				!newRecipesTag.includes(ingredient.ingredient.toLowerCase()) &&
				ingredient.ingredient.toLowerCase().includes(filter.toLowerCase())
			) {
				options.push(ingredient.ingredient.toLowerCase());
				let li = document.createElement("li");
				li.className = "clickable";
				li.innerHTML = ingredient.ingredient;
				li.onclick = () => addTag(ingredient.ingredient, "ingredient");
				datalistElem.appendChild(li);
			}
		}
	}
}

function updateAppliancesOpt(recipesData, recipesTag = [], filter = "") {
	const datalistElem = document.querySelector("#appliances");
	datalistElem.innerHTML = "";
	let options = [];
	let newRecipesTag = [];

	for (let rTag of recipesTag) {
		newRecipesTag.push(rTag.toLowerCase());
		let li = document.createElement("li");
		li.className = "clickable dropdown-tag";
		li.innerHTML = `${rTag}<img class='close-btn' src='../../assets/img/dropdown-tag-close-btn.svg'>`;
		li.onclick = () => removeTag(rTag, "appliance");
		datalistElem.appendChild(li);
	}
	for (let recipe of recipesData) {
		if (
			!options.includes(recipe.appliance.toLowerCase()) &&
			!newRecipesTag.includes(recipe.appliance.toLowerCase()) &&
			recipe.appliance.toLowerCase().includes(filter.toLowerCase())
		) {
			options.push(recipe.appliance.toLowerCase());
			let li = document.createElement("li");
			li.className = "clickable";
			li.innerHTML = recipe.appliance;
			li.onclick = () => addTag(recipe.appliance, "appliance");
			datalistElem.appendChild(li);
		}
	}
}

function updateUstensilsOpt(recipesData, recipesTag = [], filter = "") {
	const datalistElem = document.querySelector("#ustensils");
	datalistElem.innerHTML = "";
	let options = [];
	let newRecipesTag = [];

	for (let rTag of recipesTag) {
		newRecipesTag.push(rTag.toLowerCase());
		let li = document.createElement("li");
		li.className = "clickable dropdown-tag";
		li.innerHTML = `${rTag}<img class='close-btn' src='../../assets/img/dropdown-tag-close-btn.svg'>`;
		li.onclick = () => removeTag(rTag, "ustensil");
		datalistElem.appendChild(li);
	}
	for (let recipe of recipesData) {
		for (let ustensil of recipe.ustensils) {
			if (
				!options.includes(ustensil.toLowerCase()) &&
				!newRecipesTag.includes(ustensil.toLowerCase()) &&
				ustensil.toLowerCase().includes(filter.toLowerCase())
			) {
				options.push(ustensil.toLowerCase());
				let li = document.createElement("li");
				li.className = "clickable";
				li.innerHTML = ustensil;
				li.onclick = () => addTag(ustensil, "ustensil");
				datalistElem.appendChild(li);
			}
		}
	}
}

function openDropdown(el) {
	el.parentElement.classList.toggle("open");

	switch (el.getAttribute("for")) {
		case "ingredient":
			break;
		case "appliance":
			break;
		case "ustensil":
			break;
	}
}

function initDropdownMenus() {
	const ingredientInput = document.querySelector("#ingredient");
	const applianceInput = document.querySelector("#appliance");
	const ustensilInput = document.querySelector("#ustensil");

	ingredientInput.addEventListener("input", () => updtIngrOpt());
	applianceInput.addEventListener("input", () => updtApplOpt());
	ustensilInput.addEventListener("input", () => updtUstlOpt());
}
