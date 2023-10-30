let tags = [];

let ingredients = [];
let appliances = [];
let ustensils = [];

function addTag(newTag, type) {
	// switch (type) {
	// 	case "ingredient":
	// 		ingredients.push(newTag);
	// 		break;
	// 	case "appliance":
	// 		appliances.push(newTag);
	// 		break;
	// 	case "ustensil":
	// 		ustensils.push(newTag);
	// 		break;
	// }
	tags.push(newTag);
	displayTags();
}

function removeTag(elem) {
	// console.log(tags);
	tags = tags.filter((tag) => tag !== elem.parentNode.querySelector("p").innerHTML);
	// console.log(tags);
	elem.parentNode.remove();
}

function getTagDOM(tag) {
	tagElem = document.createElement("div");
	tagElem.className = "tag";

	tagElem.innerHTML = `<p>${tag}</p>
                       <a onclick="removeTag(this)" class="clickable">x</a>`;
	return tagElem;
}

function displayTags() {
	const tagContainerElem = document.querySelector(".tag-selected");
	tagContainerElem.innerHTML = "";

	for (let tag of tags) {
		tagContainerElem.appendChild(getTagDOM(tag));
	}
}
