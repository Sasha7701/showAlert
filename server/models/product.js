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
			min: 0,
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

export default Product;
