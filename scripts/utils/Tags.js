function getTagDOM(tag, type) {
	tagElem = document.createElement("div");
	tagElem.className = "tag";
  console.log("Type is: " + type)

	tagElem.innerHTML = `<p>${tag}</p>
                       <a onclick="removeTag(this, '${type}')" class="clickable">x</a>`;
	return tagElem;
}

function resetTags() {
	document.querySelector(".tag-selected").innerHTML = "";
}

function displayTags(tags, type) {
	const tagContainerElem = document.querySelector(".tag-selected");

	for (let tag of tags) {
		tagContainerElem.appendChild(getTagDOM(tag, type));
	}
}
