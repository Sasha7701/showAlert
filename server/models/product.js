import Sequelize from "sequelize";
import chalk from "chalk";
import sequelize from "../util/sequelize";
import uploadToImgur from "../util/uploadToImgur";

const DEFAULT_IMAGES = {
	small: "https://dummyimage.com/100/000/fff&text=Small",
	medium: "https://dummyimage.com/520/000/fff&text=Medium",
	large: "https://dummyimage.com/900/000/fff&text=Large",
	original: "https://dummyimage.com/1024/000/fff&text=Original",
};

function handleUpload(product) {
	if (!product.originalImages) {
		return;
	}

	const allOldImages = product.images || [];

	const promises = [];

	product.originalImages.forEach((image, idx) => {
		const oldImages = allOldImages[idx] || {};
		if (image && image !== oldImages.original) {
			promises.push(uploadToImgur(image).then((images) => {
				product.images = [...product.images];
				product.images[idx] = images;
			}));
		}
	});

	return Promise.all(promises).then(() => {
		return product;
	}).catch((err) => {
		console.warn(chalk.yellow.bold(
			"Encountered error while uploading product image. Saving without images."
		));
		console.warn(chalk.yellow(err.message));
	});
}

const Product = sequelize.define("product", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING(128),
		notNull: true,
	},
	originalImages: {
		type: Sequelize.JSON,
		notNull: true,
		get() {
			return this.getDataValue("originalImages") || [];
		},
	},
	images: {
		type: Sequelize.JSON,
		get() {
			return this.getDataValue("images") || [DEFAULT_IMAGES];
		},
	},
	price: {
		type: Sequelize.FLOAT,
		notNull: true,
		validate: {
			min: 0,
		},
		get() {
			return this.getDataValue("price").toFixed(2);
		},
	},
	rating: {
		type: Sequelize.INTEGER,
		validate: {
			min: 1,
			max: 10,
		},
	},
	description: {
		type: Sequelize.TEXT,
	},
	category: {
		type: Sequelize.TEXT,
	},
	specs: {
		type: Sequelize.JSON,
		get() {
			return this.getDataValue("specs") || [];
		},
	},
}, {
	hooks: {
		beforeCreate: handleUpload,
		beforeUpdate: handleUpload,
	},
});

Product.parseForm = function(body) {
	let error = null;

	// Validation
	if (!body.name) {
		error = "Name is required";
	}
	if (!body.description) {
		error = "Description is required";
	}
	if (!body.price) {
		error = "Price is required";
	}
	if (error) {
		throw new Error(error);
	}

	// Make sure labels / values is an array
	let specs;

	if (body.specLabel) {
		const labels = body.specLabel.constructor === Array ? body.specLabel : [body.specLabel];
		const values = body.specValue.constructor === Array ? body.specValue : [body.specValue];

		// Map to spec objects
		specs = labels.reduce((prev, label, idx) => {
			if (label && values[idx]) {
				prev.push({ label, value: values[idx] });
			}
			return prev;
		}, []);
	}

	// Make sure images is an array
	if (typeof body.originalImages === "string") {
		body.originalImages = [body.originalImages];
	}

	// Return the cleaned up version
	return {
		name: body.name,
		originalImages: body.originalImages.filter((img) => !!img.length),
		price: parseFloat(body.price, 10).toFixed(2),
		category: body.category,
		rating: body.rating,
		description: body.description,
		specs: specs || body.specs,
	};
};

export default Product;
