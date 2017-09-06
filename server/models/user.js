import Sequelize from "sequelize";
import sequelize from "../util/sequelize";
import bcrypt from "bcrypt";
import Show from "./show";

const path = require("path");

function hashUserPassword(user) {
	if (user.password) {
		return bcrypt.genSalt()
			.then(function(salt) {
		    return bcrypt.hash(user.password, salt);
			})
			.then(function(hashedPw) {
				user.password = hashedPw;
			});
	}
}

const User = sequelize.define("user", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: Sequelize.STRING,
		notNull: true,
		unique: true,
	},
	email: {
		type: Sequelize.STRING,
		notNull: true,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		notNull: true,
	},
	isActive: {
		type: Sequelize.BOOLEAN,
	},
}, {
	hooks: {
		beforeCreate: hashUserPassword,
		beforeUpdate: hashUserPassword,
	},
});



// User.signup = function(req) {
//  	User.create({
// 		username: req.body.username,
// 		password: req.body.password,
//     email: req.body.email,
// 	})
// 		.then(function(user) {
// 			req.session.userid = user.id;
// 			return user;
// 		});
// };

// User.login = function(req) {
// 	return User.findOne({
// 		where: {
// 			username: req.body.username,
// 		},
// 	})
// 		.then(function(user) {
// 			if (user) {
// 				return user.comparePassword(req.body.password).then(function(valid) {
// 					if (valid) {
// 						req.session.userid = user.get("id");
// 						return user;
// 					}
// 					else {
// 						throw new Error("Incorrect password");
// 					}
// 				});
// 			}
// 			else {
// 				throw new Error("Username not found");
// 			}
// 		});
// };


User.prototype.comparePassword = function(pw) {
	return bcrypt.compare(pw, this.get("password"));
};

User.belongsToMany(Show, { through: 'UserShow' });
Show.belongsToMany(User, { through: 'UserShow' });

module.exports = User;
