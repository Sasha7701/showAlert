import express from "express";
import BodyParser from "body-parser";

import Product from "../models/product";
import renderTemplate from "../util/renderTemplate";
import isAdminMW from "../middleware/isAdmin";

const router = express.Router();
router.use(BodyParser.urlencoded({ extended: true }));

// ------------------------------------------------------------------

router.get("/", isAdminMW, (req, res) => {
	Product.findAll().then((products) => {
		renderTemplate(res, "Admin - Products", "list", {
			products,
		});
	});
});

// ------------------------------------------------------------------

router.get("/add", isAdminMW, (req, res) => {
	renderTemplate(res, "Admin - Add Product", "product", {
		product: {},
	});
});

router.post("/add", isAdminMW, (req, res) => {
	try {
		Product.create(Product.parseForm(req.body)).then(() => {
			res.redirect("/admin?success=1");
		});
	} catch (err) {
		renderTemplate(res, "Admin - Add Product", "product", {
			product: req.body,
			error: err.message,
		});
	}
});

// ------------------------------------------------------------------

router.get("/edit/:productId", isAdminMW, (req, res) => {
	renderTemplate(res, "Admin - Edit Product", "product", {
		product: {},
	});
});

router.post("/edit/:productId", isAdminMW, (req, res) => {});

// ------------------------------------------------------------------

router.get("/login", (req, res) => {
	renderTemplate(res, "Admin - Login", "Login", {
		to: req.query.to,
	});
});

router.post("/login", (req, res) => {
	console.log(req.body);
	console.log(process.env.ADMIN_PASSWORD);
	if (req.body.password === process.env.ADMIN_PASSWORD) {
		req.session.isAdmin = true;
		res.redirect(req.body.to || "/admin");
	} else {
		renderTemplate(res, "Admin - Login", "Login", {
			error: "Bad password",
			to: req.body.to,
		});
	}
});

export default router;
