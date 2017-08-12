/* eslint-disable curly */
import fetch from "node-fetch";
import FormData from "form-data";
import jimp from "jimp";

function handleJimpError(err) {
	if (err) {
		console.error("JIMP Error:", err);
		throw err;
	}
}

function runImageOps(image) {
	console.info("Begin fetching image...");
	return new Promise((resolve, reject) => {
		// If you're reading this, this code is awful. Please do not repeat this,
		// it was done under duress
		try {
			jimp.read(image, (err, img) => {
				if (err || !img) {
					handleJimpError(err);
					return reject(err);
				}

				console.info("Fetched image from URL...");
				const mime = img.getMIME();
				const images = {};

				// Large
				img.scaleToFit(800, 800);
				img.getBuffer(mime, (err, large) => {
					handleJimpError(err);
					images.large = large;
					console.info("Resized large...");

					// Medium
					img.scaleToFit(400, 400);
					img.getBuffer(mime, (err, medium) => {
						handleJimpError(err);
						images.medium = medium;
						console.info("Resized medium...");

						// Small
						img.scaleToFit(160, 160);
						img.getBuffer(mime, (err, small) => {
							handleJimpError(err);
							images.small = small;
							console.info("Resized small...");
							resolve(images);
						});
					});
				});
			});
		} catch (err) {
			reject(err);
		}
	});
}

function uploadImageBuffer(image) {
	const body = new FormData();
	body.append("image", image);
	body.append("type", "file");

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
			console.error(`Imgur Error:`, res.data.error);
			throw new Error(`Imgur Error: ${res.data.error.message}`);
		}
		return res;
	});
}

export default function uploadToImgur(imageUrl) {
	// First we must get the images we need
	return runImageOps(imageUrl).then((images) => {
		return Promise.all(
			Object.keys(images).map((size) => {
				return uploadImageBuffer(images[size]).then((res) => {
					console.info(`Uploaded ${size}...`);
					return {
						size,
						url: res.data.link,
					};
				});
			})
		);
	}).then((uploads) => {
		return uploads.reduce((prev, upload) => {
			prev[upload.size] = upload.url;
			return prev;
		}, { original: imageUrl });
	});
}
