import express from "express";
import Show from "../models/show";
import User from "../models/user";
const renderTemplate = require("../util/renderTemplate");
const requireLoggedIn = require("../middleware/requireLoggedIn");

const router = express.Router();
const showTime = "http://api.tvmaze.com/shows/66?embed=nextepisode";

router.get("/search", requireLoggedIn, function(req, res) {
  const time = showTime.find({});
  res.json(showTime);
});


export default router;
