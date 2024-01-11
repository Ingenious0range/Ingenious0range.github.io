async function parseJSON() {
	const jsonArray = JSON.parse(await fetch("test.json"));
	console.log(jsonArray);
	return jsonArray;
}
