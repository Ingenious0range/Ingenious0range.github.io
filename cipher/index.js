function load() { 
	document.getElementById("plaintext-error").style.display = "none";
	document.getElementById("ciphertext-input").value = "";
	document.getElementById("sub-table-input").value = "";
	document.getElementById("plaintext-input").value = "";
	disableBtn("plain");
	disableBtn("cipher");
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

const regularCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", "?", "!", "(", ")", '"', "'", ":", ";", "-", "_", "/", " ", "<", ">", "@", "$", "%", "&", "#", "^", "*"];
const dupeRegularCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", "?", "!", "(", ")", '"', "'", ":", ";", "-", "_", "/", " ", "<", ">", "@", "$", "%", "&", "#", "^", "*"];

const specialCharacters = ["a", "e", "i", "n", "o", "r", " "];
const specialCharactersReplacement = ["@", "$", "%", "&", "#", "^", "*"];
//a, e, i, n, o, r, space
//"@", "$", "%", "&", "#", "^", "*"

const regex = /^[a-z0-9.,?!();"':\/\-_ <>]+$/i;
const cipherRegex = /^[a-z0-9.,?!();"':\/\-@$%&#^*_ <>]+$/i;

async function encode() {
	document.getElementById("sub-table-error").style.display = "none";
	document.getElementById("missing-plaintext-error").style.display = "none";
	const input = document.getElementById("plaintext-input").value;
	const output = document.getElementById("ciphertext-input");
	//const subTable = shuffleArray(regularCharacters);
	const subTableInput = document.getElementById("sub-table-input");
	let subTable = [];

	if (input == "") {
		document.getElementById("missing-plaintext-error").style.display = "block";
		return;
	}

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
	let specialCharactersNum;
	let extraShit;

	for (let i = 0; i < inputArray.length; i++) {
		extraShit = "1";
		char = inputArray[i];
		num = dupeRegularCharacters.indexOf(char);
		outputChar = subTable[num];

		if (specialCharacters.includes(char) && chanceOfTrue(50)) {
			specialCharactersNum = specialCharacters.indexOf(char);
			charNum = specialCharactersNum + 52;
			outputChar = subTable[charNum];
			console.log(specialCharactersNum);
			console.log(subTable[54]);
			console.log("substitute common letter");
			extraShit = "0";
		}

		if (char == inputArray[i - 1] && chanceOfTrue(33) && extraShit == 1) { 
			outputArray.push(subTable[dupeRegularCharacters.indexOf(">")]);
			console.log("repeat prev. letter");
		} else if (chanceOfTrue(10) && extraShit == 1) {
			extraChar = subTable[Math.floor(Math.random() * (subTable.length - 1))] + subTable[dupeRegularCharacters.indexOf("<")];
			outputArray.push(outputChar + extraChar);
			console.log("add letter and then random letter and delete symbol");
		} else {
			outputArray.push(outputChar);
			console.log("regular");
		}
		
		output.value = outputArray.join("");
		document.getElementById("encode-btn").disabled = false;
		document.getElementById("decode-btn").disabled = false;
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
	console.time();
	document.getElementById("missing-table-error").style.display = "none";
	document.getElementById("missing-ciphertext-error").style.display = "none";

	const input = document.getElementById("ciphertext-input").value;
	const output = document.getElementById("plaintext-input");
	let outputArray = [];
	const inputArray = input.split("");

	const subTableInput = document.getElementById("sub-table-input");
	let subTable;

	if (input == "") {
		document.getElementById("missing-ciphertext-error").style.display = "block";
		return;
	}

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

	if (cipherRegex.test(input)) {
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
		outputChar = dupeRegularCharacters[num];

		if (specialCharactersReplacement.includes(outputChar)) {
			outputChar = specialCharacters[specialCharactersReplacement.indexOf(outputChar)];
		}

		if (outputChar == "<") {
			outputArray.pop();
		} else if (outputChar == ">") {
			outputArray.push(outputArray[i - 1]);
			console.log(outputArray[i - 1])
		} else {
			outputArray.push(outputChar);
		}
		//console.log("input char: " + char + " output num: " + num + " output char: " + dupeRegularCharacters[num]);
	}

	output.value = outputArray.join("");
	document.getElementById("encode-btn").disabled = false;
	document.getElementById("decode-btn").disabled = false;
	console.timeEnd();
}

function disableBtn(id) {
	const ciphertext = document.getElementById("ciphertext-input");
	const plaintext = document.getElementById("plaintext-input");
	if (id == 'cipher' && ciphertext.value == '') {
		document.getElementById('decode-btn').disabled = true;
	} else if (id == 'cipher' && ciphertext.value != '') {
		document.getElementById('decode-btn').disabled = false;
	}

	if (id == "plain" && plaintext.value == "") {
		document.getElementById("encode-btn").disabled = true;
	} else if (id == "plain" && plaintext.value != "") {
		document.getElementById("encode-btn").disabled = false;
	}
}

function ctrlEnter(e, id) {
	console.log(e.key);

	if (e.key == "Enter" && e.key == "Control") {
		console.log("yay");
	}
}