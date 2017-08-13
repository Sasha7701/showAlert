import express from "express";
import BodyParser from "body-parser";

import Product from "../models/product";
import apiRes from "../util/apiRes";
import apiErr from "../util/apiErr";

const router = express.Router();
router.use(BodyParser.json());

// ----------------------------------------------------------------------------

router.get("/products", (req, res) => {
	Product.findAll({
		attributes: ["id", "name", "price", "rating", "images"],
	}).then((products) => {
		apiRes(req, res, {
			products: products.map((p) => {
				return {
					id: p.get("id"),
					name: p.get("name"),
					category: p.get("category"),
					price: p.get("price"),
					rating: p.get("rating"),
					image: p.get("images")[0],
				};
			}),
		});
	}).catch((err) => {
		apiErr(req, res, {
			code: 500,
			type: "DB_ERROR",
			message: "Failed to retrieve products!",
		});
	});
});

// ----------------------------------------------------------------------------

router.get("/products/:productId", (req, res) => {
	Product.findById(req.params.productId).then((product) => {
		if (!product) {
			return apiErr(req, res, {
				code: 400,
				type: "BAD_PARAM",
				message: "No product found!",
			});
		}

		apiRes(req, res, {
			product: {
				id: product.get("id"),
				name: product.get("name"),
				category: product.get("category"),
				price: product.get("price"),
				rating: product.get("rating"),
				images: product.get("images"),
				description: product.get("description"),
				specs: product.get("specs"),
			},
		});
	});
});

// ----------------------------------------------------------------------------

router.post("/order", (req, res) => {
	apiErr(req, res, {
		code: 500,
		type: "NOT_IMPLEMENTED",
		message: "Implement me!",
	});
});

// ----------------------------------------------------------------------------

router.get("/order/:orderId", (req, res) => {
	apiErr(req, res, {
		code: 500,
		type: "NOT_IMPLEMENTED",
		message: "Implement me!",
	});
});

export default router;
