function filter() {
	const list = document.getElementById("container").children;
	inputVal = document.getElementById("search").value;
	console.log(inputVal);

	for (let i = 0; i < list.length; i++) {
		value = list[i].id;
		element = document.getElementById(list[i].id);
		const searchValue = document.getElementById("search").value.toLowerCase();
		if (element.textContent.toLowerCase().includes(searchValue)) {
			element.style.display = "";
			console.log(value);
		} else {
			element.style.display = "none";
		}
	}
}

window.addEventListener("scroll", handleScroll);

function handleScroll() {
	const searchInput = document.getElementById("search");
	const isPinned = searchInput.offsetTop <= window.scrollY + 5.5; // Use scrollY instead of pageYOffset
	searchInput.classList.toggle("is-pinned", isPinned);
}
