// index.js
const bcd = require("@mdn/browser-compat-data");

// Use the imported data from bcd here
console.log(bcd.fetchAPI("fetch"));

function addData(row, browsers) {
	browsers = ["y", "y", "y", "y", "y", "y"];
	const selectedRow = document.getElementById(row);

	if (row == "currently") {
		for (let i = 0; i < browsers.length; i++) {
			const td = document.createElement("td");
			selectedRow.appendChild(td);
			const span = document.createElement("span");
			span.className = "material-symbols-outlined";
			span.innerHTML = "check_circle";
			td.appendChild(span);
		}
	} else {
	}
	const support = bcd.css.properties.background.__compat;
	console.log(support);
}
