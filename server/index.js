// import dotenv from "dotenv";
// import express from "express";
// import cookieParser from "cookie-parser";
// import session from "express-session";
 import chalk from "chalk";
//
 import sequelize from "./util/sequelize";
// import apiRoutes from "./routes/api";
 import reactRoutes from "./routes/react";
// import authRoutes from "./routes/auth";
// const deserializeUserMW = require("./middleware/deserializeUser");
// const bodyParser = require("body-parser");
// const connectSessionSequelize = require("connect-session-sequelize");
// const User = require("./models/user");
// // Configure app
// dotenv.config();
// const app = express();
// const SessionStore = connectSessionSequelize(session.Store);
// const secret = process.env.COOKIE_SECRET || "dev";
//
// app.set("views", "./server/views");
// app.set("view engine", "ejs");
// app.use(express.static("assets"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser(secret));
// app.use(session({
// 	secret: secret,
// 	store: new SessionStore({ db: sequelize }),
// }));
//
// app.use(deserializeUserMW);
//
// // app.get("/", function(req, res) {
// // 	if (req.user) {
// // 		return res.redirect("/docs");
// // 	}
// //
// // 	renderTemplate(req, res, "Welcome", "index");
// // });
//
// // Custom routes
// app.use("/api", apiRoutes);
// app.use("/auth", authRoutes);
//
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectSessionSequelize = require("connect-session-sequelize");
const SessionStore = connectSessionSequelize(session.Store);
const deserializeUserMW = require ("./middleware/deserializeUser");

const User = require("./models/user");

const renderTemplate = require("./util/renderTemplate");

const requireLoggedIn = require("./middleware/requireLoggedIn");
const requireLoggedOut = require("./middleware/requireLoggedOut");

const app = express();
const cookieSecret = process.env.COOKIE_SECRET || "dev";


// Handles post request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Render views using EJS
app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(cookieParser(cookieSecret));
app.use(session({
	secret: cookieSecret,
	store: new SessionStore({ db: sequelize }),
}));
app.use(deserializeUserMW);

// app.use(requireLoggedOut);



app.get("/signup", function(req, res) {
	renderTemplate(req, res, "Signup", "signup");
});

app.post("/signup", function(req, res) {
	User.create({
		firstname: req.body.firstName,
		lastname: req.body.lastName,
		email: req.body.email,
		username: req.body.userName,
		password: req.body.password,
	})
	.then(function(user) {
		req.session.userid = user.id;
		res.redirect("/home");
	})
	.catch(function(err) {
		console.log(err);
		renderTemplate(req, res, "Signup", "signup", {
			error: "Invalid username or password",
		});
	});
});


app.get("/", function(req, res) {
	renderTemplate(req, res, "Login", "login");
});

app.post("/", function(req, res) {
	User.findOne({
		where: {
			username: req.body.username,
		},
	})
	.then(function(user) {
		if (user) {
			user.comparePassword(req.body.password).then(function(valid) {
				console.log(user);
				if (valid) {
					req.session.userid = user.get("id");
					res.redirect("/home");
				}
				else {
					renderTemplate(req, res, "Login", "login", {
						error: "Incorrect password",
					});
				}
			});
		}
		else {
			renderTemplate(req, res, "Login", "login", {
				error: "Username not found",
			});
		}
	})
	.catch(function(err) {
		console.log(err);
		renderTemplate(req, res, "Login", "login", {
			error: "The database exploded, please try again",
		});
	});
});


app.get("/logout", function(req, res) {
	req.session.userid = null;
	req.user = null;

	console.log(req.session);
	res.redirect("/");
});


if (!process.env.SERVER_ONLY) {
	reactRoutes(app);
}

sequelize
	.sync()
	.then(() => {
		console.log(chalk.green("✅ Database has been synced"));
		const port = process.env.PORT || 7000;
		const server = app.listen(port, () => {
			console.log(chalk.green("✅ Server is online"));
			console.log(`Your server is available at ${chalk.blue(`http://localhost:${port}/`)}`);
		});
	})
	.catch((err) => {
		console.error(err);
		console.error(chalk.red.bold("Sequelize failed to sync! See error above."));
		process.exit(1);
	});
