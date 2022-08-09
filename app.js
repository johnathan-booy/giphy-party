// DOM elements
const $searchForm = $("#search-form");
const $searchInput = $("#search-input");
const $gifArea = $("#gif-area");
const $removeGifsButton = $("#remove-gifs");

// GIF data
const gifURLs = [];

async function searchGiphy(term) {
	const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
		params: { q: term, api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym" },
	});
	return res;
}

function addGif(res) {
	if (res.data.data.length) {
		// Get GIF Image
		let dataIdx = 0;
		let gifURL = getGifImg(res, dataIdx);
		while (gifURLs.indexOf(gifURL) !== -1) {
			dataIdx++;
			gifURL = getGifImg(res, dataIdx);
		}

		appendGif(gifURL);
	}
}

function getGifImg(res, idx) {
	const imgURL = res.data.data[idx].images.original.url;
	return imgURL;
}

function appendGif(url) {
	let $newCol = $("<div>", {
		class: " col-12 col-md-6 col-lg-4 col-xl-3 mb-4",
	});
	let $newGif = $("<img>", {
		src: url,
		class: "w-100 img-thumbnail",
	});
	$newCol.append($newGif);
	$gifArea.append($newCol);
	gifURLs.push(url);
}

$searchForm.on("submit", async function (e) {
	e.preventDefault();
	console.log("Eish");
	const term = $searchInput.val();
	const res = await searchGiphy(term);
	addGif(res);
});

$removeGifsButton.on("click", function () {
	$gifArea.empty();
});
