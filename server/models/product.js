import Sequelize from "sequelize";
import sequelize from "../util/sequelize";

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
	image: {
		type: Sequelize.STRING(1024),
		notNull: true,
	},
	price: {
		type: Sequelize.FLOAT,
		notNull: true,
		validate: {
			min: 0,
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
	},
	images: {
		type: Sequelize.JSON,
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
	if (!body.image) {
		error = "Image is required";
	}
	if (!body.price) {
		error = "Price is required";
	}
	if (error) {
		throw new Error(error);
	}

	// Make sure labels / values is an array
	const labels = body.specLabel.constructor === Array ? body.specLabel : [body.specLabel];
	const values = body.specValue.constructor === Array ? body.specValue : [body.specValue];

	// Map to spec objects
	const specs = labels.reduce((prev, label, idx) => {
		if (label && values[idx]) {
			prev.push({ label, value: values[idx] });
		}
		return prev;
	}, []);

	// Return the cleaned up version
	return {
		name: body.name,
		image: body.image,
		price: parseFloat(body.price, 10).toFixed(2),
		category: body.category,
		rating: body.rating,
		description: body.description,
		specs,
	};
};

export default Product;
