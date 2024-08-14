function load() { 
	document.getElementById("plaintext-error").style.display = "none";
	document.getElementById("ciphertext-input").value = "";
	document.getElementById("sub-table-input").value = "";
	document.getElementById("plaintext-input").value = "";
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function chanceOfTrue(percentChance) {
	percentChance = Math.max(0, Math.min(percentChance, 100));
	const randomValue = Math.random();
	return randomValue <= percentChance / 100;
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const regularCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", "?", "!", "(", ")", '"', "'", ":", ";", "-", "_", "/", " ", "<", ">"];
const dupeRegularCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", "?", "!", "(", ")", '"', "'", ":", ";", "-", "_", "/", " ", "<", ">"];
const specialCharacters = ["á", "é", "í", "ó", "ť"];

const regex = /^[a-z0-9.,?!();"':\/\-_ <>]+$/i;

async function encode() {
	document.getElementById("sub-table-error").style.display = "none";
	const input = document.getElementById("plaintext-input").value;
	const output = document.getElementById("ciphertext-input");
	//const subTable = shuffleArray(regularCharacters);
	const subTableInput = document.getElementById("sub-table-input");
	let subTable = [];

	if (subTableInput.value == "") {
		subTable = shuffleArray(regularCharacters);
	} else {
		subTable = subTableInput.value.split("");

		if (!isValidSubstitutionTable(subTable)) {
			document.getElementById("sub-table-error").style.display = "block";
			return;
		}
	}
	subTableInput.value = subTable.join("");

	console.log(subTable);

	const outputArray = [];

	if (regex.test(input)) {
		document.getElementById("plaintext-error").style.display = "none";
	} else {
		document.getElementById("plaintext-error").style.display = "block";
		console.log("error");
		return;
	}

	let lowercase = input.toLowerCase();

	const inputArray = lowercase.split("");

	let char;
	let num;
	let extraChar;

	for (let i = 0; i < inputArray.length; i++) {
		char = inputArray[i];
		num = dupeRegularCharacters.indexOf(char);
		
		if (i != 0 && char == inputArray[i - 1] && chanceOfTrue(35)) {
			console.log("repeat " + char);
			extraChar = subTable[dupeRegularCharacters.indexOf(">")];
			console.log(dupeRegularCharacters.indexOf(">"));
			console.log(extraChar);

			outputArray.push(subTable[num] + extraChar);
		} else if (chanceOfTrue(10)) {
			console.log("add and delete " + char);
			extraChar = subTable[Math.floor(Math.random() * (subTable.length - 1))] + subTable[dupeRegularCharacters.indexOf("<")];
			console.log(extraChar);

			outputArray.push(subTable[num] + extraChar);
		} else {
			console.log(char);
			outputArray.push(subTable[num]);
		}
		output.value = outputArray.join("");
	}
}

function refreshSubTable() {
	const subTable = shuffleArray(regularCharacters);
	const subTableInput = document.getElementById("sub-table-input");
	subTableInput.value = subTable.join("");
}

function copyToClipboard(obj) {
	const element = document.getElementById(obj);
	element.select();
	element.setSelectionRange(0, 99999);
	document.execCommand("copy");
}

function isValidSubstitutionTable(table) {
	if (table.length !== regularCharacters.length) {
		return false;
	}

	const seenCharacters = new Set();
	for (const char of table) {
		if (seenCharacters.has(char)) {
			return false;
		}
		seenCharacters.add(char);
	}

	return true;
}

function decode() {
	document.getElementById("missing-table-error").style.display = "none";
	const input = document.getElementById("ciphertext-input").value;
	const output = document.getElementById("plaintext-input");
	let outputArray = [];
	const inputArray = input.split("");

	const subTableInput = document.getElementById("sub-table-input");
	let subTable;

	if (subTableInput.value == "") {
		document.getElementById("missing-table-error").style.display = "block";
		return;
	} else {
		subTable = subTableInput.value.split("");
		if (!isValidSubstitutionTable(subTable)) {
			document.getElementById("sub-table-error").style.display = "block";
			return;
		}
	}

	if (regex.test(input)) {
		document.getElementById("ciphertext-error").style.display = "none";
	} else {
		document.getElementById("ciphertext-error").style.display = "block";
		console.log("error");
		return;
	}

	subTable = subTableInput.value.split("");

	for (let i = 0; i < inputArray.length; i++) {
		char = inputArray[i];
		num = subTable.indexOf(char);

		if (dupeRegularCharacters[num] == "<") {
			outputArray.pop();
		} else if (dupeRegularCharacters[num] == ">") {
			outputArray.push(outputArray[i - 1] + outputArray[i - 1]);
		} else {
			outputArray.push(dupeRegularCharacters[num]);
		}
		console.log("input char: " + char + " output num: " + num + " output char: " + dupeRegularCharacters[num]);
	}

	output.value = outputArray.join("");
}