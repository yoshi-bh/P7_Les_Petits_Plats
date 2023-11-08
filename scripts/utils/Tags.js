function getTagDOM(tag, type) {
	tagElem = document.createElement("div");
	tagElem.className = "tag";
	tagElem.innerHTML = `<p>${tag}</p>
                       <a class="clickable">x</a>`;
	tagElem.querySelector("a.clickable").onclick = () =>
		removeTag(tag, `${type}`);
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
