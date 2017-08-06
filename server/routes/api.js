import express from "express";
import BodyParser from "body-parser";

import Product from "../models/product";

const router = express.Router();
router.use(BodyParser.json());

export default router;
