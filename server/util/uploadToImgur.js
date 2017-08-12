import fetch from "node-fetch";
import FormData from "form-data";

// Add a thumbnail size to the URL
function thumbnailLink(url, size) {
	const pieces = url.split(".");
	pieces[pieces.length - 2] += size;
	return pieces.join(".");
}

export default function uploadToImgur(image, type = "URL") {
	const body = new FormData();
	body.append("image", image);
	body.append("type", type);

	return fetch("https://api.imgur.com/3/image", {
		method: "POST",
		mode: "cors",
		headers: {
			Authorization: `Client-ID ${process.env.IMGUR_CLIENT}`,
		},
		body,
	}).then((res) => {
		return res.json();
	}).then((res) => {
		if (res.data.error) {
			throw new Error(`Imgur says "${res.data.error.message}"`);
		}

		return {
			square: thumbnailLink(res.data.link, "b"),
			small: thumbnailLink(res.data.link, "t"),
			medium: thumbnailLink(res.data.link, "m"),
			large: thumbnailLink(res.data.link, "l"),
			original: res.data.link,
		};
	});
}
