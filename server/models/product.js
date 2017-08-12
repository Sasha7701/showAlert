import Sequelize from "sequelize";
import sequelize from "../util/sequelize";
import uploadToImgur from "../util/uploadToImgur";

function handleUpload(product) {
	if (!product.images) {
		return;
	}

	const promises = [];

	product.images.forEach((image, idx) => {
		if (typeof image === "string") {
			promises.push(uploadToImgur(image).then((images) => {
				product.images[idx] = images;
			}));
		}
	});

	return Promise.all(promises);
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
	images: {
		type: Sequelize.JSON,
		get() {
			return this.getDataValue("images") || [{
				square: "https://dummyimage.com/100/000/fff&text=S",
				small: "https://dummyimage.com/100/000/fff&text=S",
				medium: "https://dummyimage.com/520/000/fff&text=M",
				large: "https://dummyimage.com/900/000/fff&text=L",
				origina: "https://dummyimage.com/1024/000/fff&text=OG",
			}];
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

	// Return the cleaned up version
	return {
		name: body.name,
		images: body.images.filter((img) => !!img.length),
		price: parseFloat(body.price, 10).toFixed(2),
		category: body.category,
		rating: body.rating,
		description: body.description,
		specs,
	};
};

export default Product;
