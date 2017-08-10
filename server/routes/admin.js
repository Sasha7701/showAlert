import express from "express";
import BodyParser from "body-parser";

import Product from "../models/product";
import renderTemplate from "../util/renderTemplate";
import isAdminMW from "../middleware/isAdmin";

const router = express.Router();
router.use(BodyParser.urlencoded({ extended: true }));

// ------------------------------------------------------------------

router.get("/", isAdminMW, (req, res) => {
	let message = "";
	let messageType = "";

	if (req.query.created) {
		message = "Product succesfully created!";
		messageType = "is-success";
	} else if (req.query.saved) {
		message = "Product succesfully saved!";
		messageType = "is-success";
	} else if (req.query.deleted) {
		message = "Product succesfully deleted!";
		messageType = "is-danger";
	} else if (req.query.notFound) {
		message = "Invalid product ID";
		messageType = "is-info";
	}

	Product.findAll().then((products) => {
		renderTemplate(res, "Admin - Products", "list", {
			products,
			message,
			messageType,
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
			res.redirect("/admin?created=1");
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
	Product.findById(req.params.productId).then((product) => {
		if (!product) {
			return res.redirect("/admin?notFound=1");
		}

		renderTemplate(res, "Admin - Edit Product", "product", { product });
	});
});

router.post("/edit/:productId", isAdminMW, (req, res) => {
	Product.findById(req.params.productId).then((product) => {
		if (!product) {
			return res.redirect("/admin?notFound=1");
		}

		try {
			if (req.body.delete) {
				product.destroy().then(() => {
					res.redirect("/admin?deleted=1");
				});
			} else {
				product.update(Product.parseForm(req.body)).then(() => {
					res.redirect("/admin?saved=1");
				});
			}
		} catch (err) {
			renderTemplate(res, "Admin - Add Product", "product", {
				product: req.body,
				error: err.message,
			});
		}
	});
});

// ------------------------------------------------------------------

router.get("/login", (req, res) => {
	renderTemplate(res, "Admin - Login", "Login", {
		to: req.query.to,
	});
});

router.post("/login", (req, res) => {
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
