// import express from "express";
// import BodyParser from "body-parser";
// import Show from "../models/show";
// import User from "../models/user";
// // // import Product, { SORTS } from "../models/product";
// // // import Order, { FIELD_NAMES } from "../models/order";
// import apiRes from "../util/apiRes";
// import apiErr from "../util/apiErr";
//
// const router = express.Router();
// router.use(BodyParser.json());
//
// // // ----------------------------------------------------------------------------
//
// const router = express.Router();
//
// router.get("/test", function(req, res) {
// 	res.json("Hello!");
// });
//
// router.post("/signup", function(req, res) {
// 	User.signup(req).then(function(user) {
// 		res.json({ user: user });
// 	})
// 	.catch(function(err) {
// 		console.error("Encountered error during API signup", err);
// 		res.status(400);
// 		res.json({ error: "Invalid username or password" });
// 	});
// });
//
//
// router.post("/login", function(req, res) {
// 	// ******************** //
// 	// *** EDIT IN HERE *** //
// 	// ******************** //
// 	User.login(req).then(function(user) {
// 		res.json({ user: user });
// 	})
// 	.catch(function(err) {
// 		console.error("Encountered error during API login", err);
// 		res.status(400);
// 		res.json({ error: "Inavalid username or password" });
// 	});
// });
//
//
// router.delete("/doc/:fileId", function(req, res) {
// 	File.findById(req.params.fileId).then(function(file) {
// 		if (file) {
// 			file.destroy();
// 			res.json({ file: file });
// 		}
// 		else {
// 			res.status(404);
// 			res.json({ error: "Unable to find file with ID " + req.params.fileId });
// 		}
// 	})
// 	.catch(function(err) {
// 		res.status(500);
// 		res.json({ error: "Unable to delete file" });
// 	});
// });
// export default router;
