import Sequelize from "sequelize";
import sequelize from "../util/sequelize";
import Product from "./product";

export const FIELD_NAMES = {
	name: "Name",
	address: "Address",
	address2: "Secondary address",
	city: "City",
	state: "State",
	orders: "Products",
};

const Order = sequelize.define("order", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING(256),
		notNull: true,
	},
	address: {
		type: Sequelize.STRING(256),
		notNull: true,
	},
	address2: {
		type: Sequelize.STRING(256),
	},
	city: {
		type: Sequelize.STRING(256),
		notNull: true,
	},
	state: {
		type: Sequelize.STRING(2),
		notNull: true,
	},
});

// Associations
Product.belongsToMany(Order, { through: "order_products" });
Order.belongsToMany(Product, { through: "order_products" });

Order.getSubmitErrors = function(order) {
	const required = ["products", "name", "address", "city", "state"];
	const len256 = ["name", "address", "address2", "city"];
	const errors = {};

	// In ascending order of importance...
	if (order.state && order.state.length > 2) {
		errors.state = "State cannot be longer than 2 characters";
	}

	len256.forEach((field) => {
		if (order[field] && order[field].length > 256) {
			errors[field] = `${FIELD_NAMES[field]} cannot be longer than 250 characters`;
		}
	});

	if (order.products && order.products.constructor !== Array) {
		errors.products = "Products must be an array of IDs";
	}

	required.forEach((field) => {
		if (!order[field]) {
			errors[field] = `${FIELD_NAMES[field]} is required`;
		}
	});

	return Object.keys(errors).length ? errors : null;
};

export default Order;
