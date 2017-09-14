import Sequelize from "sequelize";

import chalk from "chalk";
import sequelize from "../util/sequelize";
const path = require("path");


const Show = sequelize.define("show", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	showId: {
		type: Sequelize.INTEGER,
	},
	name: {
		type: Sequelize.STRING(128),
		notNull: true,
	},
	time: {
	 type: Sequelize.STRING,
	 notNull: true,
	},
	days: {
		type: Sequelize.STRING,
		notNull: true,
	},
});



export default Show;
