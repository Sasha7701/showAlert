import express from "express";
import Show from "../models/show";
import apiErr from "../util/apiErr";
import apiRes from "../util/apiRes";
const User = require("../models/user");
const renderTemplate = require("../util/renderTemplate");
const requireLoggedIn = require("../middleware/requireLoggedIn");
const bodyParser = require("body-parser");
const request = require("request");

const router = express.Router();

router.use(bodyParser.json());
const url = "http://api.tvmaze.com/search/shows?q=";
// request({
// url: url,
// json: true,
// }, function (error, response, body) {
//
//     if (!error && response.statusCode === 200) {
//         console.log(body); // Print the json response
//     }
// });

router.get('/search', function(req, res) {
  request({
    url: url+req.query.q,
    json: true,
  }, function(error, response, body) {
    //  console.log(body, "SEARCH API API API");
      if(error) {
        res.send("FIX IT");
      }
      if (!error && response.statusCode === 200) {
        res.json({
          data: body
        });
        // res.send();

      }
    });
  });

  // SERVER POST /fav:
  // const shows = showids.map((sid) => {
  //   return {
  //     showid: sid,
  //   }
  // })
  // req.user.addShows(shows)
//         renderTemplate(req, res, "Search", "search", {
//       name: body.network["name"],
//       message: "SHOW TIME",
//       body,
//         // console.log(body); // Print the json response
// });
// console.log(body.network["name"], "PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
// router.get("/fav", (req, res) => {
// console.log(res.body, "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
//
//   res.send(req.body);
// });


router.post("/fav", (req, res) => {
  console.log( req.body.show, "PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
  const shows = req.body.show.map((obj) => {
    return {
      showId: obj.show.id,
      userId: req.user.get("id"),
      name: obj.show.name,
      time: obj.show.schedule.time,
      days: obj.show.schedule.days,
    };
  });
//console.log(shows,  "+++++++++++++++++++++++++++++++++++=========");

// 	if (errors) {
// 	   console.error("something went wrong");
//
// 		return apiErr(req, res, {
// 			code: 400,
// 			type: "BAD_PARAM",
// 			message: `Something was wrong with`,
// 			data: errors,
// 		});
// 	}
//
// 	// First create the order

  Show.bulkCreate(shows).then((dbShows) => {
    apiRes(req, res, { success: true });
  });
  console.log(shows,"+++++++++++++++++++++++++++++++++++=========");
});


router.get("/saved", (req, res) => {
  req.user.getShows().then((shows) => {
console.log(shows, "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    apiRes(req, res, { shows });
  });
});

module.exports = router;
