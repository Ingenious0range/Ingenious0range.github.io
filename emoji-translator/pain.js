const inputWords = [];
const outputEmojis = [];

async function parseText(input) {
	outputEmojis.length = 0;
	const filteredText = input.replace(/[^abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ']/g, "");

	const inputWords = filteredText.split(" ");

	for (let o = 0; o < inputWords.length; o++) {
		let foundEmoji = false;
		for (let i = 0; i < emojiNames.length; i++) {
			if (inputWords[o] == emojiNames[i]) {
				outputEmojis.push(emojiList[i]);
				foundEmoji = true;
				break;
			} else if (emojiNames[i].includes(inputWords[o] + " " + inputWords[o + 1])) {
				outputEmojis.push(emojiList[i]);
				foundEmoji = true;
				o++;
				break;
			}
		}

		if (!foundEmoji) {
			console.log("looking for synonyms of: " + inputWords[0]);
			await extractSynonyms(inputWords[o]);
		}
	}

	document.getElementById("outputTextArea").innerHTML = combineEmojis(outputEmojis);
	twemoji.parse(document.getElementById("outputTextArea"));
}

async function importJSON(url) {
	//console.log(url);
	try {
		const response = await fetch(url);
		const data = await response.json();

		if (response.status !== 200) {
			throw new Error(`Request failed with status code ${response.status}`);
		}

		if (!data) {
			throw new Error("JSON file is empty");
		}
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		return undefined;
	}
}

async function extractSynonyms(value) {
	//const response = ;
	try {
		const jsonArray = await fetchJSON();
		console.log(jsonArray);
		//const parsedArray = await JSON.parse(jsonArray[0]);
		//alert(jsonArray);
		console.log(parsedArray);
	} catch (error) {
		console.log(error);
	}
	// Parse the JSON file.
}

async function fetchJSON() {
	res = fetch("test.json");
	//res.then(res => )
	alert(response);
	//text = await alert(something.text());
	//alert(text);
	//return something;
}

function combineEmojis(input) {
	var output = "";

	for (let i = 0; i < input.length; i++) {
		let x = input[i];

		output = output + x;
	}

	return output;
}
