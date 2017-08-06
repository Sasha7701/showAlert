import express from "express";
import BodyParser from "body-parser";

import Product from "../models/product";
import renderTemplate from "../util/renderTemplate";

const router = express.Router();
router.use(BodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
	renderTemplate(res, "Admin - Products", "list", {
		products: [],
	});
});

router.get("/add", (req, res) => {
	renderTemplate(res, "Admin - Add Product", "product", {
		product: {},
	});
});

router.get("/edit/:productId", (req, res) => {
	renderTemplate(res, "Admin - Edit Product", "product", {
		product: {},
	});
});

router.get("/login", (req, res) => {
	renderTemplate(res, "Admin - Login", "Login");
});

export default router;
