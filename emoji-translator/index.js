const inputWords = [];
const outputEmojis = [];

function parseText(input) {
	outputEmojis.length = 0;
	const filteredText = input.replace(/[^abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ']/g, "");

	const inputWords = filteredText.split(" ");

	for (let o = 0; o < inputWords.length; o++) {
		console.log(inputWords[o]);
		for (let i = 0; i < emojiNames.length; i++) {
			if (inputWords[o] == emojiNames[i]) {
				outputEmojis.push(emojiList[i]);
			} else {
				if (emojiNames[i].includes(inputWords[o] + " " + inputWords[o + 1])) {
					console.log(inputWords[o] + " " + inputWords[o + 1]);
					outputEmojis.push(emojiList[i]);
					o++;
				}
			}
		}
	}

	document.getElementById("outputTextArea").innerHTML = outputEmojis.join();
	twemoji.parse(document.getElementById("outputTextArea"));
}
